export default {
  group: '装饰',
  name: '边框',
  icon: 'border',
  componentName: 'Border',
  width: 400,
  height: 300,
  props: {
    attribute: {
      borderType: 'dv-border-box-1',
      borderColor1: '#409eff',
      borderColor2: '#00CED1',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderTitle: '标题1',
      titleWidth: 250, // 样式11特殊配置
      dur: 3,
      reverse: false // 样式8特殊配置
    }
  }
}
