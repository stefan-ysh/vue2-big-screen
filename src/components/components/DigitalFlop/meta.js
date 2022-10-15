export default {
  group: '文本',
  name: '数字翻牌器',
  icon: 'digital-flop',
  componentName: 'DigitalFlop',
  width: 256,
  height: 80,
  props: {
    cptDataForm: {
      dataText: '{"value":"29999,333"}',
      dataSource: 1,
      pollTime: 0
    },
    attribute: {
      content: '{nt}个{nt}元',
      toFixedNum: 2,
      textAlign: 'center',
      rowGap: 30,
      style: {
        fontSize: 30,
        fill: '#3de7c9'
      }
    }
  }
}
