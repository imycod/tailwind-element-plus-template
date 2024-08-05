/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-07-18 22:48:32
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-08-05 20:13:56
 * @FilePath: \tailwind-element-plus-template\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";

import router from "./routers";
import { setupStore } from "@/stores";
import App from "./App.vue";
import { i18n } from '@/locales';

import ItemMore from "@/components/item-more/index.vue"
import ItemSearch from "@/components/item-table/search.vue"
import ItemTable from "@/components/item-table/index.vue"

import "@/assets/styles/index.scss";

const app = createApp(App);
app.component('more',ItemMore)
app.component('search',ItemSearch)
app.component('item-table',ItemTable)

app.use(i18n); // 国际化
// 挂载 Vue 应用实例前，将翻译函数挂载到 window 对象上
window.$t = window.t = i18n.global.t;
window.$i18n =i18n

setupStore(app);
app.use(router);
app.mount("#app");
