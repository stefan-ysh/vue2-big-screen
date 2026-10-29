export default {
  group: '指标卡片',
  name: '数据卡片',
  icon: 'num',
  componentName: 'DataCard',
  width: 320,
  height: 160,
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText: '{"value":"126,560"}'
    },
    attribute: {
      title: '标题',
      value: '0',
      unit: '',
      prefix: '',
      growth: '',
      growthStatus: 'up',
      iconClass: '',
      backgroundColor: 'rgba(12, 26, 60, 0.7)',
      borderColor: '#1D2C5E',
      valueColor: '#ffffff',
      titleColor: '#a0c4ff'
    }
  }
}
