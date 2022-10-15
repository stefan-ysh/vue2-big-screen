export default {
  group: '图表',
  name: '进度池',
  icon: 'percent-pond',
  componentName: 'PercentPond',
  width: 300,
  height: 100,
  props: {
    cptDataForm: {
      dataText: '{"value":66}',
      dataSource: 1,
      pollTime: 0
    },
    attribute: {
      borderWidth: 2,
      borderRadius: 4,
      borderGap: 3,
      lineWidth: 3,
      lineSpace: 2,
      localGradient: true,
      // colors: [
      //   '#01c4f9',
      //   '#c135ff'
      // ]
      color1: '#01c4f9',
      color2: '#c135ff'
    }
  }
}
