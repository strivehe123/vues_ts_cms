<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
const contentRef = ref<InstanceType<typeof UserContent>>()
// 处理查询组件传递的参数
const handleQueryClick = (searchForm: any) => {
  contentRef.value?.fetchUserListData(searchForm)
}
// 重置后再次发送网络请求
const handleResetClick = () => {
  contentRef.value?.fetchUserListData()
}
// 模态框的处理
const modalRef = ref<InstanceType<typeof UserModal>>()
const handleNewClick = () => {
  modalRef.value?.setIsDialogVisible()
}
// 编辑用户
const handleEditClick = (row: any) => {
  modalRef.value?.setIsDialogVisible(false, row)
}
</script>

<style scoped>
.user {
}
</style>
