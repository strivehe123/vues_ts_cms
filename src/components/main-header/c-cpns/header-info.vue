<template>
  <div class="header-info">
    <!-- 小图标 列表 -->
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span
        ><el-icon><Bell /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatLineSquare /></el-icon>
      </span>
    </div>
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="user-info">
        <el-avatar
          :size="30"
          src="https://cdn.zzdaye.com:8443/images/a/d/e/adeed000-06c3-11ea-99b3-0d9017a2d243.jpg"
        />
        <span class="name">coderwhy</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><CircleClose /></el-icon>
            <span>退出系统</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><InfoFilled /></el-icon>
            <span>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Lock /></el-icon>
            <span>修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
const router = useRouter()
// 退出登录
const handleExitClick = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>
<style lang="less" type="scoped">
.user-info {
  cursor: pointer;

  display: flex;
  align-items: center;
  :global(.el-dropdown-menu__item) {
    line-height: 36px;
  }
}
.header-info {
  display: flex;
  align-items: center;
  .operation {
    display: inline-flex;
    margin-right: 10px;
    > span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;
      &:hover {
        background: #f2f2f2;
      }
      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        height: 6px;
        width: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
}
</style>
