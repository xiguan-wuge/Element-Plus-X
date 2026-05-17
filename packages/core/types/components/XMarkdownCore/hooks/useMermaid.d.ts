import { Ref } from "vue";
interface UseMermaidOptions {
  id?: string;
  theme?: "default" | "dark" | "forest" | "neutral" | string;
  config?: any;
}
export declare function useMermaid(
  content: string | Ref<string>,
  options?: UseMermaidOptions,
): {
  data: Ref<string, string>;
  error: Ref<unknown, unknown>;
};
export {};
