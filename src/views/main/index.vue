<template>
  <div class="main">
    <h2>main</h2>
    <h2>{{ counterStore.sum }}-{{ counterStore.dounleSum }}</h2>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import useCounterStore from '@/store/counter'
import { getEntireRoles } from '@/service//module/main'
const counterStore = useCounterStore()
</script>
<style lang="less" scoped></style>
