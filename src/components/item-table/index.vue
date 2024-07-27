<script setup lang="ts">
defineOptions({
  name: 'ItemTable'
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: () => []
  },
  column: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <el-config-provider namespace="item">
    <el-table v-if="visible" :data="data">
      <el-table-column v-for="(item, index) in column" :type="item.type" :key="index" :prop="item.key" :label="item.title">
      </el-table-column>
    </el-table>
  </el-config-provider>
</template>

<style scoped lang="scss">

</style>