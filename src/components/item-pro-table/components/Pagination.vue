<template>
  <div class="flex w-full justify-between items-center h-[50px] px-5">
    <div class="text-gray-400 text-sm">{{ pageable.totalCount }} Results</div>
    <div class="flex">
      <div class="flex items-center">
        <div class="relative text-white rounded-md inline-flex items-center px-3 py-2">
          <label for="select-dropdown" class="mr-3 text-sm font-bold">{{ $t('Show') }}:</label>
          <el-select
              v-model="pageable.pageSize"
              class="page-select mr-1"
              @change="handleSizeChange"
          >
            <el-option
                v-for="(item, index) in pageable.pageSizes"
                :key="index"
                :label="item"
                :value="item"
            />
          </el-select>
        </div>
      </div>
      <!-- 分页组件 -->
      <el-pagination
          :background="true"
          :current-page="pageable.currentPage"
          :page-size="pageable.pageSize"
          :page-sizes="pageable.pageSizes"
          :total="pageable.totalCount"
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:'Pagination'
})
interface Pageable {
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  totalCount: number;
}

interface PaginationProps {
  pageable: Pageable;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>
