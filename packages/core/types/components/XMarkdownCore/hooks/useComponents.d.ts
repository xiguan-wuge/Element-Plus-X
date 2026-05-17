declare function useComponents(): {
  code: (raw: any) => globalThis.VNode<
    import("vue").RendererNode,
    import("vue").RendererElement,
    {
      [key: string]: any;
    }
  >;
};
export { useComponents };
