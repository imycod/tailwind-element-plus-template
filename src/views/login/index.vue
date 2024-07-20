<script setup lang="ts">
import useSignInConfig from './useSignInConfig.ts';

const route = useRoute();

const { getApplicationConfig } = useSignInConfig();
const code = route.query.source || route.query.applicationCode || 'pass';
const config = getApplicationConfig(code);

</script>

<template>
  <div class="overflow-auto bg-[var(--Seller-Item-Black-400,_#1B1C23)] contents">
    <div
        class="flex items-center justify-center h-screen bg-[radial-gradient(76.55%_50.7%_at_50%_96.53%,_rgba(116,_71,_208,_0.20)_0%,_rgba(0,_0,_0,_0.00)_100%)]"
    >
      <div class="flex flex-shrink flex-col gap-6 w-min-[424px]">
        <div class="flex flex-col justify-center items-center">
          <div class="flex items-center">
            <img
                :src="config.src"
                alt="logo"
                class="h-[40px] m-auto hidden dark:block"
            />
          </div>
          <div
              class="mt-3 self-stretch text-center text-[24px] font-medium bg-[linear-gradient(275deg,_#D4B3FF_17.56%,_#E3D7F4_35.54%,_#FFF_79.2%)] bg-clip-text font-sans not-italic leading-[40px]"
          >
            {{ $t('Sign in to', [config.text]) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>