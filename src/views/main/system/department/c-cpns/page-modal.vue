<template>
  <div class="user-modal">
    <el-dialog
      v-model="isDialogVisible"
      :title="isNew ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form label-width="100px" :model="formData">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导"></el-input>
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

import useSystemStore from '@/store/module/system.ts'

const systemStore = useSystemStore()

// 组件向外暴露方法
defineExpose({ setIsDialogVisible })
const isDialogVisible = ref(false)
// 是否新建数据
const isNew = ref(true)
// 编辑的数据
const editData = ref()
const formData = reactive({
  name: '',
  leader: '',
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
    systemStore.newPageDataAction('department', formData)
  } else {
    // 编辑用户
    systemStore.editPageDataAction('department', editData.value.id, formData)
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
