import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from '@/service'
import { localCache } from '@/utils/cache'
import { mapMenuToRoutes, mapMenusToPermissions } from '@/utils/mapMenu'
import type { IAccount } from '@/types'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import useMainStore from './module/main'
interface ILoginState {
  token: string
  userinfo: any
  menu: any[]
  permission: string[]
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userinfo: localCache.getCache('userinfo') ?? {},
    menu: localCache.getCache('menu') ?? [],
    permission: []
  }),
  actions: {
    async loginAction(account: IAccount) {
      // 1 获取token
      const res = await accountLoginRequest(account)
      this.token = res.data.token
      const id = res.data.id
      // 2.1 获取用户信息
      const userInfoResult = await getUserInfoById(id)
      const userinfo = userInfoResult.data
      this.userinfo = userinfo
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 2.2 根据用户 roleId 获取用户的菜单信息

      const roleId = userinfo.role.id
      const menuResult = await getUserMenuByRoleId(roleId)
      const menuData = menuResult.data
      this.menu = menuData
      // 3 保存token, userinfo, menu 到 浏览器缓存

      localCache.setCache('userinfo', userinfo)
      localCache.setCache('menu', menuData)
      // 4 获取全部的部门和角色
      const mainStore = useMainStore()
      mainStore.fetchRoleDeparatData()
      // 5 获取用户登录后 所有按钮的权限
      const permissions = mapMenusToPermissions(menuData)
      this.permission = permissions
      // 6 动态添加路由
      const routes = mapMenuToRoutes(menuData)
      routes.forEach((route) => router.addRoute('main', route))
      // 7 页面跳转
      router.push('/main')
    },
    loadLocalCache() {
      const token = localCache.getCache(LOGIN_TOKEN) ?? ''
      const userinfo = localCache.getCache('userinfo') ?? {}
      const menu = localCache.getCache('menu') ?? []
      if (token && userinfo && menu) {
        this.token = token
        this.userinfo = userinfo
        this.menu = menu
        // 获取所有的部门和角色
        const mainStore = useMainStore()
        mainStore.fetchRoleDeparatData()
        // 5 获取用户登录后 所有按钮的权限
        const permissions = mapMenusToPermissions(menu)
        this.permission = permissions
        // 动态添加路由
        const routes = mapMenuToRoutes(menu)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
