---
type: concept
up: "[[10 Maps/流形与微分几何 MOC|流形与微分几何 MOC]]"
track: manifold-core
order: 150
prev: "[[20 Concepts/02 Geometry and Topology/向量场的流|向量场的流]]"
next: "[[20 Concepts/02 Geometry and Topology/余切空间|余切空间]]"
area: differential-geometry
status: 初见
created: 2026-06-17
updated: 2026-08-13
tags:
  - concept
  - lie-bracket
aliases:
  - Lie bracket
prerequisites:
  - "[[向量场]]"
related:
  - "[[向量场的流]]"
  - "[[为什么Lie括号不能只由单点向量决定]]"
sources: []
---

# Lie括号

> [!summary] 一句话理解
> Lie 括号衡量两个向量场生成的无穷小运动是否可交换；它本质上记录“沿 $X$ 移动后 $Y$ 如何变化”与“沿 $Y$ 移动后 $X$ 如何变化”之间的差。

## 先从运动直觉理解

向量场不是一个固定向量，而是在流形每一点给出一个随位置变化的瞬时速度。

因此，对两个向量场 $X,Y$，下面两种操作一般不会得到完全相同的结果：

1. 先沿 $X$ 的流走一小段，再沿 $Y$ 的流走一小段；
2. 先沿 $Y$ 的流走一小段，再沿 $X$ 的流走一小段。

原因是：沿第一个向量场移动以后，所在位置发生了变化，于是第二个向量场本身也可能发生变化。

Lie 括号就是描述这种“顺序依赖”的无穷小量。

在欧氏坐标中，可以先记住非常直观的形式

$$
[X,Y]
=
DY\,X-DX\,Y,
$$

其中 $DX,DY$ 是两个向量场的 Jacobian。

因此：

$$
\boxed{
[X,Y]
=
\text{沿 }X\text{ 方向观察 }Y\text{ 的变化}
-
\text{沿 }Y\text{ 方向观察 }X\text{ 的变化}
}
$$

## 定义

把向量场视为对光滑函数的导子，定义

$$
[X,Y][f]=X(Y[f])-Y(X[f]).
$$

也可以简写为

$$
[X,Y]=X\circ Y-Y\circ X.
$$

这里的乘法不是向量乘法，而是两个微分算子的复合。

若 $f\in C^\infty(M)$，则

$$
Y[f]
$$

表示沿 $Y$ 方向观察 $f$ 的变化率，而

$$
X(Y[f])
$$

表示沿 $X$ 移动时，“沿 $Y$ 的方向导数”如何变化。

因此

$$
X(Y[f])-Y(X[f])
$$

正是在比较两个微分方向交换顺序后的差异。

## 为什么 $[X,Y]$ 仍然是向量场？

表面上，$X(Y[f])$ 和 $Y(X[f])$ 都包含 $f$ 的二阶导数，但相减以后二阶项会消失，只剩下一阶导数。

设

$$
X=X^j\partial_j,
\qquad
Y=Y^i\partial_i.
$$

则

$$
X(Y[f])
=
X^j\partial_j\left(Y^i\partial_i f\right)
$$

展开为

$$
X(Y[f])
=
X^j(\partial_jY^i)\partial_i f
+
X^jY^i\partial_j\partial_i f.
$$

类似地，

$$
Y(X[f])
=
Y^j(\partial_jX^i)\partial_i f
+
Y^jX^i\partial_j\partial_i f.
$$

由于光滑函数满足混合偏导可交换，

$$
\partial_i\partial_jf
=
\partial_j\partial_if,
$$

所以两个二阶项抵消，最终只剩一阶导数。

这说明 $[X,Y]$ 仍然是一个导子，因此仍然对应一个向量场。

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

在 $M\subset\mathbb R^n$ 中，把向量场写成列向量后，这就是

$$
[X,Y]=DY\,X-DX\,Y.
$$

这里

$$
DY\,X
$$

是 $Y$ 沿 $X$ 方向的方向导数，而

$$
DX\,Y
$$

是 $X$ 沿 $Y$ 方向的方向导数。

