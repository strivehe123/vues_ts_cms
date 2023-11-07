import { ref } from 'vue'
import type PageContent from '@/components/page-content/index.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  // 处理子组件点击的重置
  function handleResetClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}
export default usePageContent
