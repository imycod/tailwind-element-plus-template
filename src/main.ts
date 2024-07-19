import { createApp } from "vue";

import router from "./routers";
import { setupStore } from "@/stores";
import App from "./App.vue";

import "@/assets/styles/style.css";

const app = createApp(App);

setupStore(app);
app.use(router);
app.mount("#app");
