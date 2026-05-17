export declare function copyToClipboard(content: string): Promise<boolean>;
/**
 * DownloadOptions
 * @scale 2：标准分辨率；4：高分辨率（默认）； 8：超高分辨率
 * @quality 0.8：良好质量，文件较小；0.9：良好质量，文件适中；1.0：无损质量（默认）
 */
interface DownloadOptions {
  scale?: number;
  quality?: number;
  format?: string;
}
export declare function downloadSvgAsPng(
  svg: string,
  options?: DownloadOptions,
): void;
export {};
