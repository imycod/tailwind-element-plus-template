<template>
   <el-config-provider :locale="getGlobalI18n" namespace="item">
     <router-view />
     <item-dialog />
  </el-config-provider>
</template>

<script setup lang="ts">
import {ItemDialog} from "@/components/item-dialog/index.ts";
import {useLanguageStoreHook} from "@/stores/modules/language.ts";

const langStore = useLanguageStoreHook()
const getGlobalI18n = computed(() => {
  return $i18n.global.messages[langStore.language];
});
</script>

<style lang="scss" scoped>

</style>

