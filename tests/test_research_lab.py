import copy
import json
import unittest
from tools.research_lab import DEFAULT, annualized_to_period, asof, change, mortgage, validate


class ResearchLabTests(unittest.TestCase):
    def setUp(self):
        self.rows = json.loads(DEFAULT.read_text())

    def test_all_valid(self):
        self.assertEqual(len(validate(self.rows)), 5)

    def test_before_release(self):
        self.assertEqual(asof(self.rows, "2024-04-25T12:29:59Z"), [])

    def test_at_release(self):
        self.assertEqual(asof(self.rows, "2024-04-25T12:30:00Z")[0]["value"], 1.6)

    def test_revision(self):
        self.assertEqual(asof(self.rows, "2024-06-01T00:00:00Z")[0]["value"], 1.3)
        self.assertEqual(asof(self.rows, "2024-07-01T00:00:00Z")[0]["value"], 1.4)

    def test_local_is_not_public(self):
        self.assertEqual(asof(self.rows, "2024-07-01T00:00:00Z", "local"), [])

    def test_offset(self):
        self.assertEqual(asof(self.rows, "2024-04-25T08:30:00-04:00")[0]["value"], 1.6)

    def test_duplicate(self):
        with self.assertRaises(ValueError):
            validate(self.rows + [self.rows[0]])

    def test_invalid_missing_and_nan(self):
        for value in [None, float("nan"), True, "1.6"]:
            rows = copy.deepcopy(self.rows)
            rows[0]["value"] = value
            with self.assertRaises(ValueError):
                validate(rows)

    def test_scope_change(self):
        self.rows[1]["scope"] = "different scope"
        with self.assertRaises(ValueError):
            validate(self.rows)

    def test_bad_period(self):
        self.rows[3]["period"] = "2025-13"
        with self.assertRaises(ValueError):
            validate(self.rows)

    def test_naive_time(self):
        with self.assertRaises(ValueError):
            asof(self.rows, "2024-06-01")

    def test_retrieval_order(self):
        self.rows[0]["retrieved_at"] = "2020-01-01T00:00:00Z"
        with self.assertRaises(ValueError):
            validate(self.rows)

    def test_growth(self):
        self.assertAlmostEqual(change(self.rows[3], self.rows[4])["interval_growth_percent"], .3)

    def test_cannot_call_revision_growth(self):
        with self.assertRaises(ValueError):
            change(self.rows[0], self.rows[1])

    def test_annualized(self):
        q = annualized_to_period(1.6, 4)
        self.assertAlmostEqual(((1 + q / 100) ** 4 - 1) * 100, 1.6)

    def test_mortgage(self):
        self.assertAlmostEqual(mortgage(400000, .06, 360), 2398.202100611, places=7)
        self.assertEqual(mortgage(1200, 0, 12), 100)


if __name__ == "__main__":
    unittest.main()
