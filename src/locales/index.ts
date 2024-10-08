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
import {useLanguageStoreHook} from "@/stores/modules/language.ts";

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

// vite
const modules = import.meta.glob('./*.json', {eager: true});
for (const path in modules) {
    const key = path.match(/(\S+)\/(\S+).json/);
    if (itemize[key![2]]) itemize[key![2]].push(modules[path].default);
    else itemize[key![2]] = modules[path];
}

// 合并数组对象（非标准数组对象，数组中对象的每项 key、value 都不同）
function mergeArrObj(list, key) {
    let obj = {};
    list[key].forEach((i) => {
        obj = Object.assign({}, obj, i);
    });
    return obj;
}

for (const key in itemize) {
    messages[key] = {
        name: key,
        el: element[key].el,
        ...mergeArrObj(itemize, key),
    };
}

const store = useLanguageStoreHook()

// 导出语言国际化
export const i18n = createI18n({
    legacy: false,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
    fallbackWarn: false,
    locale: store.language,
    fallbackLocale: zhcnLocale.name,
    messages,
});
