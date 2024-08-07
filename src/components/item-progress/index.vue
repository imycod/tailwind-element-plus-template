<script setup lang="ts">
import ProgressItem from "./ProgressItem.vue";

const props = defineProps({
  schema: {
    type: Array,
    default: () => {
      return []
    }
  },
  currentStep: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <progress-item v-for="(step,index) in schema" :key="step"
                 :text="step.title"
                 :num="index + 1"
                 :active="currentStep === index"
                 :completed="currentStep > index"/>
</template>

<style scoped lang="scss">

</style>