<template>
  <div class="user-content">
    <div class="header">
      <h2>用户列表</h2>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column type="selection" />
        <el-table-column align="center" prop="id" label="id" />
        <el-table-column align="center" prop="name" label="昵称" />
        <el-table-column align="center" prop="realname" label="真实名字" />
        <el-table-column align="center" prop="enable" label="状态">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button size="small" plain :type="scope.row.enable ? 'primary' : 'danger'">{{
              scope.row.enable ? '启用' : '禁用'
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cellphone" label="手机" />
        <el-table-column align="center" prop="departmentId" label="部门id" />
        <el-table-column align="center" prop="roleId" label="角色id" />
        <el-table-column align="center" prop="createAt" label="创建时间" width="200">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="修改时间" width="200">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              icon="edit"
              text
              @click="handleEditClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="delete"
              text
              @click="handleDeleteClick(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7]"
        small
        layout="sizes, prev, pager, next, jumper,total"
        :total="usersTotalCount"
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
defineExpose({ fetchUserListData })
const emit = defineEmits(['newClick', 'editClick'])
// 发起action 请求userlist的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()
// 获取usersList数据
const { usersList, usersTotalCount } = storeToRefs(systemStore)
//

// 每页显示的条目改变
const handleSizeChange = () => {
  fetchUserListData()
}
// 页码改变
const handleCurrentChange = () => {
  fetchUserListData()
}
// 发送网络请求获取数据
function fetchUserListData(formData: any = {}) {
  // 1 获取 offset 和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  // 发送网络请求

  systemStore.postUsersListAction(queryInfo)
}
// 编辑和删除的操作
function handleDeleteClick(row: any) {
  systemStore.deleteUserByIdAction(row.id)
}
function handleEditClick(row: any) {
  emit('editClick', row)
}
// 新建用户
function handleNewUserClick() {
  emit('newClick')
}
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
