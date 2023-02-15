export default {
  group: '滚动信息',
  name: '静态有序列表',
  icon: 'list',
  componentName: 'OList',
  width: 400,
  height: 300,
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '[{"value":100,"label":"小明"},{"value":68,"label":"小兰"},{"value":96,"label":"小红"}]'
    },
    attribute: {
      olBgColor: '#ffffff00',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      liHeight: 10,
      liBgColor: '#fff',
      fontSize: 15,
      textColor: '#000',
      textAlign: 'left',
      fontWeight: 'normal',
      listStyle: '',
      indexColor: 'red',
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0

      // borderType: 'dv-border-box-1',
      // borderColor1: '#409eff',
      // borderColor2: '#00CED1',
      // backgroundColor: 'rgba(0, 0, 0, 0)',
      // borderTitle: '标题1',
      // titleWidth: 250, // 样式11特殊配置
      // dur: 3,
      // reverse: false // 样式8特殊配置
    }
  }
}
