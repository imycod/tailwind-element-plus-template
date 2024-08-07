<script setup lang="tsx">
import {Delete, Check, Edit} from "@element-plus/icons-vue"
import ProTable from "@/components/item-pro-table/index.vue"
import {searchLogs} from "@/apis/logs.ts";
import ItemSearchForm from "@/components/item-search-form/index.vue";

const searchSchema = reactive([
  {type: "selection", fixed: "left", width: 70},
  {type: "sort", label: "Sort", width: 80},
  {type: "expand", label: "Expand", width: 85},
  {
    "prop": "companyTemplateId",
    "label": "用户姓名",
    "search": {"el": "input", "tooltip": "我是搜索提示", "order": 2,"key":"username",defaultValue:'xxx'},
    "isShow": true,
    "isSetting": true,
    "isFilterEnum": true
  }, {
    "prop": "companyTemplateName",
    "label": "性别",
    // "search": {"el": "select", "props": {"filterable": true}, "order": 3},
    // "fieldNames": {"label": "genderLabel", "value": "genderValue"},
    // "isShow": true,
    // "isSetting": true,
    // "isFilterEnum": true
  }, {
    "prop": "id",
    "label": "年龄",
    // "search": {
    //   "order": 4, // 自定义 search 显示内容
    //   render: ({searchParam}) => {
    //     return (
    //         <div class="flx-center flex">
    //           <el-input vModel_trim={searchParam.minAge} placeholder="最小年龄"/>
    //           <span class="mr10 ml10">-</span>
    //           <el-input vModel_trim={searchParam.maxAge} placeholder="最大年龄"/>
    //         </div>
    //     );
    //   }
    // },
    // "isShow": true,
    // "isSetting": true,
    // "isFilterEnum": true
  }, {
    "prop": "platformName",
    "label": "身份证号",
    // "search": {"el": "input", "order": 5},
    // "isShow": true,
    // "isSetting": true,
    // "isFilterEnum": true
  }, {
    "prop": "propertyName",
    "label": "用户状态",
    // "search": {"el": "tree-select", "props": {"filterable": true}, "order": 6},
    // "fieldNames": {"label": "userLabel", "value": "userStatus"},
    // "isShow": true,
    // "isSetting": true,
    // "isFilterEnum": true
  }, {
    "prop": "publishDatetime",
    "key": "publishDatetime",
    "label": "创建时间",
    "width": 180,
    // "search": {
    //   "el": "date-picker",
    //   "span": 2,
    //   "props": {"type": "datetimerange", "valueFormat": "YYYY-MM-DD HH:mm:ss"},
    //   "defaultValue": ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
    //   "order": 7
    // },
    // "isShow": true,
    // "isSetting": true,
    // "isFilterEnum": true
  }])
</script>

<template>
  <div>
    <!--    <item-search-form :columns="searchSchema" :searchParam="searchParam" :search="search" :reset="reset"-->
    <!--                      search-col="xl"></item-search-form>-->
    <ProTable
        ref="proTable"
        :columns="searchSchema"
        :requestApi="searchLogs"
    >
      <template #tableHeader="scope">
        <el-button text type="danger" :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">Delete
        </el-button>
      </template>
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <template #propertyName="{row,$index}">
        <el-input v-if="$index === 0" v-model="row['propertyName']"></el-input>
        {{row['propertyName']}}
      </template>
      <template #propertyNameHeader>
        <el-button type="primary">用户状态</el-button>
      </template>
      <template #operation="scope">
        <el-button type="primary" :icon="Edit" circle/>
        <el-button type="success" :icon="Check" circle/>
        <el-button type="danger" :icon="Delete" circle/>
      </template>
    </ProTable>
  </div>
</template>

<style scoped lang="scss">

</style>