// One-time, guarded mechanical curriculum migration. Never overwrite migrated work.
import fs from 'node:fs'
import path from 'node:path'
const root = path.resolve(import.meta.dirname, '..')
const book = path.join(root, 'textbook')
const manifestPath = path.join(book, '.vitepress/curriculum.json')
if (fs.existsSync(manifestPath)) throw new Error('Already migrated; refusing to overwrite chapters')
const rows = [
['01-economic-map','01-economic-map','经济地图：生产、收入、支出与融资',1],
['02-measurement','02-measurement','数字、增长率与统计口径',1],
['03-releases-and-vintages','03-releases-and-vintages','数据发布、市场预期与历史修订',1],
['04-gdp','04-gdp','GDP 与经济增长来源',2],
['05-consumption','05-consumption','消费、收入与家庭现金流',2],
['06-labor','06-labor','就业、失业与工资',2],
['07-business-and-housing','07-business-activity','企业生产、景气与资本开支',2],
['08-productivity','08-productivity','生产率、供给约束与长期增长',2],
['09-inflation-measures','09-inflation-measures','CPI、PCE 与价格指数',3],
['10-inflation-mechanisms','10-inflation-mechanisms','通胀来源、持续性与预期',3],
['financial-system-map','11-financial-system-map','金融体系地图：资金、合同、机构与市场',4],
['15-balance-sheets','12-bank-balance-sheets','银行资产负债表、存款与准备金',4],
['11-monetary-policy','13-monetary-policy','美联储与货币政策传导',4],
['16-money-markets','14-money-markets','货币市场：回购、SOFR 与短期融资',4],
['18-bank-credit','15-bank-credit','银行信贷、非银行融资与金融条件',4],
['14-fiscal-policy','16-fiscal-policy','财政、政府债务、发行安排与 TGA',5],
['12-bonds-and-curves','17-bonds-and-curves','债券合同、价格、久期与收益率曲线',5],
['17-treasury-plumbing','18-treasury-plumbing','国债拍卖、二级交易与市场流动性',5],
['13-yield-decomposition','19-yield-decomposition','实际收益率、通胀补偿与期限溢价',5],
['corporate-financing','20-corporate-financing','企业债务融资：公司债、银团贷款与私人信贷',6],
['19-credit-risk','21-credit-risk','信用利差、违约、清偿与偿债能力',6],
['municipal-finance','22-municipal-finance','州与地方政府融资：市政债与财政约束',6],
['housing-market','23-housing-market','住房市场：开发、交易、库存与价格',7],
['housing-returns','24-housing-returns','买房、租房与住房持有回报',7],
['mortgages-households','25-mortgages-households','按揭、再融资与家庭资产负债表',7],
['housing-securitization','26-housing-securitization','从房贷到 MBS：住房金融与证券化',7],
['housing-cycle','27-housing-cycle','住房周期、金融风险与宏观传导',7],
['20-fx-and-dollar','28-fx-and-dollar','外汇市场、汇率与美元定价',8],
['21-global-dollar','29-global-dollar','离岸美元、跨境融资与国际收支',8],
['22-assets-and-global','30-equity-market','股票发行、交易与指数',9],
['23-corporate-earnings','31-corporate-earnings','企业盈利、财报与预期',9],
['24-equity-valuation','32-equity-valuation','股票估值与宏观传导',9],
['25-equity-flows-and-volatility','33-shareholder-returns','股东回报、资金行为与市场波动',9],
['26-commodities-and-cross-asset','34-commodities','商品市场：原油、黄金、库存与期货曲线',10],
['derivative-contracts','35-derivative-contracts','衍生品合同：远期、期货、互换与期权',11],
['market-infrastructure','36-market-infrastructure','从成交到履约：清算、结算、保证金与抵押品',11],
['financial-institutions','37-financial-institutions','谁在持有资产：基金、保险、养老金与杠杆投资者',11],
['joint-diagnosis','38-joint-diagnosis','宏观与市场联合诊断：竞争性解释与证据组合',12],
['historical-research','39-historical-research','历史事件研究：重建当时可得的信息',12],
['data-workflow','40-data-workflow','数据工作流：指标注册、版本、转换与质量检查',12],
['research-reports','41-research-reports','日报、周报与月报：从观测到判断',12],
['capstone-report','42-capstone-report','毕业项目：完成一份可复核的宏观金融报告',12]
]
const original = Object.fromEntries(fs.readdirSync(book).filter(f=>f.endsWith('.md')).map(f=>[f.slice(0,-3),fs.readFileSync(path.join(book,f),'utf8')]))
const part=(s,a,b)=>{const start=s.indexOf(a);const end=b?s.indexOf(b,start+1):s.length;if(start<0||end<start)throw new Error('Missing marker '+a);return s.slice(start,end).trim()+'\n\n'}
const old7=original['07-business-and-housing']
const housingCore=part(old7,'## 5. 住房','## 7. 房贷').replace(/^(#{2,3}) ([56])([.\s])/gm,(_,h,n,x)=>`${h} ${Number(n)-4}${x}`)
const houseReport=part(old7,'### 9.2 再读新屋销售','## 10. 为每日监控').replace('### 9.2 再读','## 4. 原始报告带读：')
const exercise=(n)=>part(old7,`### 练习 ${n}：`,n===8?'## 本章小结':`### 练习 ${n+1}：`)
original['housing-market']=`# 住房市场：开发、交易、库存与价格

> 第 23 章，2026-10-03 重组深化。统计形成与历史带读来自原第 07 章，保留其核查版本；新增交易与开发案例为教学假设，不代表当前市场。

## 学习主线：一套房怎样进入工程、成交和价格统计？

同一月份可以许可增加、开工减少、竣工增加、成交下降而中位价上涨。要理解这些组合，先走完开发与买卖流程，再检查记录哪些事件、怎样抽样估计。读完应能复算库存与年率、区别签约和交割、读价格指数，并列出反证。前置为统计口径和 GDP，不要求先懂按揭或证券化。

建议分两次：先看施工和销售的两个时钟，再做项目现金与原始报告。住房回报、家庭融资和 MBS 在后续章节展开，这里只解释形成市场结果的必要环节。

${housingCore}
## 3. 开发与成交：价格形成不是指数机构决定的

土地取得与许可之后，开发商先评估可售价格、工程成本、工期和融资，再决定开工；许可不等于项目必须立即执行。自编 10 套住房项目，预计每套售价 400,000，土地、施工和费用合计 3,500,000，预计总销售 4,000,000，看似有 500,000 余量。但如果尚未交割就必须支付 3,000,000，股东只投入 1,000,000，其余仍需贷款或其他合规资金安排。预期利润不能支付今天的施工账单。

若售价下调 5%，总销售变为 3,800,000；若同时成本上升 200,000，项目余量只剩 100,000，尚未计延迟带来的额外利息。开发商可能降价加快交割，也可能补贴买家利率或减少新开工。应比较实际合同现金与优惠，而不只看挂牌价。

既有房屋交易通常从挂牌、看房、报价和反报价进入双方协议，随后根据合同完成检查、估价、贷款和产权等条件，最后交割。具体条件因合同和地区不同。挂牌价是卖方意愿，不保证成交；评估价是估价用途的意见，不等于市场买方已经支付；成交价也受房屋状况和附带优惠影响。

自编卖方挂牌 420,000，买方报价 400,000，最后同意 410,000，卖方另承担买方 8,000 约定费用。新闻中的成交价可以仍为 410,000，但与不含优惠的另一笔 410,000 不能直接当作完全相同经济交易。估价、贷款审批或检查失败还可能使合同无法交割。

价格指数在这些现实交易之后采集、筛选、汇总或建模，不能倒过来说指数机构决定每套房应成交多少。重复交易模型的质量控制也不等于每套房没有翻修和样本偏差。比较不同指数应读样本、地区、日期、平滑与修订规则，而不是只比较线的方向。

${houseReport}
## 5. 从市场读数到政策与投资判断

高库存月数可以来自更多待售，也可以来自销售骤降；成品库存和远期项目的现金压力不同。房贷报价上升时，买方购买力可能下降，低息旧房主也可能减少挂牌，量价不必同步。人口迁入、建筑约束、收入与供给结构使全国平均不能替代地方判断。

监控应依次记录许可、开工、在建、竣工、新房签约、成屋交割、库存施工阶段、同质房价和新租金；不是把它们简单相加。每项保留观察期、公布日、季调年率及初值/修订。没有新发布时显示最后观察期，不把每次刷新当作新数据。

## 6. 练习与参考答案

${exercise(4)}${exercise(5)}${exercise(7)}
### 综合练习：项目盈利与资金缺口

沿用 10 套项目，若本期只交割 5 套、每套 380,000，本期已付成本 3,000,000，期初项目现金 1,000,000，无其他流入，期末现金缺口多少？能否仅凭缺口断言项目最终亏损？

<details><summary>参考答案</summary>

交割收款 1,900,000，可用现金 2,900,000，比已付成本少 100,000，需要补充融资或其他资金。最终盈利还取决于剩余销售、剩余成本与融资费用，不能只凭时点缺口判断；但缺口不解决也可能使原本有盈利的工程中断。

</details>
`
const enterpriseIntro=`# 企业生产、景气与资本开支

## 从订单到实际生产

订单增加不等于已经生产，出货增加也不一定说明新需求更强。本章用企业账簿、经理调查、实物生产和资本支出建立一条证据链。读完应能复算订单、扩散指数与利用率，区分需求增长和供给修复，并读原始报告。

前置为统计口径和 GDP。原章中的住房内容已独立为住房模块，原始旧页面保留兼容档案。以下原有统计方法与案例保留原核查日期，新增编排于 2026-10-03 完成。数字除明确历史发布外为教学假设。

`
original['07-business-and-housing']=enterpriseIntro+part(old7,'## 1. 一张订单','## 5. 住房')+part(old7,'### 9.1 先读 G.17','### 9.2 再读').replace('### 9.1 先读','## 5. 原始报告带读：')+'## 6. 投资意愿怎样变成资本支出\n\n企业可能先用库存或加班满足需求，再购买设备。获批投资预算、签订单、交付、安装与投产的时点不同；资本品出货只是其中证据，不等于所有行业实际投资。价格上涨也会提高名义订单，研究实际活动应检查数量与价格。融资成本更高可能推迟边际项目，但预期销售改善可能抵销；不要用一个订单增速推算固定的政策反应。\n\n## 练习与参考答案\n\n'+exercise(1)+exercise(2)+exercise(3)+exercise(8)+'## 本章小结\n\n订单是承诺，生产是活动，出货是交付；供应修复与需求增强可能给出相似总量但不同价格信号。继续学习生产率，住房的完整链条见[第 23 章](housing-market.md)。\n'
const mortgageMethods=part(old7,'### 7.1 Fed','### 7.3 同样借').replace(/### 7\.[12] /g,'### ')
original['mortgages-households']+='\n## 补充带读：市场报价与 PMMS 的形成\n\n'+mortgageMethods
// Move the complete cross-asset example, not just its conclusions.
const commodity=original['26-commodities-and-cross-asset']
const cross=part(commodity,'## 3. 把股票','## 4. 阅读市场')
original['joint-diagnosis']=original['joint-diagnosis'].replace('既有商品章的逐步跨资产案例将在目录迁移时移入本章，保留输入、计算、新闻时间边界和反证训练。它们是本章方法的进一步应用，不是额外的当前行情预测。',cross.replace('## 3. 把股票','### 把股票').replace(/### 3\.[1-4] /g,'#### '))
original['26-commodities-and-cross-asset']=commodity.replace(cross.trim(),'## 3. 跨资产应用入口\n\n完整的输入、计算、发布时间与反证案例已移入[联合诊断](joint-diagnosis.md)。本章保留商品机制及相应练习，综合题可结合该章完成。')
const newByOld=Object.fromEntries(rows.map(([s,t])=>[s,t]))
const numMap=Object.fromEntries(rows.filter(([s])=>/^\d\d-/.test(s)).map(([s],i)=>[Number(s.slice(0,2)),rows.findIndex(r=>r[0]===s)+1]))
const remap=s=>s.replace(/\]\(([^)\s]+?)(#[^)]*)?\)/g,(all,p,hash='')=>{
 const ext=p.endsWith('.md')?'.md':p.endsWith('.html')?'.html':'';const stem=ext?p.slice(0,-ext.length):p;
 return newByOld[stem]?`](${newByOld[stem]}${ext}${hash})`:all
}).replace(/第\s*(\d{1,2})\s*[—–-]\s*(\d{1,2})\s*章/g,(_,a,b)=>`第 ${Array.from({length:Number(b)-Number(a)+1},(_,i)=>numMap[Number(a)+i]??Number(a)+i).join('、')} 章`).replace(/第\s*(\d{1,2})\s*章/g,(_,n)=>`第 ${numMap[Number(n)]??n} 章`)
const stripNav=s=>s.replace(/^---\n[\s\S]*?\n---\n/,'').replace(/^\[(?:上一节|课程目录|目录)\][^\n]*\n/gm,'')
const manifest=rows.map(([source,slug,title,module],index)=>({number:index+1,source,slug,title,module}))
// Preflight every source and target before touching the workspace.
for(const r of manifest){if(!original[r.source])throw new Error('Missing '+r.source);if(r.slug!==r.source&&fs.existsSync(path.join(book,r.slug+'.md')))throw new Error('Target exists '+r.slug)}
const originalSources=Object.fromEntries(rows.map(([s])=>[s,fs.existsSync(path.join(book,s+'.md'))?fs.readFileSync(path.join(book,s+'.md'),'utf8'):null]))
for(const r of manifest){
 let body=stripNav(original[r.source]);
 if(/^\d\d-/.test(r.source)||r.source==='financial-system-map')body=remap(body);else body=body.replace(/\]\(([^)\s]+\.md)\)/g,(a,p)=>newByOld[p.slice(0,-3)]?`](${newByOld[p.slice(0,-3)]}.md)`:a)
 body=body.replace(/^# .+$/m,`# ${String(r.number).padStart(2,'0')} ${r.title}`).replace(/目标第\s*\d+\s*章/g,`第 ${r.number} 章`)
 if(r.source==='financial-system-map')body=body.replace(/新体系第 11 章[^\n]*/,'2026-10-03。全书已按新体系迁移编号。除明确标注历史资料外，数值均为教学假设。')
 const prev=manifest[r.number-2],next=manifest[r.number];
 const nav=[prev?`[上一章](${prev.slug}.md)`:'', '[目录](README.md)', next?`[下一章](${next.slug}.md)`:''].filter(Boolean).join(' · ')
 body=body.replace(/^(# .+)\n/,`$1\n\n${nav}\n`)
 fs.writeFileSync(path.join(book,r.slug+'.md'),body.trim()+'\n\n'+nav+'\n')
}
for(const r of manifest){
 if(r.source===r.slug||originalSources[r.source]===null)continue;
 if(r.source==='07-business-and-housing'){
  fs.writeFileSync(path.join(book,r.source+'.md'),`---\nsearch: false\nsidebar: false\nprev: false\nnext: false\n---\n\n> 旧版兼容档案（原第 07 章）。企业内容已迁至[第 07 章](${newByOld[r.source]}.md)，住房专题从[第 23 章](23-housing-market.md)开始。本页保留原编号与锚点，便于旧链接和姐妹篇引用；新学习请使用新版。\n\n`+originalSources[r.source]);continue
 }
 const destination='/'+r.slug+'.html'
 fs.writeFileSync(path.join(book,r.source+'.md'),`---\nsearch: false\nsidebar: false\nprev: false\nnext: false\n---\n\n# 章节已迁移\n\n此旧路径保留兼容，请阅读[第 ${r.number} 章：${r.title}](${r.slug}.md)。\n\n<script setup>\nimport { onMounted } from 'vue'\nimport { withBase } from 'vitepress'\nonMounted(() => { window.location.replace(withBase('${destination}') + window.location.search + window.location.hash) })\n</script>\n`)
}
for(const f of fs.readdirSync(book).filter(f=>f.startsWith('appendix-')&&f.endsWith('.md'))){let s=fs.readFileSync(path.join(book,f),'utf8');s=remap(s);s=s.replace(/见 (\d{2})(?=[ |；，])/g,(_,n)=>`见 ${String(numMap[Number(n)]??n).padStart(2,'0')}`);fs.writeFileSync(path.join(book,f),s)}
fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n')
console.log('Migrated 42 chapters; preserved all original paths; manifest written.')
