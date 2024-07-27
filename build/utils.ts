import dayjs from "dayjs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {
    name,
    version,
    dependencies,
    devDependencies
} from "../package.json";

export const __APP_INFO__ = {
    pkg: {name, version, dependencies, devDependencies},
    lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};


const pathResolve = (dir = ".", metaUrl = import.meta.url) => {
    // 当前文件目录的绝对路径
    const currentFileDir = dirname(fileURLToPath(metaUrl));
    // build 目录的绝对路径
    const buildDir = resolve(currentFileDir, "build");
    // 解析的绝对路径
    const resolvedPath = resolve(currentFileDir, dir);
    // 检查解析的绝对路径是否在 build 目录内
    if (resolvedPath.startsWith(buildDir)) {
        // 在 build 目录内，返回当前文件路径
        return fileURLToPath(metaUrl);
    }
    // 不在 build 目录内，返回解析后的绝对路径
    return resolvedPath;
};


export const alias = {
    '@': pathResolve('../src'),
    '@tailwindConfig': pathResolve('../tailwind.config.js'),
    '@assets': pathResolve('../src/assets'),
    '@layout': pathResolve('../src/layout'),
    '@styles': pathResolve('../src/styles'),
    '@apis': pathResolve('../src/apis'),
    '@components': pathResolve('../src/components'),
    '@constants': pathResolve('../src/constants'),
    '@hooks': pathResolve('../src/hooks'),
    '@models': pathResolve('../src/models'),
    '@routers': pathResolve('../src/routers'),
    '@stores': pathResolve('../src/stores'),
    '@utils': pathResolve('../src/utils'),
    '@views': pathResolve('../src/views'),
}

export const manualChunks = (id: string) => {
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
        if (id.includes('echarts')) {
            return "echarts";
        }
        if (id.includes("chart.js")) {
            return "chart.js";
        }
        if (id.includes("@vueuse/core")) {
            return "vueuse-core";
        }
        if (id.includes("radash")) {
            return "radash";
        }
        if (id.includes("tailwindcss")) {
            return "tailwindcss";
        }
        return "vendor";
    }
}