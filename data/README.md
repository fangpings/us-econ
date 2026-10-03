# 离线研究练习资料

`research-observations.json` 仅含三个 2024 Q1 实际 GDP 季环比年化增速的历史发布版本，以及两个明确虚构的价格指数观察。不是完整数据库，也不是当前经济面板。

历史数值按各记录 source 手工摘取：2024-04-25 初值 1.6%、2024-05-30 第二次估计 1.3%、2024-06-27 第三次估计 1.4%。当日公布时刻均为美东夏令时 08:30，换成 UTC 12:30。后续年度修订不在本样本中；第三次不是永久最终值。

retrieved_at 为本教材于 2026-10-03 整理入库的**教学记账时间**，统一设为 UTC 00:00，不声称是工具逐条访问的精确时刻。public 模式按原始公布时间重建公众信息集；local 模式还要求入库时间已到，因此不能声称 2024 年本地已有这些资料。

TEACH_PRICE_INDEX 是虚构，不应被用于真实市场分析。程序拒绝把缺失值当零、把同观察期的修订当增长率、把口径不同的记录强行比较。详见教材“数据工作流”。

在仓库根目录运行：

```sh
python3 tools/research_lab.py validate
python3 tools/research_lab.py asof --at 2024-05-01T00:00:00Z
python3 tools/research_lab.py compare --at 2025-04-01T00:00:00Z --series TEACH_PRICE_INDEX --earlier 2025-01 --later 2025-02
python3 -m unittest discover -s tests -v
```

程序只读本地文件并输出 JSON，不调用数据 API、模型或定时服务。通过校验不等于来源真实，仍需人工打开原始发布核对。
