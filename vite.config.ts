import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import compressPlugin from "vite-plugin-compression";

import baseConfig from "./baseConfig";

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd());
  console.log(env);
  return {
    ...baseConfig,
    define: {
      "process.env": process.env,
    },
    plugins: [
      vue(),
      compressPlugin({
        threshold: 3072, //3KB 仅压缩文件大小大于此阈值的文件
        deleteOriginFile: true, // 是否删除原始文件
        verbose: false, // boolean	true	是否在控制台中输出压缩结果
      }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
        // https://juejin.cn/post/7189134329912492069
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: "./types/auto-imports.d.ts",
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass",
          }),
        ],
      }),
      // ElementPlus({
      //   useSource: true,
      // }),
      Components({
        resolvers: [
          // https://blog.csdn.net/weixin_43951592/article/details/135814867
          ElementPlusResolver({
            importStyle: "sass",
          }),
        ],
      }),
    ],
    optimizeDeps: {
      include: ["@tailwindConfig"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@assets/styles/element/var.scss" as *;`,
        },
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("element-plus")) {
                return "element-plus";
              }
              if (id.includes("vue")) {
                return "vue";
              }
              if (id.includes("vue-router")) {
                return "vue-router";
              }
              if (id.includes("pinia")) {
                return "pinia";
              }
              if (id.includes("chart.js")) {
                return "chart.js";
              }
              if (id.includes("@vueuse")) {
                return "vueuse";
              }
              if (id.includes("lodash-es")) {
                return "lodash-es";
              }
              if (id.includes("tailwindcss")) {
                return "tailwindcss";
              }
              return "vendor";
            }
          },
        },
      },
    },
  };
});
