# ant-design-x Sender 词槽方案（调研与迁移跟踪）

> 目标：调研 ant-design-x `Sender` 组件的词槽（Slot）实现原理，评估迁移到本库（Vue 3）的可行性，产出可落地的实施方案，并持续跟踪进度。

## 文档索引

| 文档                                                                     | 内容                                                                                                                   |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| [01-富文本实现原理.md](./01-富文本实现原理.md)                           | contenteditable 本质、现代编辑器 Model-View 分离、v-html 为何不支持 Vue 组件、嵌入组件的 4 种方案                      |
| [02-ant-design-x-Sender组件原理.md](./02-ant-design-x-Sender组件原理.md) | Sender 双模式架构（textarea / contenteditable）、SlotTextArea 源码解析、已知缺陷（issue #1623、PR #1537）              |
| [03-Vue3迁移方案.md](./03-Vue3迁移方案.md)                               | Vue 特有约束、可行方案对比（自研 contenteditable vs Tiptap）、分阶段实施计划、验收标准                                 |
| [04-Vue2适配方案评估.md](./04-Vue2适配方案评估.md)                       | 分层可用性评估（哪些可直接复用/需重做）、响应式与 Teleport 适配点、Vue 2.7 vs 2.6 差异、推荐落地路径（slot-core 抽包） |

## 一句话结论

ant-design-x Sender **没有废弃 textarea**：默认模式仍是 antd `Input.TextArea`（原生 textarea）；只有传入 `slotConfig`（词槽）或 `skill`（@技能）时才切换到自研的 `SlotTextArea`（contenteditable div + 原子块 + 直接 DOM 操作）。产物不是 HTML，而是「纯文本字符串 + 结构化 slotConfig 数组」。

Vue 3 迁移的可行性结论：**可行**。核心约束是 Vue 不能响应式管理 contenteditable 内部 DOM，需采用「Vue 管外壳 + 命令式 DOM/Range 操作 + dataset/Map 做节点与数据映射 + 遍历 childNodes 序列化」的方案，并重点规避受控回显死循环（对应 ant-design-x issue #1623）与 IME 组合输入问题。

## 进度跟踪

> 状态图例：`[x]` 已完成 ｜ `[~]` 进行中 ｜ `[ ]` 未开始

### 阶段一：调研（已完成）

- [x] 富文本实现原理梳理（contenteditable / model-view 分离 / 组件嵌入方案）
- [x] ant-design-x Sender 源码调研（Sender.tsx / TextArea.tsx / SlotTextArea.tsx）
- [x] 已知缺陷与风险收集（issue #1623 无限更新、PR #1537 退格/剪切修复）
- [x] Vue 3 迁移可行性评估与技术选型

### 阶段二：组件实现（已完成，与阶段三合并实施）

> 实际实施时跳过了独立 POC，直接在现有 `Sender` 上按 ant 双模式架构完整实现（风险由 ant 源码已验证 + 构建验证兜底）。

- [x] 在现有 `Sender` 上扩展双模式：默认 textarea（el-input）/ 词槽 contenteditable（SlotTextArea），按 `slotConfig` / `skill` props 自动切换
- [x] 类型定义 `types.d.ts`：`SlotConfigType`（text/content/input/select/tag/custom）、`SkillType`、`SenderSlotValue`、`SenderFocusOptions`、`InsertPosition`
- [x] hooks 移植：`use-cursor.ts`（Range/选区）、`use-slot-config-state.ts`（配置 Map + 响应式值）、`use-slot-builder.ts`（宿主 span 构建）
- [x] `SlotTextArea.vue`：contenteditable 编辑器 + Teleport 渲染词槽 UI（el-input / el-dropdown / custom VNode）+ childNodes 序列化
- [x] `SkillTag.vue`：@技能 芯片（tooltip / closable / 空态 placeholder）
- [x] `index.vue` 双模式接线：`submit` 返回结构化数据、`insert` / `getValue` / `focus({ cursor: 'slot', key })` 实例方法、语音输入走 `insert`
- [x] 样式 `style.scss`：词槽芯片 / content 可编辑段 / select / tag / skill（对齐 Element Plus 变量）
- [x] 防死循环：`slotConfig` 变更按签名（剔除函数后 JSON.stringify）比对重建；渲染器函数缓存防重挂载
- [x] ref 方法：`insert(slotConfig, position, replaceCharacters, preventScroll)` / `getValue()` / `focus` / `blur` / `clear`

