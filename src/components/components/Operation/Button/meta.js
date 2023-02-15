export default {
  group: '操作',
  name: '按钮',
  icon: 'button',
  componentName: 'BButton',
  width: 150,
  height: 50,
  props: {
    cptDataForm: {
      dataText: '{"value":"按钮2"}',
      dataSource: 1,
      pollTime: 0
    },
    attribute: {
      url: 'https://www.baidu.com',
      bgColor: '#409eff',
      textColor: '#fff',
      fontSize: '30',
      event: false,
      eType: 'url',
      eventList: [],
      radius: 6
    }
  }
}
