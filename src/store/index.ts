import type { App } from 'vue/dist/vue.js'
import { createPinia } from 'pinia'
import useLoginStore from './login'
const pinia = createPinia()

function useRegisterRouter(app: App) {
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLocalCache()
}
export default useRegisterRouter
