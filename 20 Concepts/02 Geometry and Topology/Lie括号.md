---
type: concept
area: differential-geometry
status: 初见
created: 2026-06-17
updated: 2026-06-17
aliases:
  - Lie bracket
prerequisites:
  - "[[向量场]]"
related:
  - "[[向量场的流]]"
tags:
  - concept
  - lie-bracket
---

# Lie括号

> [!summary] 一句话理解
> Lie 括号衡量两个向量场所生成的无穷小运动是否可交换。

## 定义

把向量场视为对光滑函数的导子，定义

$$
[X,Y][f]=X(Y[f])-Y(X[f]).
$$

可证明 $[X,Y]$ 仍是向量场。

## 坐标表达

若

$$
X=X^i\partial_i,
\qquad
Y=Y^i\partial_i,
$$

则

$$
[X,Y]
=
\left(
X^j\frac{\partial Y^i}{\partial x^j}
-
Y^j\frac{\partial X^i}{\partial x^j}
\right)\partial_i.
$$

## 基本性质

$$
[X,Y]=-[Y,X],
$$

$$
[X,[Y,Z]]+[Y,[Z,X]]+[Z,[X,Y]]=0.
$$

第二式是 Jacobi 恒等式。

## 几何意义

依次沿 $X$、$Y$、$-X$、$-Y$ 的流走一个很短时间，最终的二阶偏移由 $[X,Y]$ 控制。

因此

$$
[X,Y]=0
$$

意味着两个局部流在无穷小层面可交换。

## 为什么不是逐点向量的运算？

Lie 括号依赖 $X,Y$ 在点附近的变化率，不能只用 $X(p),Y(p)$ 两个向量决定。

## 后续

- 可积分布与 Frobenius 定理
- 李群与李代数
