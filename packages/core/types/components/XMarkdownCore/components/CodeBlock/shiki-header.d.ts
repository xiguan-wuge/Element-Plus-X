import { Component, Ref, VNode } from "vue";
import { MermaidExposeProps } from "../Mermaid/types";
import {
  ElxRunCodeCloseBtnExposeProps,
  ElxRunCodeContentExposeProps,
  ElxRunCodeExposeProps,
} from "../RunCode/type";
import { RawProps } from "./types";
export interface CodeBlockExpose {
  /**
   * 代码块传入的代码原始数据属性
   */
  raw: RawProps;
  /**
   * 渲染的行
   */
  renderLines: Array<string>;
  /**
   * 当前主题色是否是暗色
   */
  isDark: Ref<boolean>;
  /**
   * 当前代码块是否展开
   */
  isExpand: Ref<boolean>;
  /**
   * 是否显示预览代码按钮
   */
  nowViewBtnShow: boolean;
  /**
   * 切换展开折叠
   * @param ev MouseEvent
   * @returns
   */
  toggleExpand: (ev: MouseEvent) => {
    isExpand: boolean;
  };
  /**
   * 切换主题
   * @returns
   */
  toggleTheme: () => boolean;
  /**
   * 复制代码
   * @param value
   */
  copyCode: (value: string | Array<string>) => void;
  /**
   * 查看代码
   * @param value
   */
  viewCode: (value: Array<string>) => void;
}
export type ComponentRenderer<T> = Component<T>;
export type ComponentFunctionRenderer<T> = (props: T) => VNode;
/**
 * @description 代码块头部渲染器
 */
export type CodeBlockHeaderRenderer = ComponentRenderer<CodeBlockExpose>;
export type CodeBlockHeaderFunctionRenderer =
  ComponentFunctionRenderer<CodeBlockExpose>;
/**
 * @description 查看代码头部渲染器
 */
export type ViewCodeHeadRender = ComponentRenderer<ElxRunCodeExposeProps>;
export type ViewCodeHeadFunctionRender =
  ComponentFunctionRenderer<ElxRunCodeExposeProps>;
/**
 * @description 查看代码头部关闭按钮渲染器
 */
export type ViewCodeCloseBtnRender =
  ComponentRenderer<ElxRunCodeCloseBtnExposeProps>;
export type ViewCodeCloseBtnFunctionRender =
  ComponentFunctionRenderer<ElxRunCodeCloseBtnExposeProps>;
/**
 * @description 查看代码内容渲染器
 */
export type ViewCodeContentRender =
  ComponentRenderer<ElxRunCodeContentExposeProps>;
export type ViewCodeContentFunctionRender =
  ComponentFunctionRenderer<ElxRunCodeContentExposeProps>;
/**
 * @description Mermaid头部插槽渲染器
 */
export type MermaidHeaderControlRender = ComponentRenderer<MermaidExposeProps>;
export type MermaidHeaderControlFunctionRender =
  ComponentFunctionRenderer<MermaidExposeProps>;
