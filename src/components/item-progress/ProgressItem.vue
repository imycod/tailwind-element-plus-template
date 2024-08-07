<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: "loading...",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  num: {
    type: Number,
    default: 0
  },
});

const getLangKey = (str) => {
  return str
      .toLowerCase() // 将字符串转换为小写
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase()) // 去除非字母和数字的字符，并将每个单词的首字母大写
      .replace(/[^a-zA-Z0-9]/g, ''); // 去除剩余的非字母和数字的字符
}
</script>

<template>
  <div class="mb-4 pl-4 border-l-4 border-black-50"
       :class="{'border-purple-500':active,'border-green-300':completed}">
    <div
        class="h-[4.25rem] border rounded-lg  border-black-50 px-6 py-4 flex flex-col justify-center text-[1.25rem]"
        :class="{'opacity-50':!completed && !active}">
      <span class="text-[10px] uppercase text-green-300 tracking-[1px]"
            v-if="completed">{{ $t('completed') }}</span>
      <span :class="{'opacity-50':!active}">{{ num }}. <span
          :class="{'line-through':completed}">{{ text }}</span></span>
      <!--          $t(`${getLangKey(text)}`)-->
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>