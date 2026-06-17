---
type: concept
area: differential-geometry
status: 初见
created: 2026-06-17
updated: 2026-06-17
aliases:
  - Stokes theorem
prerequisites:
  - "[[微分形式的拉回]]"
  - "[[外微分]]"
related:
  - "[[交替张量与微分形式]]"
tags:
  - concept
  - integration
---

# 流形上的积分与 Stokes 定理

> [!summary] 一句话理解
> 广义 Stokes 定理说明：区域内部的外微分积分，等于边界上的原形式积分。

## 图示：参数化、拉回与边界方向

下图左侧表示通过拉回把流形上的形式转换为参数域上的可积对象；右侧表示区域 $M$ 的方向会诱导边界 $\partial M$ 的方向。

![拉回与 Stokes 定理](../../99%20Assets/Images/Manifolds/forms-pullback-stokes.svg)

右图中的边界箭头不是任意选择的。若反转 $M$ 的方向，诱导的边界方向也随之反转，积分符号会改变。

## 可积分对象

在有向 $n$ 维流形 $M$ 上，可以积分紧支撑的 $n$-形式。

若 $\varphi:U\subset\mathbb R^n\to M$ 是保向参数化，则

$$
\int_{\varphi(U)}\omega
=
\int_U\varphi^*\omega.
$$

多坐标图情形通过分割统一把局部积分拼接起来。

## 广义 Stokes 定理

设 $M$ 是带边界的有向 $n$ 维流形，$\omega\in\Omega^{n-1}(M)$ 具有紧支撑，则

$$
\int_M d\omega
=
\int_{\partial M}\omega.
$$

边界使用由 $M$ 诱导的方向。

## 经典定理作为特例

- 微积分基本定理；
- Green 定理；
- 经典 Stokes 定理；
- Gauss 散度定理。

它们都是同一个公式在不同维数和不同形式下的表现。

## 为什么重要？

Stokes 定理把局部微分与全局积分联系起来，是微分几何、拓扑、守恒律和有限体积方法的共同结构。

## 常见误解

> [!warning]
> 被积对象不是普通标量函数，而是与流形维数匹配的微分形式；方向改变会改变积分符号。