### 阶段三：验证（进行中）

- [x] `vue-tsc -b --noEmit` 类型检查通过
- [x] `vite build` 构建通过（含 dts 生成）
- [x] Storybook 手工验证：插入/删除/序列化/回显（Chrome + Playwright 已验证：六类词槽渲染、select 选择、Enter 提交结构化数据、insert 实例方法、skill 空态）
- [x] 样式与交互缺陷修复（2026-09-06 Playwright 排查）：
  - **scoped 样式失效**：`SlotTextArea` 为多根组件（fragment），根元素不继承父组件 scope id，`.el-sender-input-slot` 规则全部未命中（字号 16px/行高 normal/overflow visible/caret 黑色/placeholder 失效）→ 改为 `:deep()` 包裹修复
  - **长文本溢出不可滚动**：`editorStyle` 内联补 `overflowY: auto`（对齐 ant-design-x `useInputHeight`，与 `:deep` 修复双保险）
  - **Backspace 绕过整体删除**：文本节点删空后光标挂在编辑器根节点（元素节点 offset>0），浏览器默认删除词槽元素导致 `slotDomMap`/`slotTeleportHosts`/`slotValues` 残留 → `handleDeleteOperation` 新增元素节点光标分支，前一个子节点为词槽/skill 时 `preventDefault` + 整体删除
  - **select 打开态无高亮**：`el-sender-slot-select-open` 类从未绑定 → 通过 `el-dropdown` `@visible-change` 维护 `openedSelectKey`
  - demo tips 文案修正：enter 模式下词槽模式为单行输入（`<br>` 会被移除，与 ant-design-x 行为一致）
- [x] 光标稳定性修复（2026-09-06 第二轮，Playwright 真实鼠标事件定位）：
  - **根因**：`index.vue` 的 `onContentMouseDown` 对内容区任意 mousedown 无条件 `focus()`（默认 `cursor: 'end'`），把光标强制拉到编辑器末尾——点击 select 触发器、点击 content 词槽内部定位光标均受影响（实测 EDITOR@6 → EDITOR@11）
  - **修复 1**（`index.vue`）：词槽模式下编辑区内部的 mousedown 不再介入，交由 SlotTextArea 处理；仅编辑区外（容器留白/操作区）点击时 preventDefault + 聚焦到末尾
  - **修复 2**（`SlotTextArea.vue` `onInternalMouseDown`）：不可编辑原子块（select/tag/custom/skill/nbsp）上的 mousedown `preventDefault`，阻止浏览器把光标移到原子块附近，保持光标原位；可聚焦/可编辑目标（content 词槽、input 词槽内嵌输入框、skill 空态占位区）不拦截
  - **修复 3**（`SlotTextArea.vue` document 级监听）：select 下拉 popper teleport 到 body，点击下拉项的默认行为会把选区移出编辑器，popper 隐藏后选区失效重建到编辑器开头（光标跳变）→ document 级拦截 popper 内 mousedown，选区/焦点全程留在编辑器
  - **修复 4**（input 词槽点击死区，2026-09-06 第三轮）：点击 input 词槽 wrapper 边距区域（padding/宿主边缘约 8px）完全无响应——`onInternalMouseDown` 的 `closest('input,...')` 只能命中 input 元素本身，wrapper 沿祖先链命中的是 editor（contenteditable=true）不放行，随后宿主 preventDefault 阻止浏览器默认聚焦（ElInput wrapper 无 mousedown 处理，聚焦完全依赖默认行为）→ 死区；且 `box-shadow: none !important` 把聚焦高亮也清除，用户感知为"无法点击编辑"。修复：判定顺序重构（先判宿主再判 focusable）+ preventDefault 后手动聚焦宿主内可见的文本类控件（排除 el-switch 内部隐藏 checkbox 等非文本/零尺寸控件），并恢复聚焦态主色描边
  - **光标出现时机规范**：光标跟随焦点；焦点仅在用户交互（点击编辑区/键盘）与两个 API（`focus()`/`insert()`）时建立；与词槽控件、弹层的交互只借用焦点——不移动光标、不丢失焦点；`insert()` 插入后聚焦到插入点之后（ant-design-x 同款契约）
