const searchConfig = {
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入查询部门名称',
      initialData: ''
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入查询部门领导名称'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
      initialData: []
    }
  ]
}

export default searchConfig
