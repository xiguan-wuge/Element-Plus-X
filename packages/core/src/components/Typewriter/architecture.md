下面这份内容适合直接放进项目：

- `docs/typewriter-markdown-architecture.md`
- 或：
- `RFC`
- `ADR（Architecture Decision Record）`

作为后续维护依据。

---

# Typewriter Markdown 渲染架构分析与优化方案

## 背景

当前 `Typewriter.vue` 组件支持：

- 打字机效果
- Markdown 渲染
- Markdown 插件扩展
- DOMPurify 安全过滤

当前核心实现：

```txt id="jlwm5n"
content
→ typingIndex 截断
→ markdown-it render
→ DOMPurify sanitize
→ v-html 渲染
```

即：

```vue id="2r7juh"
<div v-html="renderedContent" />
```

---

# 当前实现存在的问题

## 1. Markdown 全量重复渲染

当前：

```ts id="yvfylx"
const renderedContent = computed(() => {
  return md.render(processedContent.value);
});
```

由于：

```txt id="7h8v5s"
typingIndex
```

会持续变化：

```txt id="c1o8uq"
每次打字
=
重新 render 全量 markdown
```

即：

```txt id="brtx09"
2000 token
≈ 2000 次 markdown render
```

---

## 2. v-html 导致 DOM 全量重建

Vue 对：

```vue id="4zhq6g"
v-html
```

无法做细粒度 diff。

每次更新都会：

```js id="2av7x9"
element.innerHTML = newHtml;
```

导致：

```txt id="1ux3eh"
整个 DOM subtree 销毁重建
```

包括：

- code block
- syntax highlight
- katex
- 图片
- 链接
- hover 状态
- selection

都会重新创建。

---

## 3. DOMPurify 重复执行

当前：

```ts id="3hfjy3"
DOMPurify.sanitize(rawHtml);
```

属于：

```txt id="7spz2z"
全文 sanitize
```

在流式输出场景下成本较高。

---

## 4. Markdown 插件重复执行

当前支持：

```ts id="9my4pk"
mdPlugins;
```

未来可能接入：

- prism
- shiki
- katex
- mermaid
- flowchart
- diagram

这些插件本身渲染成本较高。

当前实现会导致：

```txt id="m2fzz7"
每个 typing 更新
=
所有插件重新执行
```

性能不可控。

---

## 5. Typewriter 职责膨胀

当前 Typewriter 同时承担：

- typing
- markdown render
- html sanitize
- plugin runtime

职责过多。

这会导致：

```txt id="2z0m1m"
组件长期维护复杂度持续上升
```

---

# 问题根因分析

核心问题并不是：

```txt id="dh2ud4"
markdown-it 性能差
```

而是：

```txt id="n4j5mc"
v-html 失去了 Vue 的 patch 能力
```

导致：

```txt id="ab5oc5"
每次更新都重建 DOM
```

这是当前性能瓶颈的根本原因。

---

# 优化方向分析

## 方案一：继续优化全文 render（不推荐）

例如：

- debounce
- throttle
- requestAnimationFrame

### 优点

实现简单。

### 缺点

本质仍然：

```txt id="x0j1b2"
全文 markdown
+
全文 innerHTML
```

无法解决根因。

### 结论

仅适合作为临时优化。

不适合作为长期架构。

---

# 方案二：AST + VNode Renderer（未来方向）

即：

```txt id="c7g7t5"
markdown AST
→ Vue vnode
→ patch
```

不再依赖：

```txt id="y9ujmt"
v-html
```

### 优点

- 性能最佳
- 真正 diff
- 真正增量更新
- 适合 AI IDE
- 可扩展性极强

### 缺点

实现复杂度极高。

需要维护：

- incremental parser
- vnode renderer
- plugin vnode compatibility
- SSR hydration
- selection sync

### 结论

适合作为：

```txt id="rhlp4f"
长期未来演进方向
```

但不适合作为当前组件库阶段方案。

---

