<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="30px">
        <component :is="isFold ? 'expand' : 'fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-breadcrumb />
      <header-info />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'

// 内部自定义事件
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
// 处理图标点击
const handleMenuIconClick = () => {
  isFold.value = !isFold.value
  // 向父组件传值
  emit('foldChange', isFold.value)
}
</script>
<style lang="less" type="scoped">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
  }
}
</style>
