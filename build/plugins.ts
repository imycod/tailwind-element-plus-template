import vue from "@vitejs/plugin-vue";
import {PluginOption} from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import compressPlugin from "vite-plugin-compression";
import { vitePluginFakeServer } from "vite-plugin-fake-server";
/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
    const {VITE_NODE_ENV} = viteEnv;
    
    return [
        vue(),
        compressPlugin({
            threshold: 3072, //3KB 仅压缩文件大小大于此阈值的文件
            deleteOriginFile: true, // 是否删除原始文件
            verbose: false, // boolean	true	是否在控制台中输出压缩结果
        }),
        AutoImport({
            imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
            dirs: ["src/utils/*", "src/apis/*",'src/hooks/*'],
            // https://juejin.cn/post/7189134329912492069
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
            dts: "./types/auto-imports.d.ts",
            resolvers: [
                ElementPlusResolver({
                    importStyle: VITE_NODE_ENV === 'development' ? "sass" : "sass",  // 这段话消息提示等
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
                    importStyle: VITE_NODE_ENV === 'development' ? "sass" : "sass",
                }),
            ],
        }),
        // 若项目变大，上面的importStyle可以在开发时禁用 VITE_NODE_ENV === 'development' ? false : "sass",开发服务可以全局引入样式，生产服务只是打包时慢一点，但是可以按需加载
        // 使用unplugin-vue-components按需加载样式，开发环境会导致项目异常卡顿
        // 导致原因：vite会预加载style，当首次启动 vite 服务时会对 style 进行依赖预构建，，因为element-plus的按需样式会导入大量style文件，导致页面会卡住直至style构建完成
        // https://github.com/antfu/unplugin-vue-components/issues/361
        // 这里自定义一个vite插件，更改src/main.js内容，开发环境全局引入样式
        // {
        //     name: 'import-element-plus-style',
        //     transform(code, id) {
        //         if (/src\/main.ts$/.test(id)) {
        //             if (VITE_NODE_ENV === 'development') {
        //                 return {
        //                     code: `import "element-plus/theme-chalk/src/index.scss";${code};`,
        //                     map: null
        //                 }
        //             } else {
        //                 return {
        //                     code: `${code};import 'element-plus/theme-chalk/src/message-box.scss';import 'element-plus/theme-chalk/src/message.scss';`,
        //                     map: null
        //                 }
        //             }
        //         }
        //     }
        // },
        // mock支持
        vitePluginFakeServer({
            logger: false,
            include: "mock",
            infixName: false,
            enableProd: false
        }),
    ]
}