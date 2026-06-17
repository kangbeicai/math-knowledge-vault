---
type: concept
up: "[[10 Maps/几何与拓扑 MOC|几何与拓扑 MOC]]"
area: topology
status: 初见
created: 2026-06-17
updated: 2026-06-17
aliases:
  - Hausdorff condition
  - T2 condition
prerequisites:
  - "[[20 Concepts/01 Topology/拓扑空间与开集|拓扑空间与开集]]"
related:
  - "[[20 Concepts/01 Topology/拓扑基与第二可数|拓扑基与第二可数]]"
  - "[[20 Concepts/02 Geometry and Topology/拓扑流形|拓扑流形]]"
tags:
  - concept
  - topology
---

# Hausdorff 条件

> [!summary] 一句话理解
> Hausdorff 条件要求不同点能被不相交的开邻域分开；它保证空间中的点不会“黏”得太病态。

## 1. 正式定义

拓扑空间 $X$ 称为 Hausdorff 空间，如果对任意两个不同点 $x,y\in X$，都存在开集 $U,V\subseteq X$，使得：

$$
x\in U,\qquad y\in V,\qquad U\cap V=\varnothing.
$$

也就是说，不同点可以被开邻域分开。

## 2. 为什么这很自然？

在 $\mathbb R^n$ 中，任意两个不同点都可以用两个足够小的开球分开。所以普通欧氏空间自动满足 Hausdorff 条件。

拓扑学中允许更抽象的空间。如果不额外要求 Hausdorff，就可能出现两个不同点无法用开集分开的情况。

## 3. 对流形有什么用？

拓扑流形要求 Hausdorff，是为了排除一些局部看起来正常、整体却不正常的空间。

这个条件保证：

- 极限如果存在，通常具有唯一性；
- 点可以被局部数据清楚地区分；
- 坐标邻域之间的拼接更接近我们熟悉的几何直觉。

## 4. 典型反例

“有两个原点的直线”在每个点附近都像普通直线，但两个原点无法被不相交开邻域分开。

它提醒我们：只要求“局部像欧氏空间”还不够，还要排除这种点无法分离的病态情况。

## 下一步

- [[20 Concepts/01 Topology/拓扑基与第二可数|拓扑基与第二可数]]
- [[20 Concepts/02 Geometry and Topology/拓扑流形|拓扑流形]]
