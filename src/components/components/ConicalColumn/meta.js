export default {
  group: '图表',
  name: '锥形柱图',
  icon: 'conical-column-chart',
  componentName: 'ConicalColumn',
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '[{"name":"火箭","value":55},{"name":"飞机","value":120},{"name":"高铁","value":71},{"name":"轮船","value":66},{"name":"汽车","value":80},{"name":"骑行","value":35},{"name":"跑步","value":15}]'
    },
    attribute: {
      fontSize: 15, // 显示行数
      columnColor: 'rgba(0, 194, 255, 0.4)',
      textColor: '#fff',
      img: [
        require('@/assets/images/1st.png'),
        require('@/assets/images/2nd.png'),
        require('@/assets/images/3rd.png'),
        require('@/assets/images/4th.png'),
        require('@/assets/images/5th.png'),
        require('@/assets/images/6th.png'),
        require('@/assets/images/7th.png')
      ],
      showValue: true,
      imgSideLength: 30
    }
  }
}
