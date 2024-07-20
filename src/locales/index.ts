// @ts-nocheck
import {createI18n} from 'vue-i18n';
// 定义语言国际化内容

/**
 * 说明：
 * 须在 pages 下新建文件夹（建议 `要国际化界面目录` 与 `i18n 目录` 相同，方便查找），
 * 注意国际化定义的字段，不要与原有的定义字段相同。
 * 1、/src/i18n/lang 下的 ts 为框架的国际化内容
 * 2、/src/i18n/pages 下的 ts 为各界面的国际化内容
 */

// element plus 自带国际化
import enLocale from 'element-plus/es/locale/lang/en';
import zhcnLocale from 'element-plus/es/locale/lang/zh-cn';
import zhtwLocale from 'element-plus/es/locale/lang/zh-tw';
import esLocale from 'element-plus/es/locale/lang/es';
import koLocale from 'element-plus/es/locale/lang/ko';
import jaLocale from 'element-plus/es/locale/lang/ja';
import arLocale from 'element-plus/es/locale/lang/ar';
import {useAppStoreHook} from "@/stores/modules/app.ts";

// 定义变量内容
const messages = {};
const element = {
    en: enLocale,
    zh: zhcnLocale,
    tw: zhtwLocale,
    es: esLocale,
    ko: koLocale,
    ja: jaLocale,
    ar: arLocale,
};
const itemize = {en: [], zh: [], tw: [], es: [], ko: [], ja: [], ar: []};

const langModules = {};

function loadModule(files,modules) {
    files.keys().forEach((key) => {
        const moduleName = key.replace(/^.\/(.*)\.\w+$/, '$1');
        modules[moduleName] = files(key);
    });
}

// webpack
// const langFiles = require.context('./', false, /\.json$/);
// loadModule(langFiles,langModules)

// vite
const langFiles = import.meta.glob('./*.json', {eager: true});
Object.entries(langFiles).forEach(([key, value]) => {
    const moduleName = key.replace(/^.*\/(.*)\.json$/, '$1');
    langModules[moduleName] = value;
});
// Object.entries(langFiles).forEach(([key, importer]) => {
// 	const moduleName = key.replace(/\.\/(.*)\.json$/, '$1');
// 	importer().then((module) => {
// 		langModules[moduleName] = module.default || module;
// 	});
// });

// 对自动引入的 modules 进行分类 en、zh、es
// https://vitejs.cn/vite3-cn/guide/features.html#glob-import
for (const key in langModules) {
    console.log(key)
    if (itemize[key]) {
        itemize[key].push(langModules[key]);
    } else {
        itemize[key] = langModules[key];
    }
}

console.log('itemize---', itemize)

// 合并数组对象（非标准数组对象，数组中对象的每项 key、value 都不同）
function mergeArrObj(list, key) {
    let obj = {};
    list[key].forEach((i) => {
        obj = Object.assign({}, obj, i);
    });
    return obj;
}

for (const key in itemize) {
    console.log('messages---', messages);
    messages[key] = {
        name: key,
        el: element[key].el,
        ...mergeArrObj(itemize, key),
    };
}

const itemApp = useAppStoreHook()

// 导出语言国际化
export const i18n = createI18n({
    legacy: false,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
    fallbackWarn: false,
    locale: itemApp.lang,
    fallbackLocale: zhcnLocale.name,
    messages,
});
