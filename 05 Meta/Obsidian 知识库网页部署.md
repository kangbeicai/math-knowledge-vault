---
type: meta
up: "[[10 Maps/知识库系统 MOC|知识库系统 MOC]]"
track:
order:
prev: ""
next: ""
area: interdisciplinary
status: active
created: 2026-08-11
updated: 2026-08-12
tags:
  - meta
  - obsidian
  - github-pages
  - deployment
aliases:
  - Obsidian vault web deployment
  - 数学知识库网页发布
---

# Obsidian 知识库网页部署

> [!summary] 一句话理解
> 网页部署不是把 Obsidian 程序搬到服务器，而是用一个静态网站生成器读取 Markdown，生成普通 HTML、CSS 和 JavaScript，再由 GitHub Pages 等网页服务器公开这些生成文件。

## 1. 先区分四个角色

| 角色 | 在流程中负责什么 |
|---|---|
| Obsidian | 本地编辑 Markdown、链接、属性和附件 |
| GitHub 仓库 | 保存版本历史，触发自动构建 |
| 静态网站生成器 | 把 Markdown 转换为网页 |
| GitHub Pages | 把生成后的静态文件通过网址提供给读者 |

因此 GitHub Pages 通常不直接理解 Obsidian 笔记。中间必须有一个“构建”步骤，把 Obsidian Markdown 转成浏览器能显示的网页文件。

```mermaid
flowchart LR
    A[Obsidian 知识库] -->|git push| B[GitHub 内容仓库]
    B -->|触发工作流| C[GitHub Actions]
    C --> D[静态网站生成器]
    D --> E[HTML CSS JavaScript]
    E --> F[gh-pages 分支]
    F --> G[GitHub Pages 网站]
```

## 2. Pkmer-Math 实际使用的部署结构

`Pkmer-Math` 没有把完整网页框架放在自己的知识库中，而是把“内容”和“构建器”分开：

| 仓库 | 内容 |
|---|---|
| `PKM-er/Pkmer-Math` | 数学 Markdown、图片和 Obsidian 文件 |
| `LincZero/LincZero.github.io` | VuePress、主题、插件和构建脚本 |

其工作流文件是：

