# 美国宏观经济教材 · 本地阅读站

使用 VitePress 直接展示 `textbook/` 下的 Markdown。包含分组章节导航、中文全文搜索、页内目录、上一节 / 下一节、深浅色模式及窄屏布局。无需账号、数据库或外部搜索服务。

2026-10-03 已扩展为“美国宏观经济与金融体系”：四部分、十二模块、42 章，补齐住房与金融市场机制，恢复综合分析、数据工作流、报告与毕业项目。[教材目录](textbook/README.md)为正式阅读入口，编号已统一，旧路径保留兼容入口。

四部分依次为：宏观经济与数据基础；金融体系、政策与债务融资；资产市场、金融工具与风险传导；综合分析与研究实践。配有只读的离线研究程序和测试，见 [data/README.md](data/README.md)。恢复报告教学不等于启动每日 agent 开发，本仓库目前没有部署该服务。

## 启动

安装 Node.js（推荐当前 LTS），在本目录运行：

```sh
npm ci
npm run dev
```

浏览器打开 <http://127.0.0.1:5173/us-econ/>。首次安装依赖需要联网，之后阅读和搜索均可本地运行；教材内的官方资料链接仍需联网。终端保持运行，按 `Ctrl+C` 停止服务。只监听本机，不向局域网开放。

若端口已被占用，请停止已有服务，或运行 `npx vitepress dev textbook --host 127.0.0.1 --port 5174 --strictPort`，并使用终端显示的新地址。

## 更新教材

直接修改 `textbook/*.md`，开发服务会自动刷新。原有 Markdown 链接、表格和折叠答案均保留。首页复用 `textbook/README.md`，无需额外维护内容副本。

正文导航由 `textbook/.vitepress/curriculum.json` 生成，附录按文件名生成。修改章节名或路径时同步清单和正文标题；新增模块时同步站点配置，然后重启服务。兼容页不进入侧栏和搜索。按 `Cmd+K`（Windows / Linux 为 `Ctrl+K`）搜索。

## 检查和静态预览

```sh
npm run check
npm run build
npm run check:rendered
npm run preview
```

静态预览地址：<http://127.0.0.1:4173/us-econ/>。若端口被占用，预览会退出，可用 `npm run preview -- --port 4174` 指定另一个端口。生成文件位于 `textbook/.vitepress/dist/`。构建与结构检查会检查站内链接、锚点和折叠答案元素，不能代替视觉和交互检查。预览使用 Vite 的显式本机监听，避免 VitePress 1 的预览实现忽略 host 参数。

本地服务不会自动随电脑开机启动；下次阅读重新执行 `npm run dev` 即可。

## GitHub Pages

站点发布后的预计地址是 <https://fangpings.github.io/us-econ/>。VitePress 的 `base` 已设为 `/us-econ/`，章节链接生成 `.html` 路径，以便在 GitHub Pages 上直接打开或刷新章节页面。

首次发布时，在仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。将站点配置和工作流推送到 `main` 后，`.github/workflows/pages.yml` 会自动安装依赖、构建并发布 `textbook/.vitepress/dist/`；也可以在 **Actions** 页面手动运行该工作流。发布结果和实际访问地址以工作流的部署记录为准。

依赖说明：保留 VitePress 1 稳定版，并将其 Vite 依赖覆盖到 6.4.3 或兼容修复版本，避开旧版开发服务器的已知安全问题；具体版本由 `package-lock.json` 锁定。后续升级请重新运行构建和 `npm audit`。

参考：[VitePress 文档](https://vitepress.dev/guide/getting-started)、[本地搜索](https://vitepress.dev/reference/default-theme-search)。
