import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const root = fileURLToPath(new URL('../', import.meta.url))
const files = readdirSync(root).filter(file => file.endsWith('.md')).sort()
const curriculum: { number: number; slug: string; title: string; module: number }[] = JSON.parse(readFileSync(`${root}.vitepress/curriculum.json`, 'utf8'))
const page = (file: string) => ({
  text: readFileSync(`${root}${file}`, 'utf8').match(/^# (.+)$/m)?.[1] ?? file,
  link: file === 'README.md' ? '/' : `/${file.replace(/\.md$/, '')}`
})
const modules = ['经济地图与研究语言', '实体经济的运行', '价格与通胀', '金融体系与货币政策', '财政、国债与利率', '企业与地方政府融资', '住房与家庭资产负债表', '外汇与全球美元', '股票市场', '商品市场', '衍生品、履约与金融机构', '综合分析与研究实践']
const moduleGroup = (number: number) => ({ text: `模块 ${number} · ${modules[number - 1]}`, collapsed: false, items: curriculum.filter(c => c.module === number).map(c => ({ text: `${String(c.number).padStart(2, '0')} ${c.title}`, link: `/${c.slug}` })) })

// Use word segmentation for Chinese phrases and preserve English tickers/acronyms.
// The function is serialized by VitePress and runs in both indexing and querying.
function tokenize(text: string) {
  return Array.from(new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text))
    .filter(part => part.isWordLike)
    .map(part => part.segment)
}

export default defineConfig({
  base: '/us-econ/',
  lang: 'zh-CN',
  title: '美国宏观经济与金融体系',
  description: '从指标形成到市场理解 · 系统学习教材',
  rewrites: { 'README.md': 'index.md' },
  themeConfig: {
    siteTitle: '美国宏观经济与金融体系',
    nav: [
      { text: '学习指南', link: '/' },
      { text: '开始阅读', link: '/01-economic-map' },
      { text: '指标速查', link: '/appendix-a-indicators' }
    ],
    sidebar: [
      { text: '课程介绍', items: [{ text: '学习指南与全书目录', link: '/' }] },
      ...([
        ['第一部分 · 宏观经济与数据基础', [1, 2, 3]],
        ['第二部分 · 金融体系、政策与债务融资', [4, 5, 6]],
        ['第三部分 · 资产市场、金融工具与风险传导', [7, 8, 9, 10, 11]],
        ['第四部分 · 综合分析与研究实践', [12]]
      ] as const).map(([text, numbers]) => ({ text, collapsed: false, items: numbers.map(moduleGroup) })),
      { text: '配套资料', collapsed: false, items: files.filter(file => file.startsWith('appendix-')).map(page) }
    ],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一节', next: '下一节' },
    sidebarMenuLabel: '章节目录',
    darkModeSwitchLabel: '切换外观',
    lightModeSwitchTitle: '切换为浅色',
    darkModeSwitchTitle: '切换为深色',
    returnToTopLabel: '回到顶部',
    search: {
      provider: 'local',
      options: {
        miniSearch: { options: { tokenize } },
        translations: {
          button: { buttonText: '搜索教材', buttonAriaLabel: '搜索教材' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除搜索',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关内容',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    }
  }
})
