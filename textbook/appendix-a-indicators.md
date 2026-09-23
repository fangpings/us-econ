# 附录 A：指标注册表与数据入口

[返回目录](README.md) · [数据系统设计](24-data-system.md)

这张表用于把教材连接到未来的监控系统，不是要求每天逐项阅读。A 为第一轮核心，B 为第二轮扩展；日/月/季表示观察频率，不代表发布当天即可获得所有数据。SA 为季调，NSA 为非季调，SAAR 为季调年率。

编号指向具体序列入口。接入时仍须读取元数据、原始发布说明和当前可用历史；下面的表不是对所有接口已执行下载测试的声明。指数基期、数据权限与方法可能变化，程序不能把它们永久硬编码。

## 1. 增长、收入与就业

| 优先级 | 指标 / FRED 编号 | 频率与原始口径 | 建议观察方式 | 解释与常见误读 |
| --- | --- | --- | --- | --- |
| A | [实际 GDP · GDPC1](https://fred.stlouisfed.org/series/GDPC1) | 季；链式实际十亿美元，SAAR | 季环比年化、同比、官方分项贡献 | 原始数是产出水平，不是增长率；见 04 |
| A | [实际 PCE · PCEC96](https://fred.stlouisfed.org/series/PCEC96) | 月；链式实际十亿美元，SAAR | 环比、三个月年化、商品/服务 | 购买量，非价格指数；见 05 |
| A | [实际可支配收入 · DSPIC96](https://fred.stlouisfed.org/series/DSPIC96) | 月；链式实际十亿美元，SAAR | 三个月趋势、人均扩展 | 消费收入基础，不等于工资总额 |
| B | [个人储蓄率 · PSAVERT](https://fred.stlouisfed.org/series/PSAVERT) | 月；%，SA | 水平、百分点变化 | 流量比例，不是存款余额 |
| B | [零售与餐饮销售 · RSAFS](https://fred.stlouisfed.org/series/RSAFS) | 月；百万美元，SA | 环比、修订、分项 | 名义，服务覆盖不完整 |
| A | [非农工资就业 · PAYEMS](https://fred.stlouisfed.org/series/PAYEMS) | 月；千个岗位，SA | 一阶差分、三个月均增、修订 | 先差分才得到新增岗位；见 06 |
| A | [失业率 · UNRATE](https://fred.stlouisfed.org/series/UNRATE) | 月；%，SA | 水平、百分点变化 | 分母是劳动力，不是全部人口 |
| A | [劳动参与率 · CIVPART](https://fred.stlouisfed.org/series/CIVPART) | 月；%，SA | 水平、趋势 | 与失业率、人口结构联合解释 |
| A | [初请失业金 · ICSA](https://fred.stlouisfed.org/series/ICSA) | 周；人，SA | 四周均值、持续性 | 不是全部裁员或失业人数 |
| B | [续请失业金 · CCSA](https://fred.stlouisfed.org/series/CCSA) | 周；人，SA | 四周趋势、观察周 | 与初请参考周可能不同 |
| B | [私人非农平均时薪 · CES0500000003](https://fred.stlouisfed.org/series/CES0500000003) | 月；美元/小时，SA | 同比、三个月年化 | 均值有构成效应 |
| B | [职位空缺 · JTSJOL](https://fred.stlouisfed.org/series/JTSJOL) | 月；千个，SA | 趋势、与招聘率比较 | 空缺是时点存量，不等于已招聘 |
| B | [离职率 · JTSQUR](https://fred.stlouisfed.org/series/JTSQUR) | 月；%，SA | 水平和百分点 | 主动离职率，不是全部人员流出 |

## 2. 企业、住房、供给与通胀

| 优先级 | 指标 / FRED 编号 | 频率与原始口径 | 建议观察方式 | 解释与常见误读 |
| --- | --- | --- | --- | --- |
| A | [工业生产 · INDPRO](https://fred.stlouisfed.org/series/INDPRO) | 月；指数，SA | 环比、制造业分项 | 不覆盖全部服务业；见 07 |
| B | [住宅建筑许可 · PERMIT](https://fred.stlouisfed.org/series/PERMIT) | 月；千套，SAAR | 三个月均值、单户/多户 | 意愿/批准不等于实际开工 |
| B | [新屋开工 · HOUST](https://fred.stlouisfed.org/series/HOUST) | 月；千套，SAAR | 趋势、分项 | 波动与天气影响较大 |
| B | [30年固定房贷利率 · MORTGAGE30US](https://fred.stlouisfed.org/series/MORTGAGE30US) | 周；%，NSA | 水平和 bp 变化 | 调查口径，不代表所有借款人报价 |
| B | [劳动生产率 · OPHNFB](https://fred.stlouisfed.org/series/OPHNFB) | 季；指数，SA | 季环比年化、多季趋势 | 非农商业部门每小时产出；见 08 |
| B | [单位劳动成本 · ULCNFB](https://fred.stlouisfed.org/series/ULCNFB) | 季；指数，SA | 同比、多季趋势 | 不等于消费价格通胀 |
| A | [CPI · CPIAUCSL](https://fred.stlouisfed.org/series/CPIAUCSL) | 月；指数，SA | 环比、三个月年化、同比 | 比新闻的 NSA 同比时先核对口径 |
| A | [核心 CPI · CPILFESL](https://fred.stlouisfed.org/series/CPILFESL) | 月；指数，SA | 同上，配住房/服务分项 | 剔除食品能源，不是实际生活成本全部 |
| A | [PCE 价格指数 · PCEPI](https://fred.stlouisfed.org/series/PCEPI) | 月；指数，SA | 同比、近期速度 | 与消费量 PCEC96 区分；见 09 |
| A | [核心 PCE 价格指数 · PCEPILFE](https://fred.stlouisfed.org/series/PCEPILFE) | 月；指数，SA | 三个月/六个月年化、同比 | 常用于趋势，不是另一套 2%目标 |

CPI 新闻标题同比常使用非季调序列。若需要严格复现，另读取 [CPIAUCNS](https://fred.stlouisfed.org/series/CPIAUCNS) 和 [CPILFENS](https://fred.stlouisfed.org/series/CPILFENS)，不要暗中把 SA 与 NSA 接在一起。

## 3. 政策、利率与资金市场

| 优先级 | 指标 / FRED 编号 | 频率与原始口径 | 建议观察方式 | 解释与常见误读 |
| --- | --- | --- | --- | --- |
| A | [目标下限 · DFEDTARL](https://fred.stlouisfed.org/series/DFEDTARL) / [上限 · DFEDTARU](https://fred.stlouisfed.org/series/DFEDTARU) | 日；%，NSA | 生效日、政策变化 | 目标与实现利率不同；见 11 |
| A | [EFFR](https://fred.stlouisfed.org/series/EFFR) | 日；%，NSA | 与目标及 IORB 比较 | 按交易日匹配 |
| A | [IORB](https://fred.stlouisfed.org/series/IORB) | 日；%，NSA | 当日有效管理利率 | 不得用已公布但未来生效值错配 |
| A | [SOFR](https://fred.stlouisfed.org/series/SOFR) | 日；%，NSA | 利差、成交量、分位、日历 | 通常下一营业日公布交易日数值 |
| A | [2Y · DGS2](https://fred.stlouisfed.org/series/DGS2) | 日；%，NSA | 1/5/20有效观察间隔 bp 变化 | 常数期限收益率；见 12 |
| A | [10Y · DGS10](https://fred.stlouisfed.org/series/DGS10) | 日；%，NSA | 同上 | 不是债券价格 |
| A | [30Y · DGS30](https://fred.stlouisfed.org/series/DGS30) | 日；%，NSA | 与短端、供给联合 | 不单独识别财政风险 |
| B | [3M · DGS3MO](https://fred.stlouisfed.org/series/DGS3MO) | 日；%，NSA | 3m10y、政策路径 | 不与银行贴现率口径混用 |
| A | [10Y 实际收益率 · DFII10](https://fred.stlouisfed.org/series/DFII10) | 日；%，NSA | 与同期限名义比较 | 实际利率不等于实际持有收益；见 13 |
| A | [10Y BEI · T10YIE](https://fred.stlouisfed.org/series/T10YIE) | 日；%，NSA | bp 变化、来源方法 | 通胀补偿，非纯预期 |
| A | [Fed 总资产 · WALCL](https://fred.stlouisfed.org/series/WALCL) | 周；百万美元，NSA，周三时点 | 变化与资产项目构成 | 扩表不自动等于 QE |
| A | [准备金 · WRESBAL](https://fred.stlouisfed.org/series/WRESBAL) | 周；百万美元，NSA，周均 | 余额、变化、资金价格 | 不是每天的新准备金值 |
| A | [TGA · WTREGEN](https://fred.stlouisfed.org/series/WTREGEN) | 周；百万美元，NSA，周均 | 与发行、税期、支出联合 | 与 WALCL 时点口径不同 |
| A | [ON RRP · RRPONTSYD](https://fred.stlouisfed.org/series/RRPONTSYD) | 日；十亿美元，NSA | 余额、流向、相对利率 | 不是全部 Fed 逆回购负债 |

**重要的口径检查：**WALCL 是周三时点，WRESBAL 与 WTREGEN 是周均，RRPONTSYD 是日度且金额单位不同。它们可以分图观察，不能直接组合成严格同一时点的资产负债恒等式。若要核算，回到 H.4.1 选取同口径项目并覆盖其他负债。

## 4. 信用与跨资产

| 优先级 | 指标 / FRED 编号 | 频率与原始口径 | 建议观察方式 | 解释与常见误读 |
| --- | --- | --- | --- | --- |
| A | [IG OAS · BAMLC0A0CM](https://fred.stlouisfed.org/series/BAMLC0A0CM) | 日；%，NSA | bp 变化、可得样本分位 | 指数而非单家银行；见 19 |
| A | [HY OAS · BAMLH0A0HYM2](https://fred.stlouisfed.org/series/BAMLH0A0HYM2) | 日；%，NSA | 同上，配绝对收益率 | 不能直接换算违约概率 |
| B | [银行贷款与租赁 · TOTLL](https://fred.stlouisfed.org/series/TOTLL) | 周；十亿美元，SA | 同比、类别和修订 | 存量不是发放额；见 18 |
| B | [银行存款 · DPSACBW027SBOG](https://fred.stlouisfed.org/series/DPSACBW027SBOG) | 周；十亿美元，SA | 变动、银行类别 | 总量稳定可能掩盖分布变化 |
| B | [大中型企业贷款标准 · DRTSCILM](https://fred.stlouisfed.org/series/DRTSCILM) | 季；净比例%，NSA | 水平、百分点变化 | 仅 SLOOS 一个问题，需配需求项 |
| B | [家庭偿债率 · TDSP](https://fred.stlouisfed.org/series/TDSP) | 季；可支配收入占比%，SA | 趋势、方法变化 | 总量不能代替收入组别风险 |
| A | [标普 500 · SP500](https://fred.stlouisfed.org/series/SP500) | 日；指数，NSA | 价格回报、回撤 | 历史覆盖与授权需核验；不含股息 |
| A | [VIX · VIXCLS](https://fred.stlouisfed.org/series/VIXCLS) | 日；指数，NSA | 水平、变化、相对分布 | 隐含波动，不是下跌概率 |
| A | [广义美元 · DTWEXBGS](https://fred.stlouisfed.org/series/DTWEXBGS) | 日；指数，NSA | 百分比变化 | 不等于 DXY，发布可能滞后 |
| A | [WTI 现货 · DCOILWTICO](https://fred.stlouisfed.org/series/DCOILWTICO) | 日；美元/桶，NSA | 水平、变化、供需背景 | 不等于连续期货，注意特殊价格状态 |

IG 和 HY 上述 FRED 页面截至 2026-09-15 均标明自 2026 年 4 月起仅保留三年观察值。用于历史分位前先检查真实覆盖；不要自动假设付费指数可免费获取全历史或对外分发。

## 5. 派生指标的计算合同

| 派生指标 | 公式（利率原值为百分数） | 前置条件 |
| --- | --- | --- |
| 2s10s（bp） | `(DGS10−DGS2)×100` | 同一观察日 |
| 3m10y（bp） | `(DGS10−DGS3MO)×100` | 同日且同类收益率口径 |
| SOFR−EFFR（bp） | `(SOFR−EFFR)×100` | 同一交易日 |
| SOFR−IORB（bp） | `(SOFR−IORB)×100` | IORB 在交易日有效 |
| 月度同比（%） | `(X_t/X_(t−12)−1)×100` | 同一序列、同一版本或明确版本策略 |
| 三个月年化（%） | `[(X_t/X_(t−3))^4−1]×100` | 一般用于合适的季调月度水平 |
| 新增非农（千） | `PAYEMS_t−PAYEMS_(t−1)` | 同一发布版本；另记录历史修订 |
| 四周初请均值 | 最近四个周观察值均值 | 不把缺失周替换为零 |
| 价格回撤 | `当前价格/指定窗口此前最高价−1` | 明确窗口、价格/总回报口径 |

“5 个交易日变化”需要来源对应的交易日历。若用最近五个有效观察间隔代替，报告必须这样命名，不能让缺失日无声改变窗口。

## 6. 需要其他来源或单独立项的指标

| 指标 | 来源入口 | 频率/事件 | 接入与解释条件 |
| --- | --- | --- | --- |
| ISM 制造业/服务业及新订单 | [ISM](https://www.ismworld.org/supply-management-news-and-reports/reports/ism-report-on-business/) | 月 | 历史数据获取及授权需核验 |
| ECI、工时、招聘率 | [BLS](https://www.bls.gov/) | 季/月 | 指定部门、人数或小时、季调 |
| 财政收支与发行 | [Fiscal Data](https://fiscaldata.treasury.gov/) | 月/日/事件 | 区分赤字、总发行、净发行 |
| 日度 TGA | [DTS](https://fiscal.treasury.gov/accounting/daily-treasury-statement) | 日度发布 | 选对 cash balance 字段，不与周均混合 |
| SRF/SRP、ON RRP 操作细节 | [纽约联储市场数据](https://markets.newyorkfed.org/) | 操作日 | 区分报价、提交与接受量、多个时段 |
| 拍卖结果 | [TreasuryDirect](https://www.treasurydirect.gov/auctions/announcements-data-results/) | 拍卖事件 | 按券种、期限、新券/续发匹配 |
| Tail | 官方结果 + WI 市场数据 | 拍卖事件 | 缺精确 WI 时不计算 |
| Bid-ask/depth/price impact | 专门国债行情数据 | 日内/日 | 券种、平台、档位和时段；可能付费 |
| 期限溢价 ACM | [纽约联储](https://www.newyorkfed.org/research/data_indicators/term-premia-tabs) | 模型日值、实际发布另核 | 模型估计，不是直接交易报价 |
| 通胀预期调查 | [纽约联储 SCE](https://www.newyorkfed.org/microeconomics/sce) | 月 | 期限与人群必须标明 |
| 家庭债务及逾期 | [纽约联储](https://www.newyorkfed.org/microeconomics/hhdc/background) | 季 | 区分余额逾期与新转入逾期 |
| 盈利预测/修订、共识预期 | 指定调查或市场数据商 | 事件/持续 | 保存发布前版本，确认使用权限 |
| 国债 fails、交易商持仓 | [纽约联储交易商统计](https://www.newyorkfed.org/markets/primarydealer_statistics) | 周 | 头寸不等于方向押注，fails 不等于违约 |
| 跨币种基差、swap spread、期货基差 | 指定市场数据源 | 日内/日 | 合约、期限、符号和融资约定 |

## 7. 发布节奏的使用方法

就业和 CPI 通常按月发布，PCE 随个人收入支出报告发布，GDP 按季度多次估计，初请按周发布，H.4.1 按周发布。具体哪一天、几点以及假日调整，必须读取官方日历。

不要把“通常每周某日”当成永久定时规则。采集程序应同时保存预定发布、实际发布和抓取完成状态，才能判断数据是否迟到。
