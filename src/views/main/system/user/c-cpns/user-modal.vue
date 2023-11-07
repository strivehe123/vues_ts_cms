<template>
  <div class="user-modal">
    <el-dialog
      v-model="isDialogVisible"
      :title="isNew ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form label-width="100px" :model="formData">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="isNew" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入电话号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/store/module/main'
import useSystemStore from '@/store/module/system'
import { storeToRefs } from 'pinia'
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments, entireRoles } = storeToRefs(mainStore)
// 组件向外暴露方法
defineExpose({ setIsDialogVisible })
const isDialogVisible = ref(false)
// 是否新建数据
const isNew = ref(true)
// 编辑的数据
const editData = ref()
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  departmentId: '',
  roleId: ''
})
// 设置模态框的显示为true
function setIsDialogVisible(isNewUser: boolean = true, itemData?: any) {
  isDialogVisible.value = true
  isNew.value = isNewUser
  if (!isNew.value && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
// 模态框点击确定
function handleConfirmClick() {
  isDialogVisible.value = false
  // 新建数据
  if (isNew.value === true) {
    systemStore.newUserAction(formData)
  } else {
    // 编辑用户
    systemStore.editUserAction(editData.value.id, formData)
  }
}
</script>
<style lang="less" type="scoped">
.user-modal {
  .form {
    padding: 0 20px;
  }
}
</style>
