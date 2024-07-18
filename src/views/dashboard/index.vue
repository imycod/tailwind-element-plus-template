<template>
  <div>
    <el-button @click="open" type="primary">对话框</el-button>
    <el-dialog v-model="visible">visible</el-dialog> 
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