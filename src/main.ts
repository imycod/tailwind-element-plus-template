import { createApp } from "vue";

import router from "./routers";
import { setupStore } from "@/stores";
import App from "./App.vue";

import { injectResponsiveStorage } from "@/utils/responsive";
import { getPlatformConfig } from "./config";

import "@/assets/styles/style.css";

const app = createApp(App);

getPlatformConfig(app).then(async (config) => {
  setupStore(app);
  injectResponsiveStorage(app, config);
  app.use(router);
  app.mount("#app");
});
