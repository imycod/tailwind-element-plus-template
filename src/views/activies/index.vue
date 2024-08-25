<script setup lang="ts">
import Child from "./Child.vue"
import TestStandardTable from "./TestStandardTable.vue"

const form = reactive({
  name: 'xx',
  age: ''
})
const visible=ref(false)
const count = ref(0)
</script>

<template>
  <div>
    {{form}} / {{count}}
    <el-button @click="visible = !visible" type="primary">{{ visible }}</el-button>
    <Child v-model:data="form" v-model:visible="visible" :count="count"></Child>


    <hr class="mt-4"/>

    <TestStandardTable></TestStandardTable>
  </div>
</template>

<style scoped lang="scss">

</style>