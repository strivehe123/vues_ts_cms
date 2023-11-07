import { ref } from 'vue'
import type PageModal from '@/components/page-modal/index.vue'
type callFnType = (data?: any) => void
function usePageModal(newCallback?: callFnType, editCallback?: callFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setIsDialogVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setIsDialogVisible(false, itemData)
    // 如果传值 则回调该函数
    if (editCallback) editCallback(itemData)
  }
  return {
    modalRef,
    handleEditClick,
    handleNewClick
  }
}

export default usePageModal
