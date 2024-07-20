<script setup lang="ts">
const form=reactive({
  newPassword:'',
  confirmPassword:''
})
function submit(){

}
</script>

<template>
  <el-form v-model="form" @submit.prevent="submit">
    <el-form-item label="New Password" label-width="150" prop="newPassword">
      <el-input v-model="form.newPassword" type="password"></el-input>
    </el-form-item>
    <el-form-item label="Confirm Password" label-width="150"  prop="confirmPassword">
      <el-input type="password" v-model="form.confirmPassword"></el-input>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>