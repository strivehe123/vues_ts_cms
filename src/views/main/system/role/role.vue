<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @queryClick="handleQueryClick"
      @resetClick="handleResetClick"
    />
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @newClick="handleNewClick"
      @editClick="handleEditClick"
    >
      <template #parent="scope">fuck {{ scope.row[scope.prop] }} {{ scope.hName }}</template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" :other-info="otherInfo" ref="modalRef">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import PageSearch from '@/components/page-search/index.vue'
import PageContent from '@/components/page-content/index.vue'
import PageModal from '@/components/page-modal/index.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/module/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import type { ElTree } from 'element-plus'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(newCallback, editCallBack)
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const roles = mainStore.entireRoles.map((item) => {
    return { label: item.name, value: item.id }
  })

  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...roles)
    }
  })
  return modalConfig
})
// 处理树形组件点击事件
function handleElTreeCheck(_, data) {
  const menuList = [...data.checkedKeys, ...data.halfCheckedKeys]
  otherInfo.value = { menuList }
}
// 传递个useEdit hooks的回调
function editCallBack(itemData: any) {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(itemData.menuList)
  })
}
//
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
</script>
<style lang="less" type="scoped"></style>
