<template>
  <el-table-column :label="data.label">
       <!-- 自定义表头内容（插槽） -->
       <template v-if="data.header" #header="{ column, $index }">
        <slot :name="data.header" v-bind="{ column, $index }"></slot>  
       </template>
    <template v-slot="{ row, $index }">
      <!-- 支持多级表头 -->
      <template v-if="data.multiHeader && data.list && data.list.length">
                   <!-- 渲染列 -->
        <RenderTableColumn v-for="childColumn in data.list" :key="childColumn" :data="childColumn">
          <!-- 插槽透传 -->
               
          <template v-for="itemSlot in Object.keys(slots)" :key="itemSlot" v-slot:[itemSlot]="temp">
                      <slot :name="itemSlot" v-bind="temp"></slot>          
          </template>
        </RenderTableColumn>
      </template>
       
      <!-- 自定义列内容渲染, 级别:render>slot>prop>default slot -->
             <!-- render -->
             <template v-if="data.render && typeof data.render === 'function'">
              <span v-html="data.render(row, $index)"></span>        </template>
             <!-- 具名插槽 -->
             <template v-else-if="data.slot">
              <slot :name="data.slot" v-bind="{ row, $index }"></slot>      
         </template>
       
      <!-- prop -->
             <template v-else-if="data.prop">{{
        row[data.prop] || "-"
      }}</template>
       
      <!-- 默认插槽 -->
             <template v-else>
                    <slot v-bind="{ row, $index }"></slot>        
      </template>
    </template>
  </el-table-column>
</template>
​
<script setup lang="ts">
import { useSlots } from "vue";

defineProps({
  data: Object,
});
const slots = useSlots();
console.log("插槽", slots); // 打印的是空的，因为父组件并没有给该组件传递插槽
</script>
