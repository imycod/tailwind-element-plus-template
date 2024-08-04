<template>
  <div class="item-my-profile-layout">
    <search :schema="schema" v-model="form"></search>
  </div>
</template>

<script setup lang="ts">
import {addDialog} from "@/components/item-dialog/index.ts";

import schema from "./schema.ts"

const form = reactive({})

function open() {
  addDialog({
    title: 'xxx',
    contentRenderer({options, index}) {
      console.log(options)
    },
  })
}

onMounted(async () => {
  // const result = await retry({ times:10,delay:1000 },getTodos)
  //  const result = await getTodos()
})
</script>

<style lang="scss" scoped>

</style>