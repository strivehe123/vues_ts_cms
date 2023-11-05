<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/elephant.png" alt="" />
      <div class="title" v-show="!isFold">鸿源管理系统</div>
    </div>
    <div class="menu">
      <el-menu
        active-text-color="#fff"
        text-color="#b7bdc3"
        background-color="#001529"
        :collapse="isFold ? true : false"
        :collapse-transition="false"
        :default-active="defaultActive"
      >
        <template v-for="item in menu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><component :is="item.icon.split('-icon-')[1]" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="sub_item in item.children" :key="sub_item.id">
              <el-menu-item :index="sub_item.id + ''" @click="handleItemClick(sub_item)">{{
                sub_item.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import useLoginStore from '@/store/login'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/mapMenu'
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const loginStore = useLoginStore()
const menu = loginStore.menu
const router = useRouter()
const handleItemClick = (item: any) => {
  router.push(item.url)
}
// 默认选中菜单
const route = useRoute()

const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, menu)
  return pathMenu.id + ''
})
</script>
<style lang="less" type="scoped">
.main-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 12px 10px 8px 10px;
    overflow: hidden;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .el-menu-item:hover {
    color: #fff;
  }
  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
