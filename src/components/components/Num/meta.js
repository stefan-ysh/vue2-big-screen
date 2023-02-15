export default {
  group: '文本',
  name: '数值文本',
  icon: 'num',
  componentName: 'BNum',
  width: 200,
  height: 80,
  props: {
    cptDataForm: {
      dataText: '{"value":"275.39","unit":"人"}',
      dataSource: 1,
      pollTime: 0,
      apiUrl: '/text',
      sql: 'select id from test limit 1',
    },
    attribute: {
      title: '总人数',
      numColor: '#32B0FF',
      numSize: 20,
      numHeight: 30
    }
  }
}
