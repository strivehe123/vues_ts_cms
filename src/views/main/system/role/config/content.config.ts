const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'normal', label: '角色id', prop: 'id', width: '150px' },
    { type: 'normal', label: '角色名称', prop: 'name' },
    { type: 'dater', label: '创建时间', prop: 'createAt' },
    { type: 'dater', label: '更改时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '160px' }
    // { type: 'custom', label: '上级部门', width: '160px', prop: 'id', slotName: 'parent' }
  ]
}
export default contentConfig
