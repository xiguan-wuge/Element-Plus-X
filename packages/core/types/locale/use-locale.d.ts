import { Language, TranslateOption } from "./types";
export declare function translate(
  path: string,
  option: TranslateOption | undefined,
  locale: Language,
): string;
export declare function buildTranslator(
  locale: () => Language,
): (path: string, option?: TranslateOption) => string;
export declare function useLocale(
  localeOverrides?: () => Language | undefined,
): {
  lang: globalThis.ComputedRef<string>;
  locale: globalThis.ComputedRef<Language>;
  t: (path: string, option?: TranslateOption) => string;
};
