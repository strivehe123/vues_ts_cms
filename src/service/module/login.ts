import hyRequest from '../request'
import type { IAccount } from '@/types'

// 用户登录
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/account',
    data: account
  })
}
// 获取用户的角色信息  根据用户id
export function getUserInfoById(id: string) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

// 根据 用户角色ID 获取用户的菜单信息
export function getUserMenuByRoleId(id: string) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