- [ ] IME（中文输入法）组合输入验证
- [ ] 受控模式（v-model 回写）防死循环验证
- [ ] 剪切（cut）行为验证
- [ ] 浏览器兼容验证（Chrome / Safari / Firefox）

### 阶段四：文档（进行中）

- [x] Storybook 词槽 demo：`src/stories/Sender/SlotSenderDemo.vue`（六类词槽 + skill + 实例方法 + 结构化提交结果展示）
- [ ] `apps/docs/zh/components/sender/index.md`：补词槽模式属性 / 事件 / 方法说明
- [ ] `apps/docs/en/` 英文文档同步

### 阶段五：质量保障（未开始）

- [ ] 单元测试：序列化/反序列化、退格删除、粘贴净化
- [ ] 变更日志与 changeset

## 实现落点（文件清单）

| 文件                                                                 | 说明                                                                         |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `packages/core/src/components/Sender/types.d.ts`                     | 词槽模式全部类型（`SlotConfigType` 六类、`SkillType`、`SenderSlotValue` 等） |
| `packages/core/src/components/Sender/hooks/use-cursor.ts`            | 光标/选区/Range 命令式操作集合                                               |
| `packages/core/src/components/Sender/hooks/use-slot-config-state.ts` | 词槽配置 Map（非响应式）+ 值（reactive）状态管理                             |
| `packages/core/src/components/Sender/hooks/use-slot-builder.ts`      | 词槽宿主 span / 占位 / skill 宿主构建                                        |
| `packages/core/src/components/Sender/components/SlotTextArea.vue`    | 词槽编辑器（contenteditable + Teleport 词槽 UI）                             |
| `packages/core/src/components/Sender/components/SkillTag.vue`        | @技能 芯片                                                                   |
| `packages/core/src/components/Sender/index.vue`                      | 双模式接线（textarea ⇄ SlotTextArea）                                        |
| `packages/core/src/components/Sender/style.scss`                     | 词槽模式样式                                                                 |
| `packages/core/src/stories/Sender/SlotSenderDemo.vue`                | Storybook 词槽 demo                                                          |
| `packages/core/.build/scripts/auto-export-all-components.ts`         | 根入口类型导出登记（构建脚本自动生成 index.ts）                              |

## 关键决策记录

| 日期       | 决策                                                                                                | 理由                                                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-06 | 采用「自研轻量 contenteditable」而非引入 ProseMirror/Tiptap                                         | 词槽是内联原子块的轻量场景，引入完整编辑器框架体积与复杂度不成比例；ant-design-x 也是该路线。若后续需求膨胀（协同、多级块、可靠撤销栈）再评估 Tiptap |
| 2026-09-06 | 产物数据结构为「纯文本 + 结构化 Segment 数组」，不产出 HTML                                         | 对齐 ant-design-x（value + slotConfig），天然适配大模型槽位填充 / function calling，且规避 XSS 面                                                    |
| 2026-09-06 | ~~新组件独立实现，暂不改动现有 `Sender`~~ → **改为在现有 `Sender` 内双模式集成**（同 ant-design-x） | 与 ant 完全一致的 API 形态：默认模式不受影响（el-input textarea），仅当传入 `slotConfig` / `skill` 时切换到 SlotTextArea；对用户零迁移成本           |
| 2026-09-06 | 词槽内嵌 Vue 组件采用 `Teleport`（React 版为 `createPortal`）                                       | 动态创建的宿主 span 由命令式 DOM 管理，Teleport 让词槽 UI 保持 Vue 响应式与 Element Plus 组件生态                                                    |
| 2026-09-06 | `slotConfig` 重建以「剔除函数的 JSON 签名」判定                                                     | 规避 ant-design-x issue #1623（引用变化 → 无限重建）                                                                                                 |

## 参考资料

- ant-design-x 仓库：https://github.com/ant-design/x
  - Sender 主组件：`packages/x/components/sender/Sender.tsx`
  - 默认输入（textarea）：`packages/x/components/sender/components/TextArea.tsx`
  - 词槽输入（contenteditable）：`packages/x/components/sender/components/SlotTextArea.tsx`
  - 无限更新缺陷：issue #1623；退格/剪切修复：PR #1537
- Vue 3 命令式挂载：`h()` + `render()`（用于 chip 内嵌 Vue 组件）
- 备选框架方案：Tiptap `@tiptap/vue-3` + `VueNodeViewRenderer`（atom Node）
