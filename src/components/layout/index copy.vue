<script setup lang="ts">
import Setting from "./setting/index.vue";
import Sidebar from "./sidebar.vue";
import { useDataThemeChange } from "./hooks/useDataThemeChange.ts";
import { useGlobal } from "@pureadmin/utils";
import { toggleTheme } from "@pureadmin/theme/dist/browser-utils";
import { useAppStoreHook } from "@/stores/modules/app.ts";

const { $storage } = useGlobal<any>();

const { layoutTheme } = useDataThemeChange();

/* body添加layout属性，作用于src/style/sidebar.scss */
if (unref(layoutTheme)) {
  const layout = unref(layoutTheme).layout;
  const theme = unref(layoutTheme).theme;
  toggleTheme({
    scopeName: `layout-theme-${theme}`
  });
  setLayoutModel(layout);
}
/** 设置导航模式 */
function setLayoutModel(layout: string) {
  layoutTheme.value.layout = layout;
  window.document.body.setAttribute("layout", layout);
  $storage.layout = {
    layout,
    theme: layoutTheme.value.theme,
    darkMode: $storage.layout?.darkMode,
    sidebarStatus: $storage.layout?.sidebarStatus,
    epThemeColor: $storage.layout?.epThemeColor,
    themeColor: $storage.layout?.themeColor,
    overallStyle: $storage.layout?.overallStyle
  };
  useAppStoreHook().setLayout(layout);
}

defineOptions({
  name: "Layout"
});

onBeforeMount(() => {
  useDataThemeChange().dataThemeChange($storage.layout?.overallStyle);
});
</script>

<template>
  <div class="flex w-full h-screen overflow-hidden dark:bg-black-400">
    <Sidebar />
    <div class="pure-container">
      <router-view v-slot="{Component}">
        <transition name="fade">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div> 
  </div>
  <Setting />
</template>

<style lang="scss" scoped>
.pure-container {
  // flex: 1;
  // height: 100vh;
  // min-height: 100%;
  margin-left: 210px;
  // background-color: var(--el-bg-color);
}

.fade-enter-from,.fade-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
.fade-enter-to,.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-enter-active,.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
