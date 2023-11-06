import hyRequest from '../request'

// 获取用户列表
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/userslist',
    data: queryInfo
  })
}
