<template>
  <div>
    <el-button @click="open" type="primary">对话框</el-button>
    <el-dialog v-model="visible">
      <span>asd</span>  
    </el-dialog> 

    <span>奥斯卡大奖</span>  
  </div>
</template>

<script setup lang="ts">
const visible = ref(false)
function open() {
  visible.value = true
}
</script>

<style lang="scss" scoped>

</style>