<template>
  <div class="menu">
    <page-content :content-config="ContentConfig" />
  </div>
</template>
<script setup lang="ts">
import PageContent from '@/components/page-content/index.vue'

import ContentConfig from './config/content.config'
</script>
<style lang="less" type="scoped">
.menu {
}
</style>
