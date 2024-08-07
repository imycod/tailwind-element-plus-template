<script setup lang="ts">
import { render } from 'vue';

defineOptions({
  name: 'ItemTable'
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: () => []
  },
  column: {
    type: Array,
    default: () => []
  },
  size: {
    type: String,
    default: 'small'
  },
  current: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  background: {
    type: Boolean,
    default: false
  },
  sizeChange: {
    type: Function,
    default: () => {
    }
  },
  currentChange: {
    type: Function,
    default: () => {
    }
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  }
})
const currentPage = defineModel('currentPage', {
  type: Number,
  default: 1
})
const pageSize = defineModel('pageSize', {
  type: Number,
  default: 10
})

// const emit = defineEmits(['update:currentPage','update:pageSize'])
// const currentPage = useVModel(props,'currentPage',emit)
// const pageSize = useVModel(props,'pageSize',emit)

const SlotComponent = {
  functional: true,
  render(h, ctx) {
    return ctx.props.slot(ctx.props.params)
  }
}
</script>

<template>
  <el-config-provider namespace="item">
    <div>
      <el-table class="item-custom-table" border :data="data">
        <el-table-column v-for="(item, index) in column" :type="item.type" :key="index" :prop="item.key"
          :label="item.title">
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[100, 200, 300, 400]"
        :disabled="disabled" :background="background" layout="sizes, prev, pager, next" :total="400"
        @size-change="sizeChange" @current-change="currentChange" />
    </div>
  </el-config-provider>
</template>

<style scoped lang="scss">
:deep(.item-table.item-table--border) {
  //border: 1px solid;
  //@apply border-gray-500 dark:border-black-100 rounded-lg;
  border: 1px solid red !important;

  td {
    //@apply dark:bg-black-400 border-b border-solid border-gray-500 dark:border-black-100;
  }

  &:after,
  .item-table__inner-wrapper::before {
    //@apply bg-gray-100 dark:bg-black-100;
  }

  & th.item-table__cell.is-leaf {
    height: 52px;
    //border-bottom: 1px solid;
    //@apply dark:bg-black-200 border-gray-500 dark:border-black-400;

    .cell {
      //@apply text-gray-400;
    }
  }

  .item-table__cell {
    //border-right: none;

    .cell {
      //@apply dark:text-white text-gray-500;
    }
  }
}
</style>