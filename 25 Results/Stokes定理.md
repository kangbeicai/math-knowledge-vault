---
type: theorem
up: "[[10 Maps/流形与微分几何 MOC|流形与微分几何 MOC]]"
track: manifold-core
order: 280
prev: "[[20 Concepts/02 Geometry and Topology/微分形式的积分|微分形式的积分]]"
next: ""
area: differential-geometry
status: 初见
created: 2026-08-12
updated: 2026-08-12
tags:
  - theorem
  - stokes
  - integration
aliases:
  - Stokes theorem
  - Generalized Stokes theorem
prerequisites:
  - "[[20 Concepts/02 Geometry and Topology/外微分|外微分]]"
  - "[[20 Concepts/02 Geometry and Topology/微分形式的积分|微分形式的积分]]"
  - "[[20 Concepts/02 Geometry and Topology/带边界流形与边界定向|带边界流形与边界定向]]"
helpful_prerequisites:
  - "[[20 Concepts/02 Geometry and Topology/分割统一|分割统一]]"
related:
  - "[[20 Concepts/02 Geometry and Topology/微分形式的拉回|微分形式的拉回]]"
sources: []
---

# Stokes 定理

> [!summary] 一句话理解
> Stokes 定理把内部的局部微分 $d\omega$ 与边界上的整体积分联系起来：内部变化的总量等于边界通量的总量。

## 定理

设 $M$ 是带边界的有向 $n$ 维光滑流形，$\omega\in\Omega^{n-1}(M)$ 具有紧支撑，则

$$
\boxed{
\int_M d\omega
=
\int_{\partial M}\omega
}
$$

其中 $\partial M$ 使用由 $M$ 的定向通过“外法向优先”规则诱导的边界定向。

![拉回、边界定向与 Stokes 定理](../99%20Assets/Images/Manifolds/forms-pullback-stokes.svg)

## 每个条件在做什么？

| 条件 | 作用 |
|---|---|
| $M$ 为 $n$ 维有向流形 | 使 $n$-形式 $d\omega$ 的积分有一致符号 |
| $M$ 带边界 | 使右端 $\partial M$ 成为 $(n-1)$ 维积分区域 |
| $\omega\in\Omega^{n-1}(M)$ | 保证 $d\omega$ 是可在 $M$ 上积分的 $n$-形式 |
| 紧支撑或适当紧性条件 | 控制全局积分并避免无穷远处的额外问题 |
| 边界诱导定向 | 固定右端积分符号 |

## 为什么两边维数刚好匹配？

因为

$$
d:\Omega^{n-1}(M)\to\Omega^n(M),
$$

所以 $d\omega$ 可以在 $n$ 维 $M$ 上积分；而

$$
\dim\partial M=n-1,
$$

所以原来的 $\omega$ 正好可以在边界上积分。

这不是巧合，而是外微分、边界降维和积分次数之间的结构匹配。

## 经典定理为什么都是它的特例？

- 一维：微积分基本定理；
- 二维：Green 定理；
- 三维：经典 Stokes 定理与 Gauss 散度定理；
- 更高维：同一个外微分—边界关系继续成立。

不同版本看起来使用梯度、旋度或散度，是因为在欧氏空间配合度规和 Hodge 星算子后，微分形式可以翻译成熟悉的向量分析记号。

## 证明结构：第一轮先掌握路线

完整证明依赖分割统一和局部坐标。第一轮至少应理解以下结构：

1. 先在半空间中的一个坐标块上证明局部 Stokes；
2. 用分割统一把 $\omega$ 写成局部支撑项之和；
3. 对每一项应用局部结论；
4. 重叠处的内部边界贡献相互抵消；
5. 最后只剩真实边界 $\partial M$ 上的积分。

所以分割统一不是与 Stokes 无关的附加技术，而是把局部定理拼成全局定理的工具。

## 与守恒律的关系

Stokes 的抽象形式

$$
\int_M d\omega=\int_{\partial M}\omega
$$

表达了一种非常普遍的结构：**区域内部的变化与边界交换相联系**。这也是连续介质守恒律、有限体积方法和许多积分守恒关系背后的共同数学结构。

## 常见误解

- Stokes 不是一个只属于三维向量分析的定理。
- 右端边界方向不是任意选取，而由 $M$ 的定向诱导。
- 被积对象是微分形式；把它写成向量分析公式需要额外的欧氏度量结构。
- “理解公式”与“掌握严格证明”是两个成熟度层级；后者还需要真正使用分割统一和局部 Stokes。

## 掌握检验

- [ ] 能逐项解释定理假设
- [ ] 能解释两边形式次数与流形维数为何匹配
- [ ] 能把微积分基本定理看成一维特例
- [ ] 能说明边界定向如何进入符号
- [ ] 能复述“局部证明 + 分割统一 + 拼接”的证明路线

## 导航

- 上一页：[[20 Concepts/02 Geometry and Topology/微分形式的积分|微分形式的积分]]
