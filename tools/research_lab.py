"""Offline teaching lab. No fetching, model calls, scheduling or investment advice."""
import argparse
import json
import math
import re
from datetime import datetime, timezone
from pathlib import Path

DEFAULT = Path(__file__).resolve().parents[1] / "data/research-observations.json"
META = ("unit", "frequency", "adjustment", "scope", "kind")


def timestamp(value):
    if not isinstance(value, str):
        raise ValueError("timestamp must be a string")
    result = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if result.tzinfo is None:
        raise ValueError("timestamp must include timezone")
    return result.astimezone(timezone.utc)


def validate(rows):
    if not isinstance(rows, list):
        raise ValueError("observations must be a list")
    seen, metadata = set(), {}
    required = {"series", "period", "released_at", "retrieved_at", "vintage", "value", "source", *META}
    for i, row in enumerate(rows):
        if not isinstance(row, dict) or not required.issubset(row):
            raise ValueError(f"row {i}: missing fields")
        if any(not isinstance(row[k], str) or not row[k].strip() for k in required - {"value"}):
            raise ValueError(f"row {i}: empty or non-string metadata")
        value = row["value"]
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
            raise ValueError(f"row {i}: value must be finite number (missing is not zero)")
        if row["kind"] not in {"historical", "teaching"}:
            raise ValueError(f"row {i}: invalid kind")
        if row["kind"] == "historical" and not row["source"].startswith("https://"):
            raise ValueError(f"row {i}: historical source must use https")
        if row["kind"] == "teaching" and not row["source"].startswith("teaching://"):
            raise ValueError(f"row {i}: teaching source must be explicit")
        patterns = {"monthly": r"\d{4}-(0[1-9]|1[0-2])", "quarterly": r"\d{4}Q[1-4]"}
        if row["frequency"] not in patterns or not re.fullmatch(patterns[row["frequency"]], row["period"]):
            raise ValueError(f"row {i}: unsupported frequency or invalid period")
        released, retrieved = timestamp(row["released_at"]), timestamp(row["retrieved_at"])
        if retrieved < released:
            raise ValueError(f"row {i}: retrieved before publication")
        key = (row["series"], row["period"], released)
        if key in seen:
            raise ValueError(f"row {i}: duplicate version")
        seen.add(key)
        signature = tuple(row[k] for k in META)
        if row["series"] in metadata and metadata[row["series"]] != signature:
            raise ValueError(f"row {i}: definition changed; assign a new series id")
        metadata[row["series"]] = signature
    return rows


def asof(rows, cutoff, availability="public"):
    """public reconstructs publication availability; local also requires retrieval."""
    validate(rows)
    if availability not in {"public", "local"}:
        raise ValueError("availability must be public or local")
    bound = timestamp(cutoff)
    result = {}
    for row in rows:
        if timestamp(row["released_at"]) > bound:
            continue
        if availability == "local" and timestamp(row["retrieved_at"]) > bound:
            continue
        key = (row["series"], row["period"])
        if key not in result or timestamp(row["released_at"]) > timestamp(result[key]["released_at"]):
            result[key] = row
    return [result[k] for k in sorted(result)]


def change(earlier, later):
    if earlier["series"] != later["series"] or any(earlier[k] != later[k] for k in META):
        raise ValueError("incomparable series or metadata")
    if earlier["period"] == later["period"]:
        raise ValueError("same-period versions are revisions, not period growth")
    if earlier["period"] >= later["period"]:
        raise ValueError("periods must be increasing")
    old, new = earlier["value"], later["value"]
    result = {"difference": new - old, "difference_unit": "percentage_points" if earlier["unit"] == "percent" else earlier["unit"]}
    if earlier["unit"] == "index":
        if old <= 0 or new <= 0:
            raise ValueError("index ratio requires positive levels")
        result["interval_growth_percent"] = (new / old - 1) * 100
    return result


def annualized_to_period(rate_percent, periods_per_year):
    if not math.isfinite(rate_percent) or rate_percent <= -100 or periods_per_year <= 0:
        raise ValueError("invalid annualized rate or frequency")
    return ((1 + rate_percent / 100) ** (1 / periods_per_year) - 1) * 100


def mortgage(principal, annual_rate, months):
    if principal <= 0 or annual_rate < 0 or months <= 0:
        raise ValueError("invalid mortgage parameters")
    r = annual_rate / 12
    return principal / months if r == 0 else principal * r / (1 - (1 + r) ** (-months))


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("command", choices=["validate", "asof", "compare"])
    p.add_argument("--file", type=Path, default=DEFAULT)
    p.add_argument("--at", help="timezone-aware cutoff, e.g. 2024-05-01T00:00:00Z")
    p.add_argument("--availability", choices=["public", "local"], default="public")
    p.add_argument("--series")
    p.add_argument("--earlier")
    p.add_argument("--later")
    args = p.parse_args()
    try:
        rows = validate(json.loads(args.file.read_text(encoding="utf-8")))
        if args.command == "validate":
            out = {"valid": True, "records": len(rows)}
        else:
            if not args.at:
                raise ValueError("--at is required; no implicit latest version")
            snapshot = asof(rows, args.at, args.availability)
            if args.command == "asof":
                out = {"cutoff": args.at, "availability": args.availability, "observations": snapshot}
            else:
                if not all([args.series, args.earlier, args.later]):
                    raise ValueError("compare requires --series --earlier --later")
                indexed = {(r["series"], r["period"]): r for r in snapshot}
                old = indexed.get((args.series, args.earlier))
                new = indexed.get((args.series, args.later))
                if old is None or new is None:
                    raise ValueError("requested observations unavailable at cutoff")
                out = {"cutoff": args.at, "inputs": [old, new], "calculation": change(old, new)}
        print(json.dumps(out, ensure_ascii=False, indent=2, allow_nan=False))
    except (ValueError, OSError, KeyError, TypeError) as exc:
        p.error(str(exc))


if __name__ == "__main__":
    main()
