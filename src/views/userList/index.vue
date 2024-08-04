<script setup lang="ts">
import { useTable } from "@/hooks/useTable.ts";
import { getUsers } from "@/apis/user.ts";

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
const { getDataList, currentChangeHandle, sizeChangeHandle, downBlobFile, tableStyle } = useTable(state)
const { getSchema, form } = useSearch()
const genderOptions = ref([])
const schema = computed(() => {
  let el = [{ type: 'input', name: 'username' }, { type: 'select', name: 'gender', options: genderOptions.value }, { type: 'input', name: 'cangku' }, { type: 'date', name: 'createTime' }, { type: 'select', name: 'who', options: [] }]
  return el.map(e => {
    console.log(getSchema(e));
    return getSchema(e)[0]
  })
})
function callback(type) {
  if (type === 'reset') {
    form.value = {}
    return
  }
  console.log(form.value);

}

onMounted(() => {
  setTimeout(() => {
    genderOptions.value = [
      { label: '男', value: '1' },
      { label: '女', value: '2' }
    ]
  }, 1000);
})

function handleSelectionChange(objs: { roleId: string }[]) {
}
</script>

<template>
  <div>
    <search :schema="schema" v-model="form" :callback="callback"></search>
    <div class="dark:border-b pb-2 dark:border-gray-800 dark:border-l dark:border-r dark:rounded-lg">
      <el-table :data="state.dataList" v-loading="state.loading" @selection-change="handleSelectionChange" border
        class="item-custom-table" max-height="80vh">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="角色ID" width="100"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="role" label="角色编码"></el-table-column>
      </el-table>
      <el-pagination v-if="state.pagination.total" v-model:current-page="state.pagination.current"
        v-model:page-size="state.pagination.size" :page-sizes="[10, 30, 50, 100]" layout="sizes, prev, pager, next"
        :total="state.pagination.total" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" />
    </div>
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