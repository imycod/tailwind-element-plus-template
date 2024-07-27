<script setup lang="ts">
import {useTable} from "@/hooks/useTable.ts";

const state = reactive({
  loading: false,
  dataList: [
      {
        roleId: '1',
        roleName: '管理员',
        roleCode: 'admin'
      },
      {
        roleId: '2',
        roleName: '普通用户',
        roleCode: 'user'
      }
  ],
  queryForm: {},
  pageList: () => null,// someapi
  descs: ['create_time'],
})
const {getDataList, currentChangeHandle, sizeChangeHandle, downBlobFile, tableStyle} = useTable(state)

function handleSelectionChange(objs: { roleId: string }[]) {
}

// 清空搜索条件
const resetQuery = () => {

};
</script>

<template>
  <div>
    <el-table
        :data="state.dataList"
        v-loading="state.loading"
        @selection-change="handleSelectionChange"
        border
        class="item-custom-table"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="roleId" label="角色ID" width="100"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleCode" label="角色编码"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">

</style>