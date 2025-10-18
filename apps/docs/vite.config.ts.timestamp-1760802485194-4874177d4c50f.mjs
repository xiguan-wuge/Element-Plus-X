// vite.config.ts
import vueJsx from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Unocss from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/unplugin-auto-import/dist/vite.js";
import ElementPlus from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/unplugin-element-plus/dist/vite.js";
import { ElementPlusResolver } from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/vite/dist/node/index.js";
import eslintPlugin from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/vite-plugin-eslint/dist/index.mjs";
import { tsxAutoProps } from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/vite-plugin-tsx-auto-props/dist/index.js";
import vitepressDemo from "file:///Users/xiguanwuge/codespace/sourceCode/Element-Plus-X/node_modules/vite-plugin-vitepress-demo/dist/index.js";

// scripts/vue-element-plus-x-resolver.ts
function tovUIResolver() {
  return {
    type: "component",
    resolve(name) {
      if (name.startsWith("El") || name.startsWith("el")) {
        return {
          name,
          from: "element-plus"
        };
      }
      if (name === "ClientOnly") {
        return null;
      }
      return {
        name,
        from: "vue-element-plus-x"
      };
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    AutoImport({
      imports: ["vue"],
      ignore: ["h", "ClientOnly"],
      resolvers: [ElementPlusResolver({
        exclude: /ElButtonGroup/
        // 忽略自动导入 ElButtonGroup
      })]
    }),
    Components({
      resolvers: [
        tovUIResolver(),
        ElementPlusResolver()
      ]
    }),
    tsxAutoProps(),
    vitepressDemo({
      // 我们让他自动搜索，我们所有项目中的demos下的vue文件
      // glob: ['**/demos/*.vue'],
    }),
    vueJsx(),
    Unocss(),
    // eslint-disable-next-line ts/no-unsafe-call
    eslintPlugin({
      include: ["packages/**/*.js", "packages/**/*.vue", "packages/**/*.ts"],
      // 根据你的项目结构调整路径
      exclude: [
        "**/node_modules/**",
        "**/.gitignore",
        "**/dist/**",
        "**/cache/**"
      ]
    }),
    ElementPlus({})
  ],
  // 我们使用vite中给我们提供的resolve配置项中的alias来实现一个重命名。
  resolve: {
    alias: [
      // {
      //   // 我们复制我们的utils中的配置，直接修改一下
      //   find: /^vue-element-plus-x/,
      //   // 然后再把utils替换成vue-element-plus-x，这样我们就完成了配置
      //   replacement: path.resolve(baseUrl, 'packages/vue-element-plus-x/src'),
      // },
      // {
      //   // 我们通过正则表达式去匹配以@vue-element-plus-x/utils的导入配置
      //   find: /^@vue-element-plus-x\/utils/,
      //   // 然后我们把路径替换成绝对路径地址
      //   replacement: path.resolve(baseUrl, 'packages/utils/src'),
      // },
      // {
      //   // 我们通过正则表达式去匹配以@vue-element-plus-x/icons
      //   find: /^@vue-element-plus-x\/icons/,
      //   // 然后我们把路径替换成绝对路径地址
      //   replacement: path.resolve(baseUrl, 'packages/icons/src'),
      // },
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy92dWUtZWxlbWVudC1wbHVzLXgtcmVzb2x2ZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveGlndWFud3VnZS9jb2Rlc3BhY2Uvc291cmNlQ29kZS9FbGVtZW50LVBsdXMtWC9hcHBzL2RvY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy94aWd1YW53dWdlL2NvZGVzcGFjZS9zb3VyY2VDb2RlL0VsZW1lbnQtUGx1cy1YL2FwcHMvZG9jcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveGlndWFud3VnZS9jb2Rlc3BhY2Uvc291cmNlQ29kZS9FbGVtZW50LVBsdXMtWC9hcHBzL2RvY3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiwgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcbi8vIGltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbi8vIGltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gJ3VucGx1Z2luLWVsZW1lbnQtcGx1cy92aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG5pbXBvcnQgeyB0c3hBdXRvUHJvcHMgfSBmcm9tICd2aXRlLXBsdWdpbi10c3gtYXV0by1wcm9wcydcbi8vIFx1NUJGQ1x1NTE2NWRlbW9cdTYzRDJcdTRFRjZcbmltcG9ydCB2aXRlcHJlc3NEZW1vIGZyb20gJ3ZpdGUtcGx1Z2luLXZpdGVwcmVzcy1kZW1vJ1xuaW1wb3J0IHsgdG92VUlSZXNvbHZlciB9IGZyb20gJy4vc2NyaXB0cy92dWUtZWxlbWVudC1wbHVzLXgtcmVzb2x2ZXInXG5cbi8vIFx1OEJGQlx1NTNENlx1NjIxMVx1NEVFQ1x1NUY1M1x1NTI0RFx1NzY4NFx1NjgzOVx1NzZFRVx1NUY1NVxuLy8gY29uc3QgYmFzZVVybCA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLicsIGltcG9ydC5tZXRhLnVybCkpXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1widnVlXCJdLFxuICAgICAgaWdub3JlOiBbJ2gnLCAnQ2xpZW50T25seSddLFxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7XG4gICAgICAgIGV4Y2x1ZGU6IC9FbEJ1dHRvbkdyb3VwLyAvLyBcdTVGRkRcdTc1NjVcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxCdXR0b25Hcm91cFxuICAgICAgfSldLFxuICAgIH0pIGFzIFBsdWdpbk9wdGlvbixcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICB0b3ZVSVJlc29sdmVyKCksXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcbiAgICAgIF0sXG4gICAgfSkgYXMgUGx1Z2luT3B0aW9uLFxuICAgIHRzeEF1dG9Qcm9wcygpLFxuICAgIHZpdGVwcmVzc0RlbW8oe1xuICAgICAgLy8gXHU2MjExXHU0RUVDXHU4QkE5XHU0RUQ2XHU4MUVBXHU1MkE4XHU2NDFDXHU3RDIyXHVGRjBDXHU2MjExXHU0RUVDXHU2MjQwXHU2NzA5XHU5ODc5XHU3NkVFXHU0RTJEXHU3Njg0ZGVtb3NcdTRFMEJcdTc2ODR2dWVcdTY1ODdcdTRFRjZcbiAgICAgIC8vIGdsb2I6IFsnKiovZGVtb3MvKi52dWUnXSxcbiAgICB9KSBhcyBQbHVnaW5PcHRpb24sXG5cbiAgICB2dWVKc3goKSBhcyBQbHVnaW5PcHRpb24sXG4gICAgVW5vY3NzKCkgYXMgUGx1Z2luT3B0aW9uLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB0cy9uby11bnNhZmUtY2FsbFxuICAgIGVzbGludFBsdWdpbih7XG4gICAgICBpbmNsdWRlOiBbJ3BhY2thZ2VzLyoqLyouanMnLCAncGFja2FnZXMvKiovKi52dWUnLCAncGFja2FnZXMvKiovKi50cyddLCAvLyBcdTY4MzlcdTYzNkVcdTRGNjBcdTc2ODRcdTk4NzlcdTc2RUVcdTdFRDNcdTY3ODRcdThDMDNcdTY1NzRcdThERUZcdTVGODRcbiAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgJyoqL25vZGVfbW9kdWxlcy8qKicsXG4gICAgICAgICcqKi8uZ2l0aWdub3JlJyxcbiAgICAgICAgJyoqL2Rpc3QvKionLFxuICAgICAgICAnKiovY2FjaGUvKionLFxuICAgICAgXSxcbiAgICB9KSxcbiAgICBFbGVtZW50UGx1cyh7fSkgYXMgUGx1Z2luT3B0aW9uLFxuICBdIGFzIFBsdWdpbltdLFxuICAvLyBcdTYyMTFcdTRFRUNcdTRGN0ZcdTc1Mjh2aXRlXHU0RTJEXHU3RUQ5XHU2MjExXHU0RUVDXHU2M0QwXHU0RjlCXHU3Njg0cmVzb2x2ZVx1OTE0RFx1N0Y2RVx1OTg3OVx1NEUyRFx1NzY4NGFsaWFzXHU2NzY1XHU1QjlFXHU3M0IwXHU0RTAwXHU0RTJBXHU5MUNEXHU1NDdEXHU1NDBEXHUzMDAyXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAgLy8ge1xuICAgICAgLy8gICAvLyBcdTYyMTFcdTRFRUNcdTU5MERcdTUyMzZcdTYyMTFcdTRFRUNcdTc2ODR1dGlsc1x1NEUyRFx1NzY4NFx1OTE0RFx1N0Y2RVx1RkYwQ1x1NzZGNFx1NjNBNVx1NEZFRVx1NjUzOVx1NEUwMFx1NEUwQlxuICAgICAgLy8gICBmaW5kOiAvXnZ1ZS1lbGVtZW50LXBsdXMteC8sXG4gICAgICAvLyAgIC8vIFx1NzEzNlx1NTQwRVx1NTE4RFx1NjI4QXV0aWxzXHU2NkZGXHU2MzYyXHU2MjEwdnVlLWVsZW1lbnQtcGx1cy14XHVGRjBDXHU4RkQ5XHU2ODM3XHU2MjExXHU0RUVDXHU1QzMxXHU1QjhDXHU2MjEwXHU0RTg2XHU5MTREXHU3RjZFXG4gICAgICAvLyAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoYmFzZVVybCwgJ3BhY2thZ2VzL3Z1ZS1lbGVtZW50LXBsdXMteC9zcmMnKSxcbiAgICAgIC8vIH0sXG4gICAgICAvLyB7XG4gICAgICAvLyAgIC8vIFx1NjIxMVx1NEVFQ1x1OTAxQVx1OEZDN1x1NkI2M1x1NTIxOVx1ODg2OFx1OEZCRVx1NUYwRlx1NTNCQlx1NTMzOVx1OTE0RFx1NEVFNUB2dWUtZWxlbWVudC1wbHVzLXgvdXRpbHNcdTc2ODRcdTVCRkNcdTUxNjVcdTkxNERcdTdGNkVcbiAgICAgIC8vICAgZmluZDogL15AdnVlLWVsZW1lbnQtcGx1cy14XFwvdXRpbHMvLFxuICAgICAgLy8gICAvLyBcdTcxMzZcdTU0MEVcdTYyMTFcdTRFRUNcdTYyOEFcdThERUZcdTVGODRcdTY2RkZcdTYzNjJcdTYyMTBcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdTU3MzBcdTU3NDBcbiAgICAgIC8vICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShiYXNlVXJsLCAncGFja2FnZXMvdXRpbHMvc3JjJyksXG4gICAgICAvLyB9LFxuICAgICAgLy8ge1xuICAgICAgLy8gICAvLyBcdTYyMTFcdTRFRUNcdTkwMUFcdThGQzdcdTZCNjNcdTUyMTlcdTg4NjhcdThGQkVcdTVGMEZcdTUzQkJcdTUzMzlcdTkxNERcdTRFRTVAdnVlLWVsZW1lbnQtcGx1cy14L2ljb25zXG4gICAgICAvLyAgIGZpbmQ6IC9eQHZ1ZS1lbGVtZW50LXBsdXMteFxcL2ljb25zLyxcbiAgICAgIC8vICAgLy8gXHU3MTM2XHU1NDBFXHU2MjExXHU0RUVDXHU2MjhBXHU4REVGXHU1Rjg0XHU2NkZGXHU2MzYyXHU2MjEwXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHU1NzMwXHU1NzQwXG4gICAgICAvLyAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoYmFzZVVybCwgJ3BhY2thZ2VzL2ljb25zL3NyYycpLFxuICAgICAgLy8gfSxcbiAgICBdLFxuICB9LFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3hpZ3Vhbnd1Z2UvY29kZXNwYWNlL3NvdXJjZUNvZGUvRWxlbWVudC1QbHVzLVgvYXBwcy9kb2NzL3NjcmlwdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy94aWd1YW53dWdlL2NvZGVzcGFjZS9zb3VyY2VDb2RlL0VsZW1lbnQtUGx1cy1YL2FwcHMvZG9jcy9zY3JpcHRzL3Z1ZS1lbGVtZW50LXBsdXMteC1yZXNvbHZlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveGlndWFud3VnZS9jb2Rlc3BhY2Uvc291cmNlQ29kZS9FbGVtZW50LVBsdXMtWC9hcHBzL2RvY3Mvc2NyaXB0cy92dWUtZWxlbWVudC1wbHVzLXgtcmVzb2x2ZXIudHNcIjtpbXBvcnQgdHlwZSB7IENvbXBvbmVudFJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMnXG5cbmV4cG9ydCBmdW5jdGlvbiB0b3ZVSVJlc29sdmVyKCk6IENvbXBvbmVudFJlc29sdmVyIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnY29tcG9uZW50JyxcbiAgICByZXNvbHZlKG5hbWUpIHtcbiAgICAgIC8vIC8vIFx1NTkyN1x1NUJCNlx1NTNFRlx1NEVFNVx1NzcwQlx1NTIzMFx1NjIxMVx1NEVFQ1x1OEZEOVx1OTFDQ1x1NjI1M1x1NTM3MFx1NTFGQVx1Njc2NVx1NzY4NFx1NjYyRiBUQnV0dG9uXHVGRjBDXHU2MjQwXHU0RUU1XHU2MjExXHU0RUVDXHU1QzMxXHU1M0VGXHU0RUU1XHU1MjI0XHU2NUFEXHU0RTAwXHU0RTBCXHU2NjJGXHU0RTBEXHU2NjJGXHU2MjExXHU0RUVDXHU3Njg0XHU0RUU1VFx1NUYwMFx1NTkzNFx1NzY4NFx1N0VDNFx1NEVGNlxuICAgICAgLy8gaWYgKG5hbWUgPT09ICdUQnV0dG9uJykge1xuICAgICAgLy8gICAvLyBcdTU5ODJcdTY3OUNcdTY2MkZcdTRFRTVUXHU1RjAwXHU1OTM0XHU3Njg0XHU3RUM0XHU0RUY2XHVGRjBDXHU2MjExXHU0RUVDXHU5NzAwXHU4OTgxXHU4MUVBXHU1MkE4XHU1MkEwXHU4RjdEXHU4RkRCXHU2NzY1XHUzMDAyXG4gICAgICAvLyAgIHJldHVybiB7XG4gICAgICAvLyAgICAgLy8gXHU1NkUwXHU0RTNBXHU2MjExXHU0RUVDXHU1MThEXHU1QkZDXHU1MUZBXHU3Njg0XHU2NUY2XHU1MDE5XHU1RTc2XHU2Q0ExXHU2NzA5XHU1MjMwXHU1OTA0XHU1MjREXHU3RjAwVFx1NjI0MFx1NEVFNVx1NjIxMVx1NEVFQ1x1ODk4MVx1NTIyMFx1OTY2NFx1NjM4OVx1NTI0RFx1N0YwMFxuICAgICAgLy8gICAgIG5hbWU6IG5hbWUuc2xpY2UoMSksXG4gICAgICAvLyAgICAgZnJvbTogJ2VsZW1lbnQtcGx1cy14JyxcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfVxuICAgICAgXG5cbiAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ0VsJykgfHwgbmFtZS5zdGFydHNXaXRoKCdlbCcpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBmcm9tOiAnZWxlbWVudC1wbHVzJyxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBcdTc5RkJcdTk2NjQgQ2xpZW50T25seSBcdTdFQzRcdTRFRjZcbiAgICAgIGlmIChuYW1lID09PSAnQ2xpZW50T25seScpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZnJvbTogJ3Z1ZS1lbGVtZW50LXBsdXMteCcsXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdBLE9BQU8sWUFBWTtBQUNuQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxtQkFBbUI7OztBQ1huQixTQUFTLGdCQUFtQztBQUNqRCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRLE1BQU07QUFZWixVQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxXQUFXLElBQUksR0FBRztBQUNsRCxlQUFPO0FBQUEsVUFDTDtBQUFBLFVBQ0EsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBR0EsVUFBSSxTQUFTLGNBQWM7QUFDekIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0EsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QURoQkEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1QsU0FBUyxDQUFDLEtBQUs7QUFBQSxNQUNmLFFBQVEsQ0FBQyxLQUFLLFlBQVk7QUFBQSxNQUMxQixXQUFXLENBQUMsb0JBQW9CO0FBQUEsUUFDOUIsU0FBUztBQUFBO0FBQUEsTUFDWCxDQUFDLENBQUM7QUFBQSxJQUNKLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVc7QUFBQSxRQUNULGNBQWM7QUFBQSxRQUNkLG9CQUFvQjtBQUFBLE1BQ3RCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxhQUFhO0FBQUEsSUFDYixjQUFjO0FBQUE7QUFBQTtBQUFBLElBR2QsQ0FBQztBQUFBLElBRUQsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsSUFFUCxhQUFhO0FBQUEsTUFDWCxTQUFTLENBQUMsb0JBQW9CLHFCQUFxQixrQkFBa0I7QUFBQTtBQUFBLE1BQ3JFLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsWUFBWSxDQUFDLENBQUM7QUFBQSxFQUNoQjtBQUFBO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFtQlA7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
