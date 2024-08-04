import { createApp } from "vue";

import router from "./routers";
import { setupStore } from "@/stores";
import App from "./App.vue";
import { i18n } from '@/locales';

import ItemMore from "@/components/item-more/index.vue"
import ItemSearch from "@/components/item-table/search.vue"

import "@/assets/styles/index.scss";

const app = createApp(App);
app.component('more',ItemMore)
app.component('search',ItemSearch)

app.use(i18n); // 国际化
// 挂载 Vue 应用实例前，将翻译函数挂载到 window 对象上
window.$t = window.t = i18n.global.t;
window.$i18n =i18n

setupStore(app);
app.use(router);
app.mount("#app");
