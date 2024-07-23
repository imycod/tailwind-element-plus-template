<script setup lang="ts">
import useSignInConfig, {LOGIN_MAP} from "@/views/login/config.ts";
import {googleLogin as googleLoginApi} from "@/apis/login.ts"
import {loginWithGoogle} from "@/utils/third-party-login.ts";

const {getApplicationConfig} = useSignInConfig();
const config = getApplicationConfig();

function signUp() {

}

const route = useRoute()
// 第三方登录
const LOGIN_WITH_MAP = {
  GOOGLE: googleLogin
}

async function googleLogin() {
  loginWithGoogle()
      .then(googleLoginApi)
      .then(async result=>{
        if (result.success) {
          setToken({
            oAuthToken:result.oAuthToken,
            accessToken:result.accessToken,
          })
          const resAuth = await toAuth()
          if (resAuth){
            // resAuth.oAuthToken
            setSessionItem(tokenKey,result.accessToken)
            redirectTo('/')
          }
        }
      })
}

const loginWith = (key) => LOGIN_WITH_MAP[key]
</script>

<template>
  <!--    or -->
  <div class="flex items-center gap-1 text-gray-300 justify-center">
    <div class="bg-gray-300 h-[1px] w-full"></div>
    <div>{{ $t('OR') }}</div>
    <div class="bg-gray-300 h-[1px] w-full"></div>
  </div>
  <!--     sign up   -->
  <div class="flex justify-center">
    {{ $t('Don not have an account') }}
    <span
        class="text-customBlue cursor-pointer ml-[4px] dark:text-purple-300"
        @click="signUp"
    >
        {{ $t('Sign up') }}
    </span>
  </div>
  <!--    google    -->
  <div class="flex flex-col justify-center">
    <template v-for="key in Object.keys(LOGIN_MAP)">
      <button
          @click="loginWith(key)"
          class="flex flex-row w-full justify-center border border-text-gray-300 dark:border-white dark:text-white hover:bg-blue-700 hover:text-white py-2 px-4 text-[16px] font-medium rounded"
      >
        <img
            :src="LOGIN_MAP[key].img"
            :alt="LOGIN_MAP[key].name"
            class="w-6 h-6 mr-2"
        />
        {{ $t('Sign in with', [LOGIN_MAP[key].name]) }}
      </button>
    </template>
  </div>
  <!--  copyright -->
  <span class="text-center text-[12px] mt-5 justify-center">
    {{ $t('Copyright') }} © {{ config.text }} {{ new Date().getFullYear() }}
  </span>
</template>
