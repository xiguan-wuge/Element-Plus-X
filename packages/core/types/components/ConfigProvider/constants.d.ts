import { Options } from "markdown-it";
import { ComputedRef, InjectionKey } from "vue";
import { ConfigProviderProps } from "./types";
export declare const APP_CONFIG_PROVIDE_KEY: InjectionKey<
  ComputedRef<ConfigProviderProps>
>;
export declare const DEFAULT_MD_CONFIG: Options;
export declare const DEFAULT_APP_CONFIG: ConfigProviderProps;
