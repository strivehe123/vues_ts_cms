interface IFormItems {
  type: string
  label?: string
  prop?: string
  placeholder?: string
  initialValue?: string
  options?: any[]
  slotName?: string
}
interface IModalConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: IFormItems[]
}
const modalConfig: IModalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称',
      initialValue: 'sakula'
    },
    { type: 'input', label: '角色描述', prop: 'desc', placeholder: '请输入角色描述' },
    {
      type: 'select',
      label: '父权限',
      prop: 'parentId',
      placeholder: '请选择父权限',
      options: []
    },
    {
      type: 'custom',
      slotName: 'menuList'
    }
  ]
}

export default modalConfig
