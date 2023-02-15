export default {
  group: '操作',
  name: '下拉框',
  icon: 'button',
  componentName: 'BSelect',
  width: 150,
  height: 50,
  props: {
    cptDataForm: {
      dataText:
        '[{"value":"2021","label":"2021年"},{"value":"2022","label":"2022年" }]',
      dataSource: 1,
      pollTime: 0
    },
    attribute: {
      radioValue: '',
      placeholder: '请选择',
      textColor: '#fff',
      fontSize: 15,
      fontWeight: 'normal',
      event: false,
      eType: 'cpt',
      // eType === 'cpt'
      eventList: [],
      // eType === 'params'
      paramsList: []
    }
  }
}
