<template>
   <el-config-provider :locale="getGlobalI18n" namespace="item">
     <router-view />
     <item-dialog />
  </el-config-provider>
</template>

<script setup lang="ts">
import {ItemDialog} from "@/components/item-dialog/index.ts";
import {useLanguageStoreHook} from "@/stores/modules/language.ts";
import {useLoggerStore} from "@/stores/modules/logger.ts";

const langStore = useLanguageStoreHook()
const getGlobalI18n = computed(() => {
  return $i18n.global.messages[langStore.language];
});

useEventListener('click',(event)=>{
  useLoggerStore().toLogger({
    type: 'click',
    target: event.target,
    path: window.location.href,
    targetName: event.target.innerText,
    timestamp: new Date().getTime()
  })
})
</script>

<style lang="scss">
#app{
  background-color: var(--item-bg-color-page);
}
</style>