# 方案三：Block 增量渲染（推荐方案）

## 核心思想

不要：

```txt id="p0mbl4"
全文 markdown render
```

而是：

```txt id="h80u84"
按 block render
```

例如：

```txt id="76i3h1"
stableBlocks[]
+
typingBlock
```

---

# 架构示意

## 当前架构

```txt id="2s91pn"
content
→ markdown render(fullText)
→ v-html
```

---

## 优化后架构

```txt id="t9e2b5"
content
→ splitBlocks()
→ stableBlocks
→ typingBlock
→ render(lastBlockOnly)
```

---

# 优化后效果

## 历史 block

```txt id="n8c8jl"
不再重新 render
```

---

## typing 中 block

仅：

```txt id="4dhk2h"
最后一个 block
```

会实时更新。

---

# 性能收益

复杂度从：

```txt id="5e3lgn"
O(n²)
```

下降为：

```txt id="mf5xt9"
近似 O(1)
```

对于：

- AI streaming
- 大 markdown
- code block

场景提升明显。

---

# 为什么推荐该方案

## 1. 保留 markdown-it 生态

无需推翻：

```txt id="o1w0lt"
mdPlugins
```

体系。

兼容性最好。

---

## 2. 保留现有 API

对外：

```txt id="gl3f0u"
基本无 breaking change
```

适合组件库。

---

## 3. 保留打字机效果

用户体验不会改变。

---

## 4. 可渐进升级

后续可继续演进：

- render cache
- block parser
- vnode renderer

不会推翻当前架构。

---

# 推荐改造方案

# 一、拆分 block

新增：

```ts id="8d8ckn"
stableBlocks: Block[]
typingBlock: string
```

---

# 二、仅更新最后 block

历史 block：

```txt id="v4pnca"
render 一次后永久缓存
```

---

# 三、增加 render cache

推荐：

```ts id="4wqlg6"
Map<string, string>;
```

缓存：

```txt id="nnj6pj"
markdown → html
```

避免重复 render。

---

# 四、避免重复注册 markdown plugin

当前：

```ts id="s4u0xq"
md.use(plugin);
```

会在每个组件实例执行。

需要增加：

```ts id="cq4y0m"
WeakSet;
```

防止重复 use。

---

# 五、长期职责拆分（推荐）

未来建议拆分：

## Typewriter

仅负责：

```txt id="jlwmz2"
typing / streaming
```

---

## MarkdownRenderer

仅负责：

```txt id="5u5qjx"
markdown render
```

---

# 推荐最终组合方式

```vue id="3wcfth"
<Typewriter v-slot="{ text }">
  <MarkdownRenderer :content="text" />
</Typewriter>
```

---

# 这样做的好处

## 职责更清晰

Typewriter 不再关心：

- markdown
- html
- sanitize
- plugins

---

## MarkdownRenderer 可独立演进

后续：

- shiki
- mermaid
- katex
- virtual-scroll

都可独立升级。

---

## SSR 更稳定

减少：

```txt id="y0pn1z"
hydration mismatch
```

风险。

---

# 推荐实施阶段

# 第一阶段（当前推荐）

## 实施：

- block 增量 render
- render cache
- plugin 防重复注册

### 成本

低。

### 收益

极高。

---

# 第二阶段

拆分：

```txt id="2m3y0t"
Typewriter
+
MarkdownRenderer
```

---

# 第三阶段（未来）

如需：

- AI IDE
- 富文本编辑器
- 超长文档

再考虑：

```txt id="m8nvbm"
AST vnode renderer
```

---

# 最终结论

当前问题本质不是：

```txt id="8s3od8"
markdown-it render 太慢
```

而是：

```txt id="0zqk0k"
全文 innerHTML 重建
```

因此长期正确方向不是：

```txt id="0n5g9f"
继续优化全文 render
```

而是：

```txt id="wzjlwm"
减少 render 范围
+
职责拆分
+
增量渲染
```

这是组件库长期维护最合理的演进路线。