[`.github/workflows/static.yml`](https://github.com/PKM-er/Pkmer-Math/blob/main/.github/workflows/static.yml)

## 3. 工作流逐步解释

### 第一步：监听 `main` 分支

```yaml
on:
  push:
    branches: ["main"]
  workflow_dispatch:
```

含义是：

- 每次向 `main` 推送时自动部署；
- 也允许在 GitHub Actions 页面手动运行。

### 第二步：检出网页构建器

```yaml
uses: actions/checkout@v4
with:
  repository: LincZero/LincZero.github.io
  ref: main
```

此时工作目录中首先出现的不是数学笔记，而是 VuePress 构建系统。

### 第三步：安装构建环境

工作流安装：

- `pnpm 9`：JavaScript 包管理器；
- `Node.js 22`：运行 VuePress 和构建脚本；
- `package.json` 中声明的 VuePress、VuePress Theme Hope、KaTeX、Mermaid 等依赖。

### 第四步：克隆内容仓库

构建器随后在 `src/` 下克隆当前知识库：

```bash
git clone --depth 1 https://github.com/${GITHUB_REPOSITORY}.git temp_repo
```

再把笔记复制到 VuePress 的内容目录中。这样同一个构建器可以服务不同的 Markdown 仓库。

### 第五步：生成配置

脚本根据当前 GitHub 仓库名称、网址和路径生成 VuePress 配置，例如：

- 网站标题；
- 仓库链接；
- 网页基础路径；
- 侧边栏和导航；
- 编辑链接。

### 第六步：构建静态网页

```bash
pnpm run docs:build
```

对应实际命令是 VuePress Vite 构建。结果输出到

```text
src/.vuepress/dist/
```

这个目录中的内容已经是浏览器可以直接读取的静态网站。

### 第七步：发布到 `gh-pages`

```yaml
uses: JamesIves/github-pages-deploy-action@v4
with:
  branch: gh-pages
  folder: src/.vuepress/dist
```

该步骤把构建结果提交到当前仓库的 `gh-pages` 分支。GitHub Pages 再从这个分支提供网页。

## 4. 为什么源文件和生成文件要分开？

源文件是适合编辑的 Markdown；生成文件是适合浏览器读取的 HTML、CSS 和 JavaScript。

把它们分开有几个好处：

- `main` 分支保持干净，只保存知识内容；
- `gh-pages` 分支可以随时重新生成；
- 不需要人工编辑生成后的 HTML；
- 构建失败不会破坏原始笔记。

## 5. Obsidian 语法不一定都能部署

静态网站生成器必须逐项实现 Obsidian 语法。需要重点检查：

| 功能 | 网页生成器是否容易支持 |
|---|---|
| 普通 Markdown | 通常支持 |
| Wikilink | 需要专门解析 |
| Callout | 需要插件或转换 |
| LaTeX 数学公式 | 需要 KaTeX 或 MathJax |
| Mermaid | 需要 Mermaid 插件 |
| 图片与 SVG | 通常支持，但要处理路径 |
| 块引用与标题嵌入 | 取决于生成器 |
| Obsidian Bases | 通常不会在网页中动态运行 |
| Templater | 只负责创建笔记，发布时不会运行 |
| Dataview | 通常不会直接运行，需要预渲染或替代页面 |

> [!warning]
> 当前 `Home.md` 中嵌入的 `.base` 动态视图，在普通静态网站上很可能不会显示为 Obsidian 中的表格。网页发布前需要准备普通 Markdown 导航作为降级入口。

## 6. Pkmer-Math 方案的优点与风险

### 优点

- 内容仓库和网站代码分离；
- 自动支持数学公式、Mermaid、Callout 和部分 Obsidian 链接；
- 推送后自动更新；
- 不需要自己维护服务器。

### 风险

- 如果构建器直接跟随另一个人的 `main` 分支，对方改动可能导致我们的部署突然变化；
- 工作流拥有 `contents: write` 权限，因为它需要写入 `gh-pages`；
- 构建器较复杂，初学时不容易判断问题来自笔记、VuePress、主题还是工作流；
- `set-output` 等旧式 GitHub Actions 写法未来可能需要更新；
- Bases 和某些 Obsidian 嵌入语法仍需单独处理。

因此，若采用这种方式，最好把构建器固定到一个自己的 fork 或明确版本，而不是永远跟随外部仓库的最新 `main`。

## 7. 本知识库可选择的路线

### 路线 A：复用或 fork LincZero 构建器

最接近 `Pkmer-Math` 当前效果，适合专门学习该项目的工作流。

优点是已有较丰富的 Obsidian 语法支持；缺点是构建系统较重，需要理解其自定义脚本。

> [!success] 当前采用路线
> 本知识库已经采用路线 A，并将构建器固定在提交 `54cdc975bfad38ccd60244430afecc511d4592e1`。工作流不会自动跟随外部仓库的后续变化。

### 路线 B：Quartz

Quartz 是面向 Obsidian 知识库的静态网站生成器，通常较容易获得：

- Wikilink；
- 反向链接；
- 图谱；
- 搜索；
- Callout；
- 数学公式。

它仍然不能自动执行所有 Bases 和 Templater 功能，但学习成本通常低于定制 VuePress 构建器。

### 路线 C：Obsidian Publish

这是 Obsidian 官方付费服务，配置最少，但不以 GitHub Actions 为核心，也不适合学习完整的静态网站部署过程。

## 8. 路线 A 的实现文件

| 文件 | 作用 |
|---|---|
| `.github/workflows/deploy-pages-route-a.yml` | 云端构建并发布 `gh-pages` |
| `.github/deploy/config_cover.js` | 网站标题、描述和发布范围 |
| `.github/deploy/theme_cover.js` | 导航、侧边栏、页脚和主题选项 |
| `.github/deploy/build-local.ps1` | 使用 `pwsh 7` 在本地复现完整构建 |
| `.github/deploy/git_config.local.json` | 本地构建时使用的仓库与基础路径配置 |

云端构建时，当前知识库必须检出到 `$GITHUB_WORKSPACE` 根目录，外部 VuePress 构建器才放在 `site/` 子目录。部署 Action 需要从根目录中的 `.git` 读取当前仓库远端；如果两个仓库都放在子目录，部署阶段会以 Git `exit 128` 失败。

云端工作流只在以下情况运行：

- 推送到 `main`；
- 在 GitHub Actions 页面手动触发。

当前默认不发布：

- `00 Inbox/`；
- `80 Reviews/`；
- `.obsidian/`、`.github/`、`.agents/` 等配置目录。

## 9. 本地构建

在仓库根目录使用 `pwsh 7` 运行：

```powershell
pwsh -NoProfile -File .github/deploy/build-local.ps1
```

脚本会：

1. 下载固定版本的 LincZero 构建器；
2. 在系统临时目录创建隔离的构建副本；
3. 安装固定的 `pnpm 9.15.9` 依赖；
4. 注入本项目配置；
5. 生成 VuePress 静态网页。

成功后会输出 `dist` 目录路径。所有生成文件都位于系统临时目录，不会写入知识库正文目录。

## 10. 当前验证结果

2026-08-11 已完成一次本地完整构建：

- VuePress 成功生成 `189` 个页面；
- 根首页 `index.html` 已生成；
- [[10 Maps/数学知识地图|数学知识地图]]已生成对应 HTML；
- [[30 Learning Paths/流形与微分几何学习路径|流形与微分几何学习路径]]已生成对应 HTML；
- 本部署说明页已生成对应 HTML；
- CSS、JavaScript、站点地图和 `robots.txt` 已生成。

构建器原有的 `SlimSearch` 会因为部分长笔记中存在重复标题而生成重复索引 ID，因此当前站点配置暂时关闭全文搜索。页面渲染、侧边栏和普通导航不受影响。

本库的 YAML 属性 `prev`、`next` 保存的是 Obsidian Wikilink，而 VuePress Theme Hope 默认会把同名属性当作网页路由。为避免主题生成错误的上一页、下一页地址，当前配置关闭了主题自带的页脚导航，继续使用每篇正文末尾已经正确转换的“导航”章节。

构建时，`prepare-vuepress-content.mjs` 只在临时构建副本中把 `prev`、`next` 改名为 `obsidian_prev`、`obsidian_next`。知识库源文件和 Obsidian Properties 不会被修改。

## 11. 首次公开发布步骤

1. 提交并推送当前部署文件；
2. 将部署配置合并到 `main`，或在 GitHub Actions 中手动运行 `Deploy knowledge vault`；
3. 等待工作流创建 `gh-pages` 分支；
4. 打开 GitHub 仓库的 `Settings → Pages`；
5. 将发布来源设置为 `Deploy from a branch`；
6. 选择 `gh-pages` 分支和 `/ (root)` 目录；
7. 等待 GitHub Pages 给出站点地址。

预期网址为：

```text
https://kangbeicai.github.io/math-knowledge-vault/
```

首次发布后，后续每次推送到 `main` 都会自动重新构建网站。

## 12. 推荐的学习顺序

对本知识库，建议分四步学习，不立即把整个仓库公开：

1. **理解构建链路**：先读懂本页和 `static.yml`。
2. **本地构建试验**：在独立分支或单独目录生成网页，检查链接、公式、图片和 Callout。
3. **部署最小样例**：只发布几篇测试笔记，确认 GitHub Pages 路径和资源引用。
4. **决定公开范围**：确认没有私人笔记、下载资料、版权受限文件或不希望公开的附件，再部署完整内容。

## 13. 当前仓库状态

当前内容仓库远端为：

```text
https://github.com/kangbeicai/math-knowledge-vault.git
```

当前开发分支为：

```text
obsidian-v2
```

仓库已经加入路线 A 的 GitHub Pages 部署工作流，但当前配置仍位于开发分支，尚未推送并触发公开发布。

> [!important]
> 工作流一旦在远端运行，仓库中的公开范围内容就会生成公开网页。提交前仍需检查附件版权和不希望公开的页面。

## 14. 自检问题

- [ ] 能解释 GitHub Pages 为什么不能直接运行 Obsidian
- [ ] 能说明 `main` 与 `gh-pages` 分支分别保存什么
- [ ] 能解释 GitHub Actions 在什么时候运行
- [ ] 能指出 Bases 在静态网页发布中的兼容性问题
- [ ] 能说明为什么最好 fork 并固定构建器版本

> [!example]- 参考答案
> Obsidian 是本地编辑器，GitHub Pages 只提供静态网页，所以必须先用构建器把 Markdown 转成 HTML。
>
> `main` 保存源笔记，`gh-pages` 保存构建结果。GitHub Actions 在推送后自动完成转换和发布。
>
> Bases 依赖 Obsidian 内部运行环境，普通静态生成器通常不能直接执行，因此需要替代的静态索引或专门转换。

## 相关页面

- [[70 Sources/Pkmer-Math 项目|Pkmer-Math 项目]]
- [[05 Meta/知识库架构 V2|知识库架构 V2.1]]
- [[05 Meta/知识库设计原则|知识库设计原则]]
- [[05 Meta/图片与图表规范|图片与图表规范]]
