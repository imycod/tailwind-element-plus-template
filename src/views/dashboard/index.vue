<template>
  <div>
    <el-button @click="open" type="primary">太极</el-button>
    <el-dialog v-model="visible">visible</el-dialog> 
  </div>
</template>

<script setup lang="ts">
const visible = true
const value =ref(false)

function open() {
  ElMessage({
    type:'success',
    message: '这是一条消息提示',
  })
  console.log('open')
}
</script>

<style lang="scss" scoped>

</style>