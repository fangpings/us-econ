import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const root = fileURLToPath(new URL('../', import.meta.url))
const files = readdirSync(root).filter(file => file.endsWith('.md')).sort()
const page = (file: string) => ({
  text: readFileSync(`${root}${file}`, 'utf8').match(/^# (.+)$/m)?.[1] ?? file,
  link: file === 'README.md' ? '/' : `/${file.replace(/\.md$/, '')}`
})
const chapters = (from: number, to: number) => files
  .filter(file => /^\d{2}-.+\.md$/.test(file) && Number(file.slice(0, 2)) >= from && Number(file.slice(0, 2)) <= to)
  .map(page)

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
  title: '美国宏观经济',
  description: '从指标理解到每日监控 · 系统学习教材',
  rewrites: { 'README.md': 'index.md' },
  themeConfig: {
    siteTitle: '美国宏观经济',
    nav: [
      { text: '学习指南', link: '/' },
      { text: '开始阅读', link: '/01-economic-map' },
      { text: '指标速查', link: '/appendix-a-indicators' }
    ],
    sidebar: [
      { text: '课程介绍', items: [{ text: '学习指南与全书目录', link: '/' }] },
      ...([
        ['01—03 · 基础语言', 1, 3],
        ['04—08 · 实体经济', 4, 8],
        ['09—10 · 通胀', 9, 10],
        ['11—13 · 政策与债券', 11, 13],
        ['14—17 · 财政与资金', 14, 17],
        ['18—22 · 信用、外汇与资产', 18, 22],
        ['23—26 · 综合分析与实践', 23, 26]
      ] as const).map(([text, from, to]) => ({ text, collapsed: false, items: chapters(from, to) })),
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
