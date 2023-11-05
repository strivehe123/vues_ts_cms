<template>
  <div class="main">
    <el-container>
      <el-aside :width="isFold ? '58px' : '240px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import MainMenu from '@/components/main-menu/index.vue'
import MainHeader from '@/components/main-header/index.vue'
const isFold = ref(false)
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag
}
</script>
<style lang="less" scoped>
.main {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: bisque;
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: center;
      cursor: pointer;
      background-color: #001529;
      transition: width 800 ease-in;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-header {
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
