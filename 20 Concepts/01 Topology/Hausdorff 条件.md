---
type: concept
up: "[[10 Maps/几何与拓扑 MOC|几何与拓扑 MOC]]"
track: topology-prep
order: 50
prev: "[[20 Concepts/01 Topology/子空间拓扑|子空间拓扑]]"
next: "[[20 Concepts/01 Topology/拓扑基与第二可数|拓扑基与第二可数]]"
area: topology
status: 初见
created: 2026-06-17
updated: 2026-06-18
tags:
  - concept
  - topology
aliases:
  - Hausdorff condition
  - T2 condition
prerequisites:
  - "[[20 Concepts/01 Topology/拓扑空间与开集|拓扑空间与开集]]"
related:
  - "[[20 Concepts/01 Topology/拓扑基与第二可数|拓扑基与第二可数]]"
  - "[[20 Concepts/02 Geometry and Topology/拓扑流形|拓扑流形]]"
sources: []
---

# Hausdorff 条件

> [!summary] 一句话理解
> Hausdorff 条件要求不同点能被不相交的开邻域分开；它保证空间中的点不会“黏”得太病态。

## 1. 正式定义

若一个拓扑空间 $X$ 满足下面条件，则称 $X$ 是 **Hausdorff 空间**：

对任意两个不同点 $p,q\in X$，都存在开集 $U,V\subseteq X$，使得

$$
p\in U,\qquad q\in V,\qquad U\cap V=\varnothing.
$$

这个性质称为 **Hausdorff 条件**，也称为 **$T_2$ 分离公理**。

直观地说，Hausdorff 条件要求两个不同点可以被各自的、互不重叠的开邻域分开。

## 2. 为什么这很自然？

在 $\mathbb R^n$ 中，任意两个不同点都可以用两个足够小的开球分开。所以普通欧氏空间自动满足 Hausdorff 条件。

拓扑学中允许更抽象的空间。如果不额外要求 Hausdorff，就可能出现两个不同点无法用开集分开的情况。

## 3. 一个最小反例

设

$$
X=\{a,b\},
$$

并给它指定最粗的拓扑：

$$
\tau=\{\varnothing,X\}.
$$

这确实是一个拓扑空间，因为 $\varnothing$ 和 $X$ 都在里面，而且并集、有限交集也不会跑出这两个集合。

但是这个空间不是 Hausdorff 空间。

原因是：如果想把 $a$ 和 $b$ 分开，就需要找到两个互不相交的开集 $U,V$，使得

$$
a\in U,\qquad b\in V.
$$

可是这个拓扑里，唯一包含 $a$ 的非空开集是 $X$，唯一包含 $b$ 的非空开集也是 $X$。于是只能取

$$
U=X,\qquad V=X,
$$

但

$$
U\cap V=X\ne\varnothing.
$$

所以 $a$ 和 $b$ 无法被不相交开集分开。

这个例子说明：拓扑空间可以很粗，粗到不同点在拓扑上几乎无法区分。Hausdorff 条件就是用来排除这种情况的。

## 4. 对流形有什么用？

拓扑流形要求 Hausdorff，是为了排除一些局部看起来正常、整体却不正常的空间。

这个条件保证：

- 极限如果存在，通常具有唯一性；
- 点可以被局部数据清楚地区分；
- 坐标邻域之间的拼接更接近我们熟悉的几何直觉。

## 5. 几何上的典型反例

“有两个原点的直线”在每个点附近都像普通直线，但两个原点无法被不相交开邻域分开。

它提醒我们：只要求“局部像欧氏空间”还不够，还要排除这种点无法分离的病态情况。

## 导航

- 上一页：[[20 Concepts/01 Topology/子空间拓扑|子空间拓扑]]
- 下一步：[[20 Concepts/01 Topology/拓扑基与第二可数|拓扑基与第二可数]]
