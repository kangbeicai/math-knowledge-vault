---
type: concept
up: "[[10 Maps/微积分与分析 MOC|微积分与分析 MOC]]"
track:
order:
prev: ""
next: ""
area: calculus
status: 可复述
created: 2026-06-17
updated: 2026-08-11
tags:
  - concept
aliases: []
prerequisites:
  - "[[20 Concepts/00 Foundations/映射、复合与原像|映射、复合与原像]]"
  - "[[20 Concepts/00 Foundations/导数、偏导数与方向导数|导数、偏导数与方向导数]]"
related:
  - "[[20 Concepts/02 Geometry and Topology/推前与拉回|推前与拉回]]"
sources:
  - "[[70 Sources/Pkmer-Math 项目|Pkmer-Math 项目]]"
---

# 多元链式法则与 Jacobian

> [!summary] 一句话理解
> 链式法则说明复合映射的一阶变化等于各层一阶变化按执行顺序复合；选定坐标后，它表现为 Jacobian 矩阵相乘。

## 1. 先看映射顺序

设

$$
F:\mathbb R^n\to\mathbb R^m,\qquad
G:\mathbb R^m\to\mathbb R^k.
$$

因为 $F$ 的输出属于 $\mathbb R^m$，正好可以作为 $G$ 的输入，所以复合映射

$$
G\circ F:\mathbb R^n\to\mathbb R^k
$$

是有定义的，并且

$$
(G\circ F)(x)=G(F(x)).
$$

## 2. 链式法则

若 $F$ 在 $x$ 处可微，$G$ 在 $F(x)$ 处可微，则

$$
D(G\circ F)_x
=
DG_{F(x)}\circ DF_x.
$$

这个公式从右向左读：

1. 输入增量 $h\in\mathbb R^n$ 先经过 $DF_x$，得到 $F$ 的一阶输出变化；
2. 这个变化再经过 $DG_{F(x)}$，得到最终输出的一阶变化。

因此

$$
D(G\circ F)_x(h)
=
DG_{F(x)}\bigl(DF_x(h)\bigr).
$$

## 3. 为什么下标是 $F(x)$？

$G$ 不是在原来的输入点 $x$ 附近工作，而是在中间结果 $y=F(x)$ 附近工作，所以必须使用 $G$ 在 $F(x)$ 处的导数

$$
DG_{F(x)}.
$$

## 4. Jacobian 矩阵形式

选定标准坐标后，$DF_x$ 和 $DG_{F(x)}$ 分别由 Jacobian 矩阵表示。链式法则成为

$$
J_{G\circ F}(x)
=
J_G(F(x))J_F(x).
$$

矩阵乘法顺序不能颠倒，因为它反映映射的执行顺序：先 $F$，后 $G$。

## 5. 最小例子

取

$$
F:\mathbb R\to\mathbb R^2,
\qquad
F(t)=(t,t^2),
$$

$$
G:\mathbb R^2\to\mathbb R,
\qquad
G(x,y)=x+y.
$$

复合后

$$
(G\circ F)(t)=t+t^2,
$$

直接求导得到

$$
(G\circ F)'(t)=1+2t.
$$

另一方面，

$$
J_F(t)=
\begin{pmatrix}
1\\2t
\end{pmatrix},
\qquad
J_G(x,y)=
\begin{pmatrix}
1&1
\end{pmatrix}.
$$

所以

$$
J_G(F(t))J_F(t)
=
\begin{pmatrix}1&1\end{pmatrix}
\begin{pmatrix}1\\2t\end{pmatrix}
=1+2t.
$$

结果与直接求导一致。

## 6. 对象与表示

| 对象 | 坐标表示 |
|---|---|
| 总导数 $DF_x$ | Jacobian 矩阵 $J_F(x)$ |
| 线性映射复合 | 矩阵乘法 |

链式法则首先是线性映射之间的等式，矩阵公式是选定坐标后的表示。

## 在流形中的作用

流形上使用多张坐标图。同一个几何对象换坐标时，需要连续复合坐标图、逆坐标图和原映射，因此坐标转换、切映射和分量变换都依赖链式法则。

例如坐标表达

$$
\psi\circ F\circ\varphi^{-1}
$$

的导数会逐层分解为三个导数的复合。

## 常见误解

> [!warning]
> $DG_{F(x)}$ 的下标不是 $x$，因为 $G$ 的输入空间是 $\mathbb R^m$，它实际接收到的是 $F(x)$。

> [!warning]
> Jacobian 不是总导数本身，而是总导数在所选坐标中的矩阵表示。

## 掌握检验

- [ ] 能判断两个映射能否复合
- [ ] 能逐项解释 $DG_{F(x)}\circ DF_x$
- [ ] 能写出 Jacobian 形式的链式法则
- [ ] 能解释矩阵乘法顺序为什么不能颠倒

> [!example]- 参考答案
> 输入增量先经过 $DF_x$，再经过 $DG_{F(x)}$，因此导数的复合顺序与映射执行顺序一致。
>
> $G$ 的输入点是 $F(x)$，所以要在 $F(x)$ 处对 $G$ 求导。

## 下一步

- [[20 Concepts/02 Geometry and Topology/坐标图、图册与坐标转换|坐标图、图册与坐标转换]]
- [[20 Concepts/02 Geometry and Topology/推前与拉回|推前与拉回]]
