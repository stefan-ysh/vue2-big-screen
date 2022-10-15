export default {
  group: '图表',
  name: '胶囊图',
  icon: 'capsule-column',
  componentName: 'CapsuleColumn',
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText: '[{"name":"火箭","value":55},{"name":"飞机","value":120},{"name":"高铁","value":71},{"name":"轮船","value":66},{"name":"汽车","value":80},{"name":"骑行","value":35},{"name":"跑步","value":15}]'
    },
    attribute: {
      unit: '人',
      colors: [],
      showValue: true
    }
  }
}
