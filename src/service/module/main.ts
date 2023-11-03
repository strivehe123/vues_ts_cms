import hyRequest from '../request'

// 获取角色列表
export function getEntireRoles() {
  return hyRequest.post({
    url: '/rolelist'
  })
}

// 获取部门列表
export function getEntireDepartments() {
  return hyRequest.post({
    url: '/departmentlist'
  })
}

// 获取菜单列表
export function getEntireMenus() {
  return hyRequest.post({
    url: '/menulist'
  })
}
