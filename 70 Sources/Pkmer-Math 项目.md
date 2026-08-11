---
type: source
up: "[[10 Maps/来源索引|来源索引]]"
track:
order:
prev: ""
next: ""
status: reading
created: 2026-08-11
updated: 2026-08-11
tags:
  - source
  - obsidian
  - mathematics
  - deployment
related:
  - "[[05 Meta/Obsidian 知识库网页部署|Obsidian 知识库网页部署]]"
  - "[[05 Meta/知识库设计原则|知识库设计原则]]"
author:
  - PKM-er
year: 2026
produced_notes:
  - "[[20 Concepts/00 Foundations/集合、子集与幂集|集合、子集与幂集]]"
  - "[[20 Concepts/00 Foundations/实数、区间与绝对值|实数、区间与绝对值]]"
  - "[[20 Concepts/00 Foundations/基、维数与坐标|基、维数与坐标]]"
  - "[[20 Concepts/00 Foundations/导数、偏导数与方向导数|导数、偏导数与方向导数]]"
  - "[[20 Concepts/00 Foundations/向量空间与线性映射|向量空间与线性映射]]"
  - "[[20 Concepts/00 Foundations/多元链式法则与Jacobian|多元链式法则与Jacobian]]"
  - "[[05 Meta/Obsidian 知识库网页部署|Obsidian 知识库网页部署]]"
source_type: GitHub repository
url: https://github.com/PKM-er/Pkmer-Math
---

# Pkmer-Math 项目

## 1. 资料定位

[Pkmer-Math](https://github.com/PKM-er/Pkmer-Math) 是一个以 Obsidian 为本地编辑环境、以 GitHub 为协作与发布平台的公开数学知识库。

它同时提供：

- 线性课程目录；
- 双向链接形成的概念网络；
- 目录、文档、词条三层内容模型；
- Bases 或 Dataview 动态索引；
- GitHub Actions 自动网页部署。

## 2. 值得借鉴的部分

### 内容形式

- 目录页负责组织章节，不承载全部正文；
- 小概念可以作为原子词条，被多个主题文档嵌入；
- 首页用动态视图显示最近编辑、待办和孤立笔记；
- Callout 用于区分定义、公式、例子和警告。

### 项目形式

- Obsidian 内容仓库与网页构建器分离；
- 内容仓库只维护 Markdown 和附件；
- GitHub Actions 在每次推送后重新生成静态网页；
- 生成结果发布到 `gh-pages` 分支。

## 3. 不宜直接照搬的部分

- 用文件名前后的多个连字符表达目录层级，可读性和可维护性不如本库的编号目录；
- `dlink` 同时承担上级和相关关系，不如本库的 `up`、`prerequisites`、`related` 分工明确；
- 部分概念词条过短，无法满足本库面向初学者的“首次出现必须解释”原则；
- 其流形页面会直接出现截面、李群和张量场等后续概念，不适合作为本库正文模板；
- Bases、Dataview、Templater 等 Obsidian 运行时功能不一定能在静态网页中直接执行。

## 4. 对本库产生的改进

本次没有复制对方正文，而是借鉴其“基础概念独立成页”的组织思想，补充：

- [[20 Concepts/00 Foundations/集合、子集与幂集|集合、子集与幂集]]；
- [[20 Concepts/00 Foundations/实数、区间与绝对值|实数、区间与绝对值]]；
- [[20 Concepts/00 Foundations/基、维数与坐标|基、维数与坐标]]；
- [[20 Concepts/00 Foundations/导数、偏导数与方向导数|导数、偏导数与方向导数]]；
- 扩写 [[20 Concepts/00 Foundations/向量空间与线性映射|向量空间与线性映射]]；
- 扩写 [[20 Concepts/00 Foundations/多元链式法则与Jacobian|多元链式法则与 Jacobian]]；
- 扩写 [[20 Concepts/00 Foundations/映射、复合与原像|映射、复合与原像]]。

网页部署机制整理在 [[05 Meta/Obsidian 知识库网页部署|Obsidian 知识库网页部署]]。

## 5. 主要链接

- [项目首页](https://github.com/PKM-er/Pkmer-Math)
- [内容规范](https://github.com/PKM-er/Pkmer-Math/blob/main/Other/%E8%AF%B4%E6%98%8E/%E5%86%85%E5%AE%B9%E8%A7%84%E8%8C%83.md)
- [部署工作流](https://github.com/PKM-er/Pkmer-Math/blob/main/.github/workflows/static.yml)
- [网页构建器](https://github.com/LincZero/LincZero.github.io)
- [LincDocs Workflow](https://github.com/LincDocs/Workflow)
