<script setup lang="ts">
const {getSchema, form} = useSearch()
// 定义 genderOptions 作为 ref
const genderOptions = ref([])
const hobbieOptions = ref([])

// 定义 initialSchema 作为 ref，并使用 computed 来动态获取最新的 options
// 通过计算属性 schema 获取最新的 schema
let schema = computed(() => {
  // return getSchema({
  //   select:{
  //     name: 'name',
  //     options: genderOptions.value
  //   }
  // })
  // return getSchema({
  //   input: {
  //     name: 'name'
  //   },
  //   select: {
  //     name: 'gender',
  //     options: genderOptions.value
  //   },
  // })
  return [{
    type: 'input',
    name: 'name1',
  }, {
    type: 'select',
    name: 'gender',
    options: genderOptions.value
  }, {
    type: 'input',
    name: 'name2',
  }, {
    type: 'select',
    name: 'hobbie',
    options: hobbieOptions.value
  }, {
    type: 'date',
    name: 'date'
  }].map((item, index) => {
    return getSchema(item)[0]
  })
})

function callback(type) {
  if (type === 'reset') {
    form.value = {}
  }
}

onMounted(() => {
  setTimeout(() => {
    genderOptions.value = [
      {
        label: '男1',
        value: 'male'
      },
      {
        label: '女1',
        value: 'female'
      }
    ]
  }, 1000)
  setTimeout(() => {
    hobbieOptions.value = [
      {
        label: '男',
        value: 'male'
      },
      {
        label: '女',
        value: 'female'
      }
    ]
  }, 2100)
})
</script>

<template>
  <div>
    <search :schema="schema" v-model="form" :callback="callback"></search>
  </div>
</template>

<style scoped lang="scss">

</style>