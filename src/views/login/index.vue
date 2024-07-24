<script setup lang="ts">
import type {ComponentSize, FormInstance, FormRules} from 'element-plus'
import useSignInConfig from './config.ts';
import {useDarkModeStore} from "@/stores/modules/dark-mode.ts";
import {useUserStoreHook} from "@/stores/modules/user.ts";
import Logo from "@/views/login/components/logo.vue";
import FooterContent from "@/views/login/components/footer.vue"

const route = useRoute();
// 登录页配置
const {getApplicationConfig} = useSignInConfig();
const config = getApplicationConfig();
// 初始化dark mode
useDarkModeStore()
// 表单
const form = reactive({
  username: '',
  password: '',
})

interface RuleForm {
  username: string
  password: string
}

const rules = reactive<FormRules<RuleForm>>({
  username: [
    {required: true, message: 'email is required', trigger: 'blur'},
  ],
  password: [
    {required: true, message: 'password is required', trigger: 'blur'},
  ],
})

const ruleFormRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const store = useUserStoreHook()
      store.loginByPassword(form)
          .then(store.authorize)
          .then(store.getUserInfo)
          .then(()=>{
            console.log('submit!')
            redirectTo('/')
          })
    } else {
      console.log('error submit!')
    }
  })
}

function forgotPassword() {

}
</script>

<template>
  <div class="login-container">
    <div class="wrapper">
      <div class="contain">
        <logo></logo>
        <el-form class="w-full" ref="ruleFormRef" @submit.prevent="submitForm(ruleFormRef)" :model="form" :rules="rules"
                 hide-required-asterisk>
          <el-form-item label-position="top" prop="username" label="Email">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label-position="top" prop="password" label="Password">
            <el-input type="password" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <a
                class="flex justify-end w-full text-purple-300 cursor-pointer text-xs"
                @click="forgotPassword"
            >
              {{ $t('Forgot Your Password') }}
            </a>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px">
            <el-button type="primary" native-type="submit" size="large" class="w-full">
              {{ $t('Sign In') }}
            </el-button>
          </el-form-item>
        </el-form>
        <footer-content/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  @apply overflow-auto bg-[var(--Seller-Item-Black-400,_#1B1C23)] h-[100vh];
  .wrapper {
    @apply flex items-center justify-center h-screen w-full;
    background-image: radial-gradient(76.55% 50.7% at 50% 96.53%, rgba(116, 71, 208, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%);

    .contain {
      @apply flex flex-shrink flex-col gap-6 min-w-[424px] overflow-hidden;
    }
  }
}
</style>