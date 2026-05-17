import { FilesType } from '../components/FilesCard/types.d.ts';
export declare function getFileType(fileExtension: string): {
    lowerCase: FilesType;
    upperCase: string;
};
export declare function getSize(size: number): string;
export declare const isImageFileType: (type: string) => boolean;
export declare function previewImage(file: File | Blob): Promise<string>;
/**
 * 对代码块添加行号
 *
 * @param code 代码html内容
 * @returns string
 */
export declare function generateCodeRowNumber(code: string, source: string): string;
/**
 * 缩放、拖拽mermaid模块
 */
export declare const zoomMermaid: (containers: NodeListOf<HTMLElement>, options: {
    customIcon: any;
}) => void;
