import {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ThemeRegistrationResolved,
} from "shiki";
import { InitShikiOptions } from "../shared";
interface UseShikiOptions {
  themes?: InitShikiOptions["themes"];
}
export declare function useGlobalShikiHighlighter(options?: UseShikiOptions): {
  highlighter: import("vue").ShallowRef<
    HighlighterGeneric<BundledLanguage, BundledTheme> | undefined,
    HighlighterGeneric<BundledLanguage, BundledTheme> | undefined
  >;
  shikiThemeColor: globalThis.Ref<
    ThemeRegistrationResolved | undefined,
    ThemeRegistrationResolved | undefined
  >;
  isDark: globalThis.Ref<boolean, boolean>;
  init: () => Promise<void>;
  destroy: () => void;
};
export {};
