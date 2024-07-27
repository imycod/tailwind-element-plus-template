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
  </div>
</template>

<script setup lang="ts">
import {addDialog} from "@/components/item-dialog/index.ts";
import useTable from "@/hooks/useTable.ts"
function open() {
  addDialog({
    title: 'xxx',
    contentRenderer({options, index}) {
      console.log(options)
    },
  })
}

useTable('#table',{
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
    @apply bg-secondary h-20 rounded-lg mt-5;
  }
}
</style>