export interface CodeBlockHeaderExpose {
  /**
   * 代码块自定义头部（包括语言和复制按钮等）
   * 当有此属性时，将不会显示默认的代码头部 和 codeHeaderLanguage codeHeaderControl 插槽里面的内容
   */
  codeHeader?: CodeBlockHeaderRenderer;
  /**
   * 代码块语言插槽
   */
  codeHeaderLanguage?: CodeBlockHeaderRenderer;
  /**
   * 代码块右侧插槽
   */
  codeHeaderControl?: CodeBlockHeaderRenderer;
  /**
   * 代码块查看代码弹窗的头部插槽
   */
  viewCodeHeader?: ViewCodeHeadRender;
  /**
   * 代码块查看代码弹窗的关闭按钮插槽
   */
  viewCodeCloseBtn?: ViewCodeCloseBtnRender;
  /**
   * 代码块查看代码弹窗的代码内容插槽
   */
  viewCodeContent?: ViewCodeContentRender;
  /**
   * 代码块mermaid头部插槽
   */
  codeMermaidHeaderControl?: MermaidHeaderControlRender;
}
export interface CodeBlockHeaderFunctionExpose {
  /**
   * 代码块自定义头部（包括语言和复制按钮等）
   * 当有此属性时，将不会显示默认的代码头部 和 codeHeaderLanguage codeHeaderControl 插槽里面的内容
   */
  codeHeader?: CodeBlockHeaderFunctionRenderer;
  /**
   * 代码块语言插槽
   */
  codeHeaderLanguage?: CodeBlockHeaderFunctionRenderer;
  /**
   * 代码块右侧插槽
   */
  codeHeaderControl?: CodeBlockHeaderFunctionRenderer;
  /**
   * 代码块查看代码弹窗的头部插槽
   */
  viewCodeHeader?: ViewCodeHeadFunctionRender;
  /**
   * 代码块查看代码弹窗的关闭按钮插槽
   */
  viewCodeCloseBtn?: ViewCodeCloseBtnFunctionRender;
  /**
   * 代码块查看代码弹窗的代码内容插槽
   */
  viewCodeContent?: ViewCodeContentFunctionRender;
  /**
   * 代码块mermaid头部插槽
   */
  codeMermaidHeaderControl?: MermaidHeaderControlFunctionRender;
}
export declare const isDark: Ref<boolean, boolean>;
/**
 * @description 描述 language标签
 * @date 2025-06-25 17:48:15
 * @author tingfeng
 *
 * @export
 * @param language
 */
export declare function languageEle(language: string): VNode<
  import("vue").RendererNode,
  import("vue").RendererElement,
  {
    [key: string]: any;
  }
>;
/**
 * @description 描述 语言头部操作按钮
 * @date 2025-06-25 17:49:04
 * @author tingfeng
 *
 * @export
 * @param {() => void} copy
 */
export declare function controlEle(copy: () => void): VNode<
  import("vue").RendererNode,
  import("vue").RendererElement,
  {
    [key: string]: any;
  }
>;
/**
 * @description 描述 语言头部操作按钮(带预览代码按钮)
 * @date 2025-07-09 11:15:27
 * @author tingfeng
 * @param copy
 * @param view
 */
export declare function controlHasRunCodeEle(
  copy: () => void,
  view: () => void,
): VNode<
  import("vue").RendererNode,
  import("vue").RendererElement,
  {
    [key: string]: any;
  }
>;
/**
 * @description 描述 主题按钮
 * @date 2025-06-25 17:49:53
 * @author tingfeng
 *
 * @export
 */
export declare function toggleThemeEle(): VNode<
  import("vue").RendererNode,
  import("vue").RendererElement,
  {
    [key: string]: any;
  }
>;
/**
 * @description 描述 展开代码
 * @date 2025-07-01 11:33:32
 * @author tingfeng
 *
 * @export
 * @param elem
 */
export declare function expand(elem: HTMLElement): void;
/**
 * @description 描述 折叠代码
 * @date 2025-07-01 11:33:49
 * @author tingfeng
 *
 * @export
 * @param elem
 */
export declare function collapse(elem: HTMLElement): void;
/**
 * @description 描述 将源代码行数转换可复制的string
 * @date 2025-06-25 17:50:42
 * @author tingfeng
 *
 * @export
 * @param lines
 */
export declare function extractCodeFromHtmlLines(lines: string[]): string;
/**
 * @description 描述 切换展开状态
 * @date 2025-06-26 21:29:50
 * @author tingfeng
 *
 * @export
 * @param ev
 */
export declare function toggleExpand(ev: MouseEvent): {
  isExpand: boolean;
};
/**
 * @description 描述 切换主题
 * @date 2025-06-26 21:58:56
 * @author tingfeng
 *
 * @export
 */
export declare function toggleTheme(): boolean;
/**
 * @description 描述 初始化主题模式
 * @date 2025-07-08 13:43:19
 * @author tingfeng
 *
 * @export
 * @param defaultThemeMode
 */
export declare function initThemeMode(defaultThemeMode: "light" | "dark"): void;
/**
 * @description 描述 复制代码
 * @date 2025-06-26 22:02:57
 * @author tingfeng
 *
 * @export
 * @param codeText
 */
export declare function copyCode(codeText: string | string[]): boolean;
