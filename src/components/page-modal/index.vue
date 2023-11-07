<template>
  <div class="user-modal">
    <el-dialog
      v-model="isDialogVisible"
      :title="isNew ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form label-width="100px" :model="formData">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input :placeholder="item.placeholder" v-model="formData[item.prop]" />
              </el-form-item>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </template>
            <template v-if="item.type === 'select'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </el-form-item>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </template>
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

import useSystemStore from '@/store/module/system'

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

const systemStore = useSystemStore()

// 组件向外暴露方法
defineExpose({ setIsDialogVisible })
const isDialogVisible = ref(false)
// 是否新建数据
const isNew = ref(true)
// 编辑的数据
const editData = ref()
// 初始化formData
const initialData = {}
for (const item of props.modalConfig.formItems) {
  if (initialData[item.prop]) {
    initialData[item.prop] = item?.initailValue ?? ''
  }
}
const formData = reactive<any>(initialData)
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
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item?.initialValue : ''
    }
    editData.value = null
  }
}
// 模态框点击确定
function handleConfirmClick() {
  isDialogVisible.value = false
  // 最终提交的数据
  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...formData, ...props.otherInfo }
  }
  // 新建数据
  if (isNew.value === true) {
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  } else {
    // 编辑用户
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
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
