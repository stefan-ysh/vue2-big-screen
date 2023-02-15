export default {
  group: '进度/占比',
  name: '水位图',
  icon: 'water-level',
  componentName: 'WaterLevel',
  width: 250,
  height: 150,
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText: '["55"]'
    },
    attribute: {
      // 形状rect/roundRect/round
      shape: 'rect',
      // colors: ['#1b6782'], // 水位图配色
      topColor: '#1b6782',
      bottomColor: '#1b6782',
      waveNum: 3, // 波浪数量
      waveHeight: 40, // 波浪高度
      waveOpacity: 0.4, // 波浪透明度
      formatter: '{value}%' // 信息格式化
    }
  }
}
