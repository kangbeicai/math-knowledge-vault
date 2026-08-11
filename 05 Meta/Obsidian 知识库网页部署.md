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
updated: 2026-08-11
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

- 构建依赖另一个人的 `main` 分支，对方改动可能导致我们的部署突然变化；
- 工作流拥有 `contents: write` 权限，因为它需要写入 `gh-pages`；
- 构建器较复杂，初学时不容易判断问题来自笔记、VuePress、主题还是工作流；
- `set-output` 等旧式 GitHub Actions 写法未来可能需要更新；
- Bases 和某些 Obsidian 嵌入语法仍需单独处理。

因此，若采用这种方式，最好把构建器固定到一个自己的 fork 或明确版本，而不是永远跟随外部仓库的最新 `main`。

## 7. 本知识库可选择的路线

### 路线 A：复用或 fork LincZero 构建器

最接近 `Pkmer-Math` 当前效果，适合专门学习该项目的工作流。

优点是已有较丰富的 Obsidian 语法支持；缺点是构建系统较重，需要理解其自定义脚本。

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

## 8. 推荐的学习顺序

对本知识库，建议分四步学习，不立即把整个仓库公开：

1. **理解构建链路**：先读懂本页和 `static.yml`。
2. **本地构建试验**：在独立分支或单独目录生成网页，检查链接、公式、图片和 Callout。
3. **部署最小样例**：只发布几篇测试笔记，确认 GitHub Pages 路径和资源引用。
4. **决定公开范围**：确认没有私人笔记、下载资料、版权受限文件或不希望公开的附件，再部署完整内容。

## 9. 当前仓库状态

当前内容仓库远端为：

```text
https://github.com/kangbeicai/math-knowledge-vault.git
```

当前开发分支为：

```text
obsidian-v2
```

仓库目前没有 GitHub Pages 部署工作流。本页只完成原理与路线整理，尚未启用公开发布。

> [!important]
> 真正部署前，需要先决定使用 VuePress 构建器还是 Quartz，以及网站是完全公开、只发布筛选后的目录，还是另外维护一个公开内容分支。

## 10. 自检问题

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
- [[05 Meta/知识库架构 V2|知识库架构 V2]]
- [[05 Meta/知识库设计原则|知识库设计原则]]
- [[05 Meta/图片与图表规范|图片与图表规范]]
