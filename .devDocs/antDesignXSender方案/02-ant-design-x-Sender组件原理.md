# ant-design-x Sender 组件原理

> 基于官方仓库源码调研（main 分支，版本 2.x）。结论：**Sender 没有废弃 textarea，而是「textarea 与 contenteditable 双模式并存」**。

## 1. 基本信息

- `@ant-design/x` 是 **React** 组件库（蚂蚁官方，基于 antd，React 18+），不是 Vue。Vue 生态只有社区移植版 `ant-design-x-vue`（不包含词槽模式）。
- 源码位置：`packages/x/components/sender/`
- 本地仓库路径：`/Users/xiguanwuge/codespace/AI/x/packages/x/components/sender/`（对代码不明确时可直接查看本地源码，如 `components/Skill.tsx`）

## 2. 双模式架构

`Sender.tsx` 中根据 props 做条件渲染：

```tsx
const isSlotMode = Array.isArray(slotConfig) || skill?.value;

// 渲染：
{isSlotMode ? <SlotTextArea ref={...} /> : <TextArea ref={...} />}
```

|          | 默认模式                                                | 词槽模式（Slot Mode）                        |
| -------- | ------------------------------------------------------- | -------------------------------------------- |
| 触发条件 | 默认                                                    | 传入 `slotConfig` 数组或 `skill`             |
| 底层元素 | antd `Input.TextArea`（rc-textarea，原生 `<textarea>`） | 自研 `SlotTextArea`（`contenteditable` div） |
| 产物数据 | 纯文本字符串                                            | 纯文本字符串 + `slotConfig[]` + `skill`      |
| 依赖     | 无自研编辑逻辑                                          | 无第三方编辑器框架，直接 DOM / Range 操作    |

默认模式证据（`TextArea.tsx`）：默认组件就是 `Input.TextArea`，源码中直接访问 `resizableTextArea.textArea` 拿到真实 `<textarea>` DOM；语音输入走浏览器 Web Speech API（`SpeechRecognition`，需 HTTPS/localhost），与输入机制无关。

为什么词槽模式必须 contenteditable：**原生 textarea 只能包含纯文本**，无法内嵌「芯片」样式的结构化内联块（词槽 pill、@技能标签）。

## 3. SlotTextArea 实现原理

它**不是** ProseMirror/Tiptap 那种 Model-View 分离的富文本框架，而是「第一代轻量方案：contenteditable + 原子块 + 直接 DOM 操作」：

### 3.1 编辑区结构

- 一个 `contenteditable` div，普通文字就是文本节点。
- 词槽 / 技能 pill 是真实 DOM 元素，标记 `contenteditable="false"`，对光标而言是一个不可拆分的「原子字符」。
- 空内容时会把技能区切回 `contenteditable="true"` 以显示 placeholder（PR #1537 又加了 `&& placeholder` 条件，避免光标高度突变）。

### 3.2 插入与光标

直接用浏览器 Selection / Range API 操作 DOM 节点（`insertSkill`、insert at cursor/first/last 等 ref 方法），不使用已废弃的 `execCommand`。

### 3.3 取值（核心：getEditorValue）

遍历编辑区的 `childNodes`：

```ts
const getEditorValue = () => {
  const editableDom = editableRef.current;
  // ...
  const childNodes = editableDom.childNodes;
  const result = new Array(childNodes.length);
  const currentSlotConfig = [];

  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];
    const textValue = getNodeTextValue(node);
    result[resultIndex++] = textValue;

    if (node.nodeType === Node.TEXT_NODE) {
      // 文本节点 → 拼接纯文本
      if (textValue) currentSlotConfig.push({ type: 'text', value: textValue });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // 元素节点 → 按 slotKey 从 slotConfigMap 反查结构化配置
      const { skillKey, slotKey } = getNodeInfo(el);
      if (slotKey && nodeType !== 'nbsp') {
        const nodeConfig = slotConfigMap.get(slotKey);
        if (nodeConfig)
          currentSlotConfig.push({ ...nodeConfig, value: textValue });
      }
    }
  }
  return {
    value: result.join(''), // 纯文本
    slotConfig: currentSlotConfig, // 结构化数组
    skill: currentSkillConfig
  };
};
```

因此对外 API 的产物**不是 HTML**：

```ts
onSubmit: (message: string, slotConfig: SlotConfigType[], skill: SkillType) => void
onChange: (value: string, event, slotConfig: SlotConfigType[], skill: SkillType) => void
```

「纯文本 + 结构化槽位」正好对接大模型的槽位填充 / function calling 场景。

### 3.4 手动补齐的浏览器行为

以下行为全部自行实现（这是裸 contenteditable 方案的主要成本）：

- 退格（Backspace）上下文感知删除：判断当前选区位置决定「删词槽整体」还是「删一个字符」
- 剪切（cut）复用退格逻辑（PR #1537）
- 粘贴处理、IME 组合输入、focus / 光标定位到指定词槽

## 4. 已知缺陷（方案风险的直接佐证）

| Issue/PR                                                   | 问题                                                                                                                                                                                            | 教训                                                                                           |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Issue #1623](https://github.com/ant-design/x/issues/1623) | `slotConfig` 受控时**无限更新**：useEffect 依赖 slotConfig → triggerValueChange → getEditorValue 生成**新引用**的 slotConfig → 外部 onChange setState → 组件重渲染 → useEffect 再触发，循环不止 | 受控回显必须「先深比较再重建 DOM」，值未变化时绝不重新渲染                                     |
| [PR #1537](https://github.com/ant-design/x/pull/1537)      | 词槽**剪切/退格误删**、无 placeholder 时光标大小突变                                                                                                                                            | 原子块的键盘行为需要按「光标相对原子块的位置」分支处理；placeholder 要用伪元素而非真实占位节点 |
| Issue #1514                                                | 语音按钮在非 HTTPS 环境不可用                                                                                                                                                                   | 与输入机制无关，但说明该组件对浏览器原生 API 依赖较重，需降级策略                              |

## 5. 评价

- **优点**：轻量（不引入编辑器框架）、产物结构化（纯文本 + 槽位）、textarea 兜底保证普通场景稳定。
- **代价**：裸 contenteditable 的坑全要自己填——无限更新、误删、光标跳动、IME、粘贴清洗；且因为 React 直接渲染了受控内容与 DOM 操作竞争，才出现 #1623 这类问题。
- 对 Vue 迁移的启示：**Vue 的响应式系统比 React 更容易与 contenteditable 冲突**（v-model 回写即重渲染），必须在一开始就隔离「Vue 管理的 DOM」与「浏览器管理的 DOM」，详见 [03-Vue3迁移方案.md](./03-Vue3迁移方案.md)。
