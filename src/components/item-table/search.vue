<script setup lang="ts">
import {Search} from "@element-plus/icons-vue"

const props = defineProps({
  schema: {
    type: Array,
    default: () => ([]),
    required: true,
  },
  callback: {
    type: Function,
    default: () => {
    },
  },
})

// form不能为null
const form = defineModel({
  type:Object,
  required: true,
  default: () => {
  }
})
watch(() => form.value, (newValue) => {
  if (newValue === null || newValue === undefined) {
    throw new Error('只能为响应式对象，不能为null和undefined')
  }
});

function initFormKey() {
  props.schema.forEach((item: any) => {
    if (item.name) {
      form.value[item.name] = ''
    }
  })
}

// const emits = defineEmits(['callback'])
function handleClick(type) {
  // emits('callback',type)
  props.callback(type)
}

onMounted(() => {
  initFormKey()
})
</script>

<template>
  <div class="bg-black-200 rounded-lg p-4 mt-8 mb-4">
    <p class="text-gray-300 text-xs mb-3">{{ $t('SEARCH BY') }}</p>
    <!-- 检索项 -->
    <el-form
        v-model="form"
        class="w-full items-center xl:lg:flex md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 xs:grid-cols-1 gap-x-2">
      <!-- 检索项 -->
      <template v-for="item in schema">
        <el-form-item class="w-full" :prop="item.name" v-if="item.type === 'input'">
          <el-input
              v-model="form[item.name]"
              v-bind="item"
          />
        </el-form-item>
        <el-form-item class="w-full" v-else-if="item.type === 'select'">
          <el-select
              v-model="form[item.name]"
              v-bind="item"
          >
            <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="w-full" v-else-if="item.type === 'date'">
          <el-date-picker
              :style="{width: item.width || '100%'}"
              v-model="form[item.name]"
              v-bind="item"
          />
        </el-form-item>
      </template>
      <!-- 搜索按钮 -->
      <el-form-item class="flex w-[500px]">
        <el-button class="search-icon w-[36px] rounded-lg" @click="handleClick('search')">
          <el-icon>
            <Search/>
          </el-icon>
        </el-button>
        <el-button class="search-icon w-[36px] rounded-lg" @click="handleClick('reset')">
          <el-icon>
            <Search/>
          </el-icon>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
</style>