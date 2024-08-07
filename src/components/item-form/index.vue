<script setup lang="ts">

const props = defineProps({
  schema: {
    type: Array,
    default: () => ([]),
    required: true,
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
onMounted(() => {
  initFormKey()
})
</script>

<template>
  <el-form
      v-model="form"
      class="w-full items-center xl:lg:flex xl:lg:grid-cols-5 md:grid md:grid-cols-3 grid sm:grid-cols-2 xs:grid-cols-1 gap-x-2 gap-y-2">
    <!-- 检索项 -->
    <template v-for="item in schema">
<!--      <el-form-item class="w-full" v-if="item.type==='slot'">-->
<!--      </el-form-item>-->
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
    <slot name="action"></slot>
  </el-form>
</template>

<style scoped lang="scss">
.item-form-item{
  @apply mb-0;
}
</style>