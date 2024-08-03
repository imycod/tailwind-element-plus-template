<template>
  <div class="item-my-profile-layout">
    <div class="item-my-profile-title">
      <h1>My Profile</h1>
      <span>Account No: A01002073</span>
    </div>

    <div class="item-my-profile-card">
      <div class="card-info">
        <div class="avatar"></div>
        <div class="info"></div>
      </div>
      <more></more>
    </div>
    <div class="item-my-profile-card"></div>

    <div id="table"></div>

    <el-select
      v-model="value"
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-input v-model="input"></el-input>
  </div>
</template>

<script setup lang="ts">
import {addDialog} from "@/components/item-dialog/index.ts";
import {useTable} from "@/hooks/useTable.ts"

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

function open() {
  addDialog({
    title: 'xxx',
    contentRenderer({options, index}) {
      console.log(options)
    },
  })
}

const {addTable}= useTable({})
addTable('#table',{
  visible:true,
  data:[{
    id:1,
    name:'张三',
    age:18
  },{
    id:2,
    name:'李四',
    age:19
  }],
  column:[
    {
      title:'ID',
      key:'id',
    },
    {
      title:'姓名',
      key:'name'
    },
    {
      title:'年龄',
      key:'age'
    }
  ]
})
onMounted(async ()=>{
 // const result = await retry({ times:10,delay:1000 },getTodos)
 //  const result = await getTodos()
})
</script>

<style lang="scss" scoped>
.item-my-profile-layout{
  .item-my-profile-title{
    @apply flex items-center;
    h1{
      @apply text-2xl font-bold;
    }
    > span{
      margin-left: 10px;
      @apply text-blue-600;
    }
  }
  .item-my-profile-card {
    @apply  bg-red-500 dark:bg-black-300  h-20 rounded-lg mt-5;
  }
}
</style>