> [!tip] 记忆方式
> 不要先背指标公式。先记
> $$
> [X,Y]=\text{$X$ 让 $Y$ 怎么变}-\text{$Y$ 让 $X$ 怎么变}.
> $$

## 例子：一个非零 Lie 括号

在 $\mathbb R^2$ 中取

$$
X=\partial_x,
\qquad
Y=x\partial_y.
$$

即

$$
X=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
Y=
\begin{pmatrix}
0\\
x
\end{pmatrix}.
$$

$X$ 是处处向右的常向量场，而 $Y$ 的竖直速度随 $x$ 改变。

有

$$
DX=0,
\qquad
DY=
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}.
$$

因此

$$
[X,Y]
=
DY\,X-DX\,Y
=
\begin{pmatrix}
0\\
1
\end{pmatrix}
=
\partial_y.
$$

这个结果可以直接从运动顺序理解。

从 $(x,y)$ 出发，每次走很短时间 $\varepsilon$。

先沿 $X$ 再沿 $Y$：

$$
(x,y)
\xrightarrow{X}
(x+\varepsilon,y)
\xrightarrow{Y}
(x+\varepsilon,
y+\varepsilon x+\varepsilon^2).
$$

先沿 $Y$ 再沿 $X$：

$$
(x,y)
\xrightarrow{Y}
(x,y+\varepsilon x)
\xrightarrow{X}
(x+\varepsilon,y+\varepsilon x).
$$

两个终点相差

$$
\varepsilon^2\partial_y.
$$

这正对应

$$
[X,Y]=\partial_y.
$$

关键不是 $X$ 和 $Y$ 两个箭头“方向不同”，而是：沿 $X$ 向右移动以后，$Y=x\partial_y$ 的大小发生了变化。

## 为什么差异是二阶量？

沿 $X$ 走时间 $\varepsilon$，位置变化是 $O(\varepsilon)$。

由于 $Y$ 随位置光滑变化，因此 $Y$ 本身的变化也是 $O(\varepsilon)$。

第二段运动又持续 $O(\varepsilon)$ 的时间，所以由顺序造成的额外位移是

$$
O(\varepsilon)\times O(\varepsilon)
=
O(\varepsilon^2).
$$

因此 Lie 括号描述的是两个小流之间的二阶不交换效应，而不是一阶位移。

## 基本性质

$$
[X,Y]=-[Y,X],
$$

特别地，

$$
[X,X]=0.
$$

对常数 $a,b\in\mathbb R$，Lie 括号满足双线性：

$$
[aX+bY,Z]
=
a[X,Z]+b[Y,Z].
$$

$$
[X,[Y,Z]]+[Y,[Z,X]]+[Z,[X,Y]]=0.
$$

第二式是 Jacobi 恒等式。

Jacobi 恒等式是 Lie 代数结构的核心公理。第一次学习时不必强求几何图像，可以先把它理解为：三个无穷小生成元之间的交换关系必须彼此兼容。

## 几何意义

设 $\Phi_t^X,\Phi_t^Y$ 分别是 $X,Y$ 的局部流。

依次沿

$$
X,\quad Y,\quad -X,\quad -Y
$$

各走很短时间 $\varepsilon$，一阶位移会互相抵消，但一般不会精确回到起点。

剩余偏移的主导项是二阶量，其方向由 $[X,Y]$ 控制：

$$
p
\longmapsto
p+\varepsilon^2[X,Y](p)+O(\varepsilon^3),
$$

具体正负号取决于四段流的复合顺序约定。

![[99 Assets/Images/Manifolds/lie-bracket-flow-commutator.svg|720]]

图中两条路径从同一点出发，只是交换了沿 $X$ 与 $Y$ 小流前进的顺序。终点之间的微小差异说明 Lie 括号衡量的是向量场在邻域中的变化，而不是两个逐点向量的普通相减。

因此

$$
[X,Y]=0
$$

意味着两个局部流在无穷小层面可交换。

在适当的局部存在条件下，若

$$
[X,Y]=0,
$$

则两个流局部可交换：

$$
\Phi_t^X\circ\Phi_s^Y
=
\Phi_s^Y\circ\Phi_t^X.
$$

