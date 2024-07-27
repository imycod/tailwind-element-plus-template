import {defineConfig, loadEnv} from "vite";
import {
    alias,
    __APP_INFO__,
    manualChunks,
} from "./build/utils";
import {createVitePlugins} from "./build/plugins.ts";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    return {
        resolve: {
            alias
        },
        define: {
            "process.env": process.env,
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        },
        plugins: createVitePlugins(env),
        // 服务端渲染
        server: {
            // 端口号
            port: '9000',
            host: "127.0.0.1",
            proxy: {
                '/api': {
                    target: env.VITE_BASE_URL, // 目标服务器地址
                    ws: false, // 是否启用 WebSocket
                    changeOrigin: true, // 是否修改请求头中的 Origin 字段
                    // rewrite: (path) => path.replace('/api', ''),
                },
                '/local': {
                    target: 'http://localhost:9002',
                    rewrite: (path) => path.replace('/local', ''),
                }
            },
        },
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
        esbuild: {
            drop: mode === 'dev' ? [] : ['console','debugger'],
        },
        build: {
            commonjsOptions: {
                transformMixedEsModules: true,
            },
            rollupOptions: {
                output: {
                    manualChunks,
                },
            },
        },
    };
});
