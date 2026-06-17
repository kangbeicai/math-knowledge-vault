# 知识库维护规范

## 新内容流程

1. 临时内容进入 `00 Inbox/`。
2. 判断属于概念、问题、来源、练习、项目或复盘。
3. 使用 `90 Templates/` 中对应模板。
4. 补充 Properties、MOC、前置知识和来源。
5. 检查 Properties、公式分隔符和双向链接后提交。

详细流程见 [[笔记生命周期]]。

## 文件命名

- 概念笔记：稳定的中文概念名。
- MOC：以 `MOC` 结尾。
- 问题笔记：完整问句。
- 来源笔记：标题加作者、年份或可识别标记。
- 周复盘：`YYYY-Www 周复盘`。
- 不在文件名中加入会频繁变化的状态。

## 链接

- 每篇正式概念笔记至少链接到一个 MOC。
- 必要前置写入 `prerequisites`。
- 非依赖联系写入 `related`。
- 链接应表达明确关系：前置、推广、对偶、类比、应用或易混淆。

## 内容

- 先说明为什么需要，再给正式定义。
- 定义与解释分开。
- 区分数学对象与坐标、矩阵或离散表示。
- 原文摘录必须标注来源。
- 尽量包含最小例子、反例和掌握检验。

## 数学格式

- 行内公式使用 `$...$`。
- 独立公式使用 `$$...$$`。
- 不使用旧式反斜杠圆括号或方括号公式分隔符。
- 定义优先使用 `:=`。

## Git 提交建议

```text
arch: upgrade vault metadata schema
notes: explain tangent space with examples
questions: resolve cotangent-vector question
sources: add textbook reading note
exercises: add manifold prerequisite exercises
fix: normalize math delimiters
```
