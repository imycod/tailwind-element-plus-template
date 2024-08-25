<template>
  <el-table :data="tableData.list">
    <RenderColumnList
      :columns="tableData.columns"
    ></RenderColumnList>
  </el-table>
</template>
​
<script setup lang="ts">
import RenderTableColumn from "./RenderTableColumn.vue";
import RenderColumnList from "./RenderColumnList.ts";
import { useSlots, PropType } from "vue";
import type { tableDataProps } from "./types.d";

defineProps({
  tableData: Object as PropType<tableDataProps>,
});
</script>
