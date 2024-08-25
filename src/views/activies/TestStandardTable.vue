<template>
  <StandardTable :tableData="tableData">
    <!-- 默认插槽的名称是default,可省略名字 -->
    <template v-slot:default="{ row }">
      <el-button v-if="row.hasEdit" type="text">编辑</el-button>
      <el-button type="text">删除</el-button>
    </template>
    <!-- 具名插槽(如果有多个插槽就要定名字了)并接收数据 -->
    <template v-slot:score_xian="scope">
      <span>{{ scope.row.score_xian }}</span>
    </template>
  </StandardTable>

  <StandardTable1 :tableData="tableData"> </StandardTable1>
  <!-- 具名插槽(如果有多个插槽就要定名字了)并接收数据 -->
  <StandardTable1 :tableData="tableData1">
    <!-- 不支持 -->
    <!-- <template #default="scope">
      <span>{{ scope.row.score_xian }} 删除</span>
    </template> -->
  </StandardTable1>
</template>

<script setup lang="ts">
import StandardTable from "@/components/item-table/standard/StandardTable.vue";
import StandardTable1 from "@/components/item-table/standard/index.vue";
import { ElButton } from "element-plus";

const tableData = reactive({
  list: [],
  columns: [],
});
tableData.list = [
  {
    id: 1,
    score_xian: "443分",
    score_anhui: "482分",
    score_zhejiang: "488分",
    score_henan: "514分",
  },
];
// 多级表头
tableData.columns = [
  {
    id: 4,
    label: "2023年理科一批分数线",
    prop: "creFile",
    minWidth: "120px",
    multiHeader: true,
    list: [
      {
        id: 42,
        label: "河南",
        prop: "score_henan",
        minWidth: "180px",
        multiHeader: true,
        list: [
          { id: 42, label: "郑州", prop: "score_henan", minWidth: "180px" },
          { id: 42, label: "洛阳", prop: "score_henan", minWidth: "180px" },
        ],
      },
      { id: 42, label: "浙江", prop: "score_zhejiang", minWidth: "180px" },
      { id: 42, label: "安徽", prop: "score_anhui", minWidth: "180px" },
      {
        id: 41,
        label: "西安",
        prop: "score_xian",
        minWidth: "180px",
        slot: "score_xian",
      },
    ],
  },
  {
    id: 6,
    label: "操作",
    prop: "",
    slot: "default",
    // render(row){
    //   return h(ElButton,'删除')
    // },
    minWidth: "120px",
    fixed: "right",
  },
];

const tableData1 = {
  list: [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ],
  columns: [
    {
      id: "1",
      prop: "date",
      label: "date",
      minWidth: "120px",
    },
    {
      id: "2",
      prop: "name",
      label: "name",
      minWidth: "120px",
    },
    {
      id: "3",
      prop: "address",
      label: "address",
      minWidth: "120px",
    },
    {
      id: "4",
      slot: "default",
      label: "action",
      minWidth: "120px",
      render() {
        return h('div', [h(ElButton, 'button1'), h(ElButton, 'button1')]);
      },
      fixed: "right",
    },
  ],
};
</script>
