export const demoAll: string = `
# AI Streaming Markdown Performance Test

这是一个用于测试 Typewriter + Markdown Streaming 渲染性能的长文本。

---

## 一、普通段落测试

Vue 是一套用于构建用户界面的渐进式 JavaScript 框架。  
它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式、组件化的编程模型。

Vue 的核心特性包括：

- 响应式系统
- 组件化架构
- 虚拟 DOM
- Composition API
- 单文件组件
- TypeScript 支持

在 AI Chat 场景中，Vue 通常用于：

1. Chat Bubble
2. Markdown Renderer
3. Streaming Renderer
4. Virtual Scroll
5. Typing Animation

---

## 二、超长段落测试

在大型 AI 对话场景中，Markdown Streaming 渲染是一个非常复杂的问题。因为 Markdown 本身并不是一种天然适合“逐 token 增量解析”的语言。例如，一个 code block 在闭合之前，其 AST 结构实际上是不稳定的。很多 parser 都需要重新回溯整个文档结构才能得到最终正确的 HTML 结果。

这意味着，如果在每一次 token 更新时都重新执行 markdown-it.render(fullText)，那么会导致：

1. 全量 AST 重建
2. 全量 HTML 重建
3. innerHTML 全量替换
4. syntax highlight 重跑
5. KaTeX 重渲染
6. DOM subtree 销毁重建
7. layout/reflow/repaint 激增

因此现代 AI UI 通常会采用 block 增量渲染方案，而不是全文重渲染方案。

---

## 三、代码块测试



---

## 四、超长代码块测试



---

## 五、表格测试

| Feature | Full Render | Block Render |
|---|---|---|
| DOM 重建 | 高 | 低 |
| markdown render | 全文 | 增量 |
| syntax highlight | 重复 | 缓存 |
| typing 流畅度 | 差 | 好 |
| AI streaming | 卡顿 | 流畅 |
| 长文本性能 | 差 | 优秀 |

---

## 六、引用测试

> Markdown Streaming 本身并不是一个天然适合逐字符解析的场景。
>
> 真正成熟的 AI UI 通常会采用：
>
> - block finalize
> - incremental render
> - render cache
> - vnode patch
>
> 而不是全文 innerHTML 更新。

---

## 七、嵌套列表测试

1. 第一层
   1. 第二层
      1. 第三层
         1. 第四层
            - item A
            - item B
            - item C
               - nested item
               - nested item
               - nested item

---

## 八、LaTeX 测试

行内公式：

$E = mc^2$

块级公式：

$$
\frac{
  \partial u
}{
  \partial t
}
=
\alpha
\nabla^2 u
$$

---

## 九、HTML 测试

<div style="padding: 12px; border: 1px solid #ddd; border-radius: 8px;">
  <strong>HTML Content Test</strong>
  <p>用于测试 DOMPurify sanitize 性能。</p>
</div>

---

## 十、Mermaid 测试



---

## 十一、超长重复内容测试

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit。

---

## 十二、结束测试

如果：

- code highlight 不闪烁
- CPU 明显下降
- FPS 更稳定
- 滚动不卡顿
- DOM 节点不反复重建

则说明：


优化已经生效。
`;
