# 美国宏观经济教材 · 本地阅读站

使用 VitePress 直接展示 `textbook/` 下的 Markdown。包含分组章节导航、中文全文搜索、页内目录、上一节 / 下一节、深浅色模式及窄屏布局。无需账号、数据库或外部搜索服务。

## 启动

安装 Node.js（推荐当前 LTS），在本目录运行：

```sh
npm ci
npm run dev
```

浏览器打开 <http://127.0.0.1:5173>。首次安装依赖需要联网，之后阅读和搜索均可本地运行；教材内的官方资料链接仍需联网。终端保持运行，按 `Ctrl+C` 停止服务。只监听本机，不向局域网开放。

若端口已被占用，请停止已有服务，或运行 `npm run dev -- --port 5174`，并使用终端显示的新地址。

## 更新教材

直接修改 `textbook/*.md`，开发服务会自动刷新。原有 Markdown 链接、表格和折叠答案均保留。首页复用 `textbook/README.md`，无需额外维护内容副本。

导航读取文件一级标题，并按编号和附录文件名生成；新增现有编号范围外的章节时，调整 `textbook/.vitepress/config.mts` 的分组范围，然后重启服务。按 `Cmd+K`（Windows / Linux 为 `Ctrl+K`）搜索。

## 检查和静态预览

```sh
npm run build
npm run preview
```

静态预览地址：<http://127.0.0.1:4173>（若被占用，以终端地址为准）。生成文件位于 `textbook/.vitepress/dist/`。构建会检查站内失效链接。

服务不会自动随电脑开机启动；下次阅读重新执行 `npm run dev` 即可。

依赖说明：保留 VitePress 1 稳定版，并将其 Vite 依赖覆盖到 6.4.3 或兼容修复版本，避开旧版开发服务器的已知安全问题；具体版本由 `package-lock.json` 锁定。后续升级请重新运行构建和 `npm audit`。

参考：[VitePress 文档](https://vitepress.dev/guide/getting-started)、[本地搜索](https://vitepress.dev/reference/default-theme-search)。
