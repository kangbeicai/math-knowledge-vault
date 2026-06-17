---
type: question
area: differential-geometry
status: answered
created: 2026-06-17
updated: 2026-06-17
related:
  - "[[Lie括号]]"
  - "[[向量场]]"
tags:
  - question
---

# 为什么 Lie 括号不能只由单点向量决定

Lie 括号的坐标表达包含 $X^j\partial_jY^i$ 和 $Y^j\partial_jX^i$，因此依赖两个向量场在点附近的一阶变化，而不仅是 $X(p)$ 与 $Y(p)$。

如果两个向量场在点 $p$ 取值相同，但在邻域中的变化不同，它们与第三个向量场的 Lie 括号在 $p$ 处可以不同。

因此 Lie 括号是向量场之间的运算，而不是每个切空间内部的双线性运算。
