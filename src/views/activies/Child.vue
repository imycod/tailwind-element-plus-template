<script setup lang="ts">
// https://mehdisolhan.medium.com/two-way-binding-with-definemodel-in-vue-3-4-460fd275a7f6
const model = defineModel('data', {
  type: Object,
  default: () => ({
    name: '',
    age: ''
  })
})
const visible = defineModel('visible', {
  type: Boolean,
  default: false
})
const count = defineModel('count', {
  type: Number,
  default: 0
})
</script>

<template>
  <div class="bg-gray-800 p-5">
    child:
    {{ visible }} / {{ count }}
    <el-button @click="visible = !visible" type="primary">child {{ visible }}</el-button>
    <el-button @click="count++">{{ count }}</el-button>
    <el-input class="mt-1" v-model="model.name"></el-input>
    <el-input class="mt-1" v-model="model.age"></el-input>
  </div>
</template>

<style scoped lang="scss">

</style>