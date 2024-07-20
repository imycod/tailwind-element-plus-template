<template>
   <el-config-provider :locale="getGlobalI18n" namespace="item">
     {{getGlobalI18n}}
     <router-view />
     <item-dialog />
  </el-config-provider>
</template>

<script setup lang="ts">
import {ItemDialog} from "@/components/item-dialog/index.ts";
import {useAppStoreHook} from "@/stores/modules/app.ts";
const itemApp = useAppStoreHook()
const getGlobalI18n = computed(() => {
  return $i18n.global.messages[itemApp.lang];
});
console.log($i18n.global.messages)
</script>

<style lang="scss" scoped>

</style>

