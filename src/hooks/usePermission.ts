import useLoginStore from '@/store/login'
import { storeToRefs } from 'pinia'

function usePermission(permissionID: string) {
  const loginStore = useLoginStore()
  const { permission } = storeToRefs(loginStore)
  return !!permission.value.find((item) => item.includes(permissionID))
}

export default usePermission
