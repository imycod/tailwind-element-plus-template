<template>
   <el-config-provider namespace="item">
     <router-view />
     <item-dialog />
  </el-config-provider>
</template>

<script setup lang="ts">
import {ItemDialog} from "@/components/item-dialog/index.ts";
</script>

<style lang="scss" scoped>

</style>

