import { defineStore } from 'pinia'
import {
  postUsersListData,
  deleteUser,
  newUserData,
  editUserData,
  postPageListData,
  deleetePageById,
  newPageData,
  editPageData
} from '@/service/module/system'
import useMainStore from './main'
import type { ISystemState } from './types'
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 获取用户列表
    async postUsersListAction(queryInfo: any) {
      const usersData = await postUsersListData(queryInfo)

      const { list, totalCount } = usersData
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    // 删除用户
    async deleteUserByIdAction(id: string) {
      // 删除数据
      const result = await deleteUser(id)
      //删除成功后 重新请求新的数据
      if (result.code === 0) {
        this.postUsersListAction({ offset: 0, size: 10 })
      }
    },
    // 创新新的用户
    async newUserAction(userInfo: any) {
      // 01 创建新的用户
      const res = await newUserData(userInfo)
      //  02 再重新发送请求用户列表
      if (res.code === 0) {
        this.postUsersListAction({ offset: 0, size: 10 })
      }
    },
    //修改用户
    async editUserAction(id: string, userData: any) {
      // 向服务器发送编辑用户的请求
      const res = await editUserData(id, userData)
      // 数据更新成功后  再次请求用户列表
      if (res.code === 0) {
        this.postUsersListAction({ offset: 0, size: 10 })
      }
    },
    //  针对页面数据的增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: string) {
      const res = await deleetePageById(pageName, id)
      // 删除成功后再次请求新的数据
      if (res.code === 0) {
        this.postPageListAction(pageName, { offset: 0, size: 10 })
      }
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const res = await newPageData(pageName, pageInfo)
      // 新建数据成功后  再次获取数据
      if (res.code === 0) {
        this.postPageListAction(pageName, { offset: 0, size: 10 })
        const mainStore = useMainStore()
        mainStore.fetchRoleDeparatData()
      }
    },
    async editPageDataAction(pageName: string, id: string, pageInfo: any) {
      const res = await editPageData(pageName, id, pageInfo)
      if (res.code === 0) {
        const mainStore = useMainStore()
        mainStore.fetchRoleDeparatData()
      }
    }
  }
})
export default useSystemStore
