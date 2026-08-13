---
type: question
up: "[[10 Maps/问题索引|问题索引]]"
track:
order:
prev: ""
next: ""
area: differential-geometry
status: answered
created: 2026-08-12
updated: 2026-08-13
tags:
  - question
  - differential
aliases: []
prerequisites:
  - "[[20 Concepts/02 Geometry and Topology/切向量|切向量]]"
related:
  - "[[20 Concepts/02 Geometry and Topology/光滑映射的微分与推前|光滑映射的微分与推前]]"
sources: []
---

# 为什么需要 $dF_p$ 而不只知道 $F(p)$？

## 问题

如果已经知道

$$
p\mapsto F(p),
$$

为什么还需要额外定义

$$
dF_p:T_pM\to T_{F(p)}N\text{？}
$$

## 回答

$F(p)$ 只告诉我们**位置如何变化**：点 $p$ 最终被送到哪个点。

但它没有告诉我们点 $p$ 附近的微小运动经过 $F$ 后会怎样变化。

若一条曲线 $\gamma(t)$ 满足

$$
\gamma(0)=p,
\qquad
\gamma'(0)=v,
$$

那么经过 $F$ 后得到

$$
F(\gamma(t)).
$$

它在 $t=0$ 的速度为

$$
\frac{d}{dt}\bigg|_0F(\gamma(t))
=dF_p(v).
$$

所以两者分别回答：

| 对象 | 回答的问题 |
|---|---|
| $F(p)$ | 点去了哪里？ |
| $dF_p(v)$ | 这个瞬时方向经过 $F$ 后变成什么？ |

因此 $dF_p$ 是 $F$ 在 $p$ 处的一阶线性化，也是后面讨论 Jacobian、秩、浸入、淹没、正则值和约束切空间的基础。

## 关闭标准

- [x] 能区分 $F$ 与 $dF_p$ 的输入对象
- [x] 能解释 $T_pM$ 和 $T_{F(p)}N$ 为什么出现在公式中
- [x] 能用一条曲线说明 $dF_p(v)$ 从哪里来
