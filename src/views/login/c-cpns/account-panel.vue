<template>
  <div class="account-panel">
    <el-form label-width="80px" :model="accountForm" :rules="rules" status-icon ref="formRef">
      <el-form-item label="用户名" prop="name" label-width="100px">
        <el-col :span="16">
          <el-input v-model="accountForm.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="100px">
        <el-col :span="16">
          <el-input v-model="accountForm.password" type="password" />
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login'
import { localCache } from '@/utils/cache'
const accountForm = reactive({
  name: localCache.getCache('login/name') ?? '',
  password: localCache.getCache('login/pwd') ?? ''
})
const rules: FormRules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const accountLoginHandle = (isRemberPassword = false) => {
  formRef.value?.validate((validated) => {
    if (validated) {
      const name = accountForm.name
      const password = accountForm.password
      loginStore.loginAction({ name, password }).then(() => {
        if (isRemberPassword) {
          localCache.setCache('login/name', name)
          localCache.setCache('login/pwd', password)
        } else {
          localCache.removeCache('login/name')
          localCache.removeCache('login/pwd')
        }
      })
    } else {
      ElMessage.error('Oops, this is a error message.')
    }
  })
}

defineExpose({
  accountLoginHandle
})
</script>
<style lang="less" scoped></style>
