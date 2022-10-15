export default {
  group: '图表',
  name: '雷达图',
  icon: 'radar',
  componentName: 'RadarChart',
  props: {
    attribute: {
      // 标题
      chartTitle: '基础雷达图',
      titleTextColor: 'red',
      titleTextFontSize: 20,
      titleX: 0,
      titleY: 0,
      titleFontSize: 10,
      subtext: '副标题',
      subTitleFontSize: 20,
      subTitleColor: 'blue',
      // todo 动态图例
      legend: ['Allocated Budget', 'Actual Spending'],
      // 形状 ploygon circle
      shape: 'circle',
      // 分割段数
      splitNumber: 5,
      // 名称间隙
      nameGap: 100,
      radiusInside: 20,
      radiusOutside: 50,
      indicator: JSON.stringify([
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
      ]),
      pieColor: [
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#5470c6',
        '#ff8c71'
      ]
    },
    cptDataForm: {
      dataText:
      '[{"value":[4200,3000,20000,35000,50000,18000],"name":"Allocated Budget"},{"value":[5000,14000,28000,26000,42000,21000],"name":"Actual Spending"}]',
      dataSource: 1,
      pollTime: 0
    }
  }
}