最简单的例子是

$$
X=\partial_x,
\qquad
Y=\partial_y,
$$

因为两个向量场都不随位置变化，所以

$$
[\partial_x,\partial_y]=0.
$$

先向右再向上，与先向上再向右完全相同。

## 为什么不是逐点向量的运算？

Lie 括号依赖 $X,Y$ 在点附近的变化率，不能只用 $X(p),Y(p)$ 两个向量决定。

一个直接的例子是，在 $p=(0,0)$ 取

$$
X=\partial_x,
$$

并比较

$$
Y_1=0,
\qquad
Y_2=x\partial_y.
$$

在点 $p$ 上，

$$
Y_1(p)=Y_2(p)=0,
$$

但

$$
[X,Y_1](p)=0,
\qquad
[X,Y_2](p)=\partial_y.
$$

因此，知道单点上的 $X(p),Y(p)$ 不足以决定 $[X,Y](p)$；还必须知道向量场在邻域中的一阶变化。

更结构化地说，对光滑函数 $f$，

$$
[X,fY]
=
f[X,Y]+X(f)Y,
$$

以及

$$
[fX,Y]
=
f[X,Y]-Y(f)X.
$$

额外出现的 $X(f)$、$Y(f)$ 项说明 Lie 括号虽然对实数常数是双线性的，却不是对光滑函数环 $C^\infty(M)$ 的双线性运算。

这正是它不能由单点切向量独立决定的代数表现。

> [!warning] 常见误区：Lie 括号不是叉积
> $[X,Y]$ 并不测量两个向量的夹角，也不要求三维空间。
>
> 例如 $\partial_x$ 与 $\partial_y$ 互相垂直，但
> $$
> [\partial_x,\partial_y]=0.
> $$
>
> Lie 括号关心的是“向量场随位置如何变化”，而不是某一点两个箭头之间的欧氏几何关系。

## 与矩阵交换子的类比

矩阵中常定义交换子

$$
[A,B]=AB-BA.
$$

它衡量两个线性变换是否可交换。

向量场作为微分算子时，同样有

$$
[X,Y]=X\circ Y-Y\circ X.
$$

因此 Lie 括号可以看成“向量场微分算子的交换子”。

这个观点解释了为什么反对称性和 Jacobi 恒等式会自然出现，也为后续李代数做准备。

## 为什么它在几何中重要？

Lie 括号不仅判断两个已有方向是否可交换，还能揭示“通过组合已有运动能否产生新的无穷小方向”。

例如上面的

$$
X=\partial_x,
\qquad
Y=x\partial_y
$$

产生了新的方向

$$
[X,Y]=\partial_y.
$$

这种现象在两个重要主题中会继续出现：

1. **Frobenius 定理**：对光滑常秩分布，可积性等价于对 Lie 括号封闭，即分布中的向量场做 Lie 括号后仍留在该分布中；
2. **控制理论**：系统虽然不能直接沿某个方向运动，但可能通过多个允许方向的交换子运动产生该方向。

在李群中，左不变向量场的 Lie 括号进一步给出李代数结构。

## 建议掌握的三个等价视角

第一次学习时，可以把 Lie 括号压缩成下面三种彼此对应的理解：

### 1. 导子视角

$$
[X,Y]f
=
X(Yf)-Y(Xf).
$$

比较两个方向微分交换顺序后的差异。

### 2. 坐标视角

$$
[X,Y]
=
DY\,X-DX\,Y.
$$

比较“$X$ 使 $Y$ 如何变化”和“$Y$ 使 $X$ 如何变化”。

### 3. 流的视角

交换两个微小流的顺序会产生一个 $O(\varepsilon^2)$ 的终点差异，其主导方向由 $[X,Y]$ 控制。

如果这三个视角能够互相转换，就已经抓住 Lie 括号的核心。

## 后续

- 可积分布与 Frobenius 定理
- 李群与李代数

## 导航

- 上一页：[[20 Concepts/02 Geometry and Topology/向量场的流|向量场的流]]
- 下一步：[[20 Concepts/02 Geometry and Topology/余切空间|余切空间]]

