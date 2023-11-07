<template>
  <div class="user-content">
    <div class="header">
      <h2>{{ contentConfig.header?.title ?? '数据列表' }}</h2>
      <el-button type="primary" v-if="isCreate" @click="handleNewUserClick">{{
        contentConfig.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig?.childrenTree">
        <!-- <el-table-column type="selection" /> -->
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'dater'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  type="primary"
                  icon="edit"
                  text
                  v-if="isUpdate"
                  @click="handleEditClick(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  icon="delete"
                  text
                  v-if="isDelete"
                  @click="handleDeleteClick(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" hName="xixi"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7]"
        small
        layout="sizes, prev, pager, next, jumper,total"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/module/system'

import { formatUTC } from '@/utils/format'
import usePermission from '@/hooks/usePermission'
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()
defineExpose({ fetchPageListData })
const emit = defineEmits(['newClick', 'editClick'])
// 0 获取是否有对应的增删改查的权限
console.log(`${props.contentConfig.pageName}:query`)
const isQuery = usePermission(`${props.contentConfig.pageName}:query`)
const isCreate = usePermission(`${props.contentConfig.pageName}:create`)
const isUpdate = usePermission(`${props.contentConfig.pageName}:update`)
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`)
// 发起action 请求userlist的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()
// 获取usersList数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)
//

// 每页显示的条目改变
const handleSizeChange = () => {
  fetchPageListData()
}
// 页码改变
const handleCurrentChange = () => {
  fetchPageListData()
}
// 发送网络请求获取数据
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  // 1 获取 offset 和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  // 发送网络请求

  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}
// 编辑和删除的操作
function handleDeleteClick(row: any) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, row.id)
}
function handleEditClick(row: any) {
  emit('editClick', row)
}
// 新建用户
function handleNewUserClick() {
  emit('newClick')
}
// 监听systemStore中action的被执行
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
</script>
<style lang="less" type="scoped">
.user-content {
  padding: 15px;
  margin-top: 10px;
  background-color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .table {
    .el-table__cell {
      padding: 12px 0;
    }
    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
