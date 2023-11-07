<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @queryClick="handleQueryClick"
      @resetClick="handleResetClick"
    />
    <page-content ref="contentRef" @newClick="handleNewClick" @editClick="handleEditClick" />
    <page-modal ref="modalRef" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import searchConfig from './config/search.config.ts'

const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()
// 处理子组件点击查询
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
// 处理子组件点击的重置
function handleResetClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
// 处理 新建按钮
function handleNewClick() {
  modalRef.value?.setIsDialogVisible()
}
// 处理 编辑按钮
function handleEditClick(itemData: any) {
  modalRef.value?.setIsDialogVisible(false, itemData)
}
</script>
<style lang="less" type="scoped"></style>
