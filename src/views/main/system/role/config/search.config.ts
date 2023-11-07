const searchConfig = {
  pageName: 'role',
  labelWidth: '100px',
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入查询角色名称',
      initialData: ''
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
      initialData: []
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请选择查询状态',
      options: [
        { label: '启动', value: 1 },
        { label: '禁用', value: 0 }
      ],
      initialData: 1
    }
  ]
}

export default searchConfig
