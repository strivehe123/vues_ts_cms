<template>
  <div class="search">
    <!-- 输入关键字搜索的表单 -->
    <el-form :model="searchForm" label-width="80px" size="large" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入查询的用户名" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入查询的真实姓名" v-model="searchForm.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入查询的电话号码" v-model="searchForm.cellphone" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="用户状态" prop="enable">
            <el-select placeholder="请选择查询状态" style="width: 100%" v-model="searchForm.enable">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 重置和提交表单 -->
    <el-row :gutter="20">
      <el-col :span="6" :offset="18">
        <div>
          <el-button type="primary" icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button type="success" icon="Search" @click="handleQueryClick">查询</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
const formRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: []
})
// 重置表单
const handleResetClick = () => {
  formRef.value?.resetFields()
}
// 查询表单
const handleQueryClick = () => {
  emit('queryClick', searchForm)
}
</script>
<style lang="less" type="scoped">
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
  }
}
</style>
