<script setup lang="ts">
import useSignInConfig from "@/views/login/config.ts";

const {getApplicationConfig} = useSignInConfig();
const config = getApplicationConfig();
</script>

<template>
  <div class="logo-container">
    <div class="flex items-center">
      <img
          :src="config.src"
          alt="logo"
          class="h-[40px] m-auto hidden dark:block"
      />
    </div>
    <div class="title">
      {{ $t('Sign in to', [config.text]) }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  @apply flex flex-col justify-center items-center;
  .title {
    @apply mt-3 self-stretch text-center text-[24px] font-medium bg-[linear-gradient(275deg,_#D4B3FF_17.56%,_#E3D7F4_35.54%,_#FFF_79.2%)] bg-clip-text font-sans not-italic leading-[40px];
  }
}
</style>