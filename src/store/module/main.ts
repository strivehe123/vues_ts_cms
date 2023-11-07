import { defineStore } from 'pinia'
import { getEntireRoles, getEntireDepartments, getEntireMenus } from '@/service/module/main'
interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireDepartments: [],
    entireRoles: [],
    entireMenus: []
  }),
  actions: {
    // 获取部门和角色列表
    async fetchRoleDeparatData() {
      const departRes = await getEntireDepartments()
      const roleRes = await getEntireRoles()
      const menuRes = await getEntireMenus()
      this.entireDepartments = departRes.list
      this.entireRoles = roleRes.list
      this.entireMenus = menuRes.list
    }
  }
})
export default useMainStore
