export default {
  group: '文本',
  name: '数值框',
  icon: 'rect-num',
  componentName: 'RectNum',
  width: 350,
  height: 100,
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText: '{"value":"1920"}'
    },
    attribute: {
      fontSize: 50,
      padding: 10,
      borderColor: '#22628D',
      bgColor: 'rgba(5,30,85,0.68)',
      color: '#7ca1d3'
    }
  }
}
