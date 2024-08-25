<template>
    <el-button @click="step(1)">第一步</el-button>
    <el-button @click="step(2)">第二步</el-button>
    <el-button @click="step(3)">第三步</el-button>
    <item-search :schema="searchSchema" v-model="state.queryForm"></item-search>
    <item-table :schema="columnSchema" :data="state.dataList"></item-table>
    {{ columnSchema }}
</template>    

<script lang="ts" setup>
const searchSchema = ref([])
const columnSchema = ref([])

const { getSchema: getSearchSchema } = useSearch()
const state = reactive({
    dataList: [],
    queryForm: {},
})
const { getSchema: getColumnSchema } = useTable({})

function step(num: any) {
    switch (num) {
        case 1:
            columnSchema.value = getColumnSchema({
                columnKeys: ['name1']
            }).value
            break;
        case 2:
            columnSchema.value = getColumnSchema({
                columnKeys: ['name1', 'gender']
            }).value
            break;
        case 3:
            columnSchema.value = getColumnSchema({
                columnKeys: ['name1', 'gender', 'name2']
            }).value
            break;

        default:
            columnSchema.value = getColumnSchema({
                columnKeys: ['name1', 'gender', 'name2', 'hobbie', 'date']
            }).value
            break;
    }
}

step()
</script>