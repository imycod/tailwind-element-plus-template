<template>
  <el-table :data="tableData.list">
    <template v-for="item in tableData.columns" :key="item">
      <RenderTableColumn :data="item">
        <!-- 插槽透传 -->
        <template
          v-for="itemSlot in Object.keys(slots)"
          :key="itemSlot"
          v-slot:[itemSlot]="temp"
        >
          <slot :name="itemSlot" v-bind="temp"></slot>
        </template>
      </RenderTableColumn>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import RenderTableColumn from "./RenderTableColumn.vue";
import { useSlots, PropType } from "vue";
import type { tableDataProps } from "./types.d";

const slots = useSlots();
console.log("插槽", slots); // 打印有两个插槽，score_xian 和 default
defineProps({
  tableData: Object as PropType<tableDataProps>,
});
</script>
