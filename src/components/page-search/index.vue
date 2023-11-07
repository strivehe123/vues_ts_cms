<template>
  <div class="search" v-if="isQuery">
    <!-- 输入关键字搜索的表单 -->
    <el-form
      :model="searchForm"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
      ref="formRef"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input :placeholder="item.placeholder" v-model="searchForm[item.prop]" />
              </el-form-item>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </template>
            <template v-if="item.type === 'select'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </el-form-item>
            </template>
          </el-col>
        </template>
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
import usePermission from '@/hooks/usePermission'
import type { ElForm } from 'element-plus'
// 定义自定义事件 和 属性
interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
    labelWidth?: string
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()
const formRef = ref<InstanceType<typeof ElForm>>()
//
const isQuery = usePermission(`{props.searchConfig.pageName}:query`)
//定义form数据
const initialForm = {}
for (const key of props.searchConfig.formItems) {
  initialForm[key.prop] = key.initialData ?? ''
}

const searchForm = reactive(initialForm)
// 重置表单
const handleResetClick = () => {
  formRef.value?.resetFields()
  emit('resetClick')
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
