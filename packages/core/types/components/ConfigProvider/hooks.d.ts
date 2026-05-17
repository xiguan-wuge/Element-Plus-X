import { App, MaybeRef } from "vue";
import { ConfigProviderProps } from "./types";
export declare function buildConfigProviderContext(
  parentConfig: MaybeRef<ConfigProviderProps | undefined>,
  currentConfig: MaybeRef<Partial<ConfigProviderProps> | undefined>,
): globalThis.ComputedRef<ConfigProviderProps>;
export declare function useConfigProvider(): globalThis.ComputedRef<ConfigProviderProps>;
export declare function provideGlobalConfig(
  config: MaybeRef<Partial<ConfigProviderProps> | undefined>,
  app?: App,
): globalThis.ComputedRef<ConfigProviderProps>;
