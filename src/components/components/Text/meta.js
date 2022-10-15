export default {
  group: '文本',
  name: '文本框',
  icon: 'text',
  componentName: 'BText',
  width: 150,
  height: 40,
  props: {
    cptDataForm: {
      dataText: '{"value":"普通文本"}',
      dataSource: 1,
      pollTime: 0
    },
    attribute: {
      url: '',
      textColor: '#4BB344',
      textSize: 16,
      fontWeight: 'normal',
      textLineHeight: 30,
      textFamily: '微软雅黑',
      textAlign: 'center',
      fontStyle: 'normal',
      textDecoration: 'none',
      bgColor: 'rgba(255, 255, 255, 0)'
    }
  }
}
