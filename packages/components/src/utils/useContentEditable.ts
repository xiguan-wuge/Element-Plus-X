import type { Ref } from 'vue'

// 定义一个函数类型，用于操作 contenteditable 元素的方法
type ContentEditableAction = () => void

// 封装的 Hooks 函数
/**
 * 提供 contenteditable 元素的操作封装
 * @param targetRef - 需要操作的DOM元素引用
 * @returns {
 *   selectAll: 全选内容
 *   deselectAll: 取消选择
 *   moveToStart: 光标移到开头
 *   moveToEnd: 光标移到结尾
 *   focusElement: 聚焦元素
 *   blurElement: 失焦元素
 * }
 *
 * @example
 * const { selectAll, moveToEnd } = useContentEditable(contentEditableRef)
 * selectAll() // 全选可编辑区域内容
 */
export function useContentEditable(targetRef: Ref<HTMLElement | null>) {
  // 全选方法
  const selectAll: ContentEditableAction = () => {
    const element = targetRef.value
    if (element) {
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(element)
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }

  // 取消全选方法
  const deselectAll: ContentEditableAction = () => {
    const sel = window.getSelection()
    sel?.removeAllRanges()
  }

  // 定位到最开头方法
  /**
   * 将光标定位到元素起始位置
   * 适用于需要重置输入场景
   * 注意：会清空当前选区
   */
  const moveToStart: ContentEditableAction = () => {
    const element = targetRef.value
    if (element) {
      const range = document.createRange()
      const sel = window.getSelection()
      if (element.firstChild) {
        range.setStart(element.firstChild, 0)
        range.setEnd(element.firstChild, 0)
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    }
  }

  // 定位到最结尾方法
  const moveToEnd: ContentEditableAction = () => {
    const element = targetRef.value
    if (element) {
      const range = document.createRange()
      const sel = window.getSelection()
      const lastChild = element.lastChild
      const length = lastChild ? lastChild.textContent?.length || 0 : 0
      if (lastChild) {
        range.setStart(lastChild, length)
        range.setEnd(lastChild, length)
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    }
  }

  // 聚焦方法
  const focusElement: ContentEditableAction = () => {
    const element = targetRef.value
    element?.focus()
  }

  // 失焦方法，同时取消选中状态
  const blurElement: ContentEditableAction = () => {
    const element = targetRef.value
    if (element) {
      element.blur()
      const sel = window.getSelection()
      sel?.removeAllRanges()
    }
  }

  return {
    selectAll,
    deselectAll,
    moveToStart,
    moveToEnd,
    focusElement,
    blurElement,
  }
}
