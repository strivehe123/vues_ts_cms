import { defineStore } from 'pinia'
import { postUsersListData } from '@/service/module/system'
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
    }
  }
})
export default useSystemStore
