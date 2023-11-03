<template>
  <div class="home">
    <h2 class="title">心同CMS管理系统</h2>
    <el-tabs type="border-card" stretch v-model="activeLogin">
      <el-tab-pane label="User" name="account">
        <template #label>
          <el-icon><User /></el-icon>
          <div class="text">账号登录</div>
        </template>
        <template #default>
          <account-panel ref="accountRef" />
        </template>
      </el-tab-pane>
      <el-tab-pane label="Config" name="phone">
        <template #label>
          <el-icon><Cellphone /></el-icon>
          <div class="text">手机登录</div>
        </template>
        <template #default>
          <phone-panel />
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="bottom">
      <el-checkbox v-model="isRemberPassword" label="记住密码" size="large" />
      <a href="#" class="a-password">忘记密码?</a>
    </div>
    <div class="login">
      <el-button type="primary" class="btn" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import AccountPanel from './account-panel.vue'
import PhonePanel from './phone-panel.vue'
const activeLogin = ref('account')
const isRemberPassword = ref(false)
const accountRef = ref<InstanceType<typeof AccountPanel>>()
const handleLogin = () => {
  // console.log(activeLogin.value)
  if (activeLogin.value === 'account') {
    accountRef.value?.accountLoginHandle()
  } else {
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 30%;
  transform: translateY(-50%);
  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .a-password {
      color: #409eff;
    }
  }
  .login {
    margin-top: 5px;
    width: 100%;
    .btn {
      width: 100%;
    }
  }
}
</style>
