<script setup lang="ts">
import {ArrowLeftBold} from "@element-plus/icons-vue"
const router = useRouter()
function back() {
  router.back()
}
</script>

<template>
<div class="flex items-center">
  <el-icon size="24" class="cursor-pointer" @click="back"><ArrowLeftBold /></el-icon>
  <div class="text-black ml-2 dark:text-white text">Create Ads Post</div>
</div>
</template>

<style scoped lang="scss">
.text{
  font-size: 28px;
  font-weight: 500;
}
</style>