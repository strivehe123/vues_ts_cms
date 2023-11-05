<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login'
const route = useRoute()
const menu = useLoginStore().menu
import { mapPathToBreadcrumb } from '@/utils/mapMenu'
const breadcrumbs = computed(() => mapPathToBreadcrumb(route.path, menu))
</script>
<style lang="less" type="scoped">
.bread-crumb {
}
</style>
