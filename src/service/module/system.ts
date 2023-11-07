import hyRequest from '../request'

// 获取用户列表
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/userslist',
    data: queryInfo
  })
}
// 删除用户
export function deleteUser(id: string) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
// 创建用户
export function newUserData(userData: any) {
  return hyRequest.post({
    url: '/users',
    data: userData
  })
}

// 编辑用户
export function editUserData(id: string, userData: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userData
  })
}
// 针对页面的网络请求
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}list`,
    data: queryInfo
  })
}
export function deleetePageById(pageName: string, id: string) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: string, pageInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
