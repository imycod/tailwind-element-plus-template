import { createApp } from "vue";

import router from "./routers";
import { setupStore } from "@/stores";
import App from "./App.vue";

import ItemMore from "@/components/item-more/index.vue"

import "@/assets/styles/style.css";

const app = createApp(App);
app.component('more',ItemMore)

setupStore(app);
app.use(router);
app.mount("#app");
