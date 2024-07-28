<script setup lang="ts">
import {useTable} from "@/hooks/useTable.ts";
import {getUsers} from "@/apis/user.ts";

const state = reactive({
  loading: false,
  isPage: true,
  pagination: {
    current: 1,
    total: 0,
    size: 10
  },
  props: {
    item: 'list',
    totalCount: 'total'
  },
  dataList: [],
  queryForm: {},
  pageList: getUsers,// someapi
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
        max-height="80vh"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="角色ID" width="100"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="role" label="角色编码"></el-table-column>
    </el-table>
    <el-pagination
        v-if="state.pagination.total"
        v-model:current-page="state.pagination.current"
        v-model:page-size="state.pagination.size"
        :page-sizes="[10, 30, 50, 100]"
        layout="sizes, prev, pager, next"
        :total="state.pagination.total"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
    />
  </div>
</template>

<style scoped lang="scss">
.item-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;

  .example-pagination-block {
    margin-top: 10px;
  }

  .example-demonstration {
    margin-bottom: 16px;
  }
}
</style>