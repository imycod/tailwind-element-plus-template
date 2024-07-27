<script setup lang="ts">
useTable('#table',{
  visible: true,
  data: [
    {
      id: 1,
      name: '张三',
      age: 18
    },
    {
      id: 2,
      name: '李四111',
      age: 19
    }
  ],
  column: [
    {
      type: 'selection',
    },
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '年龄',
      key: 'age'
    }
  ]
})
</script>

<template>
  <div>
    setting
    <div id="table"></div>
  </div>
</template>

<style scoped lang="scss">

</style>