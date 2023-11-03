import hyRequest from '../request'
import type { IAccount } from '@/types'

// 用户登录
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/account',
    data: account
  })
}
