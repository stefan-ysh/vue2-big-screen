export default {
  group: '操作',
  name: '单选项',
  icon: 'radio',
  componentName: 'BRadio',
  width: 200,
  height: 50,
  props: {
    cptDataForm: {
      dataText: JSON.stringify([
        { value: '2022-08', label: '8月' },
        { value: '2022-09', label: '9月' }
      ]),
      dataSource: 1,
      pollTime: 0
    },
    attribute: {
      defaultValue: '',
      border: false,
      size: 'mini',
      disabled: false,
      type: 'radio',
      // 按钮类型生效
      textColor: '#ffffff',
      fill: '#409EFF',
      // 文字大小
      fontSize: 30,
      // 字体对齐方式
      textAlign: 'center',
      // 间隙
      gap: 0,
      // 事件开关
      event: false,
      // cpt or params
      eType: 'cpt',
      // eType === 'cpt'
      eventList: [],
      // eType === 'params'
      paramsList: []
    }
  }
}
