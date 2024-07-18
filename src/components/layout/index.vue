<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-07-18 22:48:32
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-07-18 23:11:51
 * @FilePath: \vue-tailwind-admin-dashboardd:\code\item-workspace\tailwind-element-plus-template\src\components\layout\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import Sidebar from './sidebar/index.vue'
import Header from './raw/Header.vue'
import { useGlobal } from "@pureadmin/utils";
import { useDataThemeChange } from "./hooks/useDataThemeChange.ts";

const sidebarOpen = ref(false)

const { $storage } = useGlobal<any>();

defineOptions({
  name: "Layout"
});

// onBeforeMount(() => {
//   useDataThemeChange().dataThemeChange($storage.layout?.overallStyle);
// });
</script>

<template>
  <div class="flex w-full h-screen overflow-hidden dark:bg-black-400">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <div class="pure-container">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
