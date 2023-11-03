import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service'
import { localCache } from '@/utils/cache'
import type { IAccount } from '@/types'
const useLoginStore = defineStore('login', {
  state: () => ({
    token: ''
  }),
  actions: {
    async loginAction(account: IAccount) {
      const res = await accountLoginRequest(account)
      this.token = res.data.token
      const id = res.data.id
      localCache.setCache('token', this.token)
    }
  }
})

export default useLoginStore
