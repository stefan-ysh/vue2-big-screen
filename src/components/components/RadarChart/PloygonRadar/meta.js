export default {
  group: '雷达图',
  name: '多边形雷达',
  icon: 'radar',
  componentName: 'PloygonRadarChart',
  props: {
    attribute: {
      titleVisible: true,
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
      // // todo 动态图例
      // legend: ['Allocated Budget', 'Actual Spending'],
      // 形状 ploygon circle
      shape: 'ploygon',
      // 分割段数
      splitNumber: 5,
      // 名称间隙
      splitLine: 'red',
      splitAreaColor: '#ffffff00',
      // 射线颜色
      axisLineColor: 'red',
      nameGap: 100,
      radiusInside: 20,
      radiusOutside: 50,
      areaOpacity: 1,
      areaColor: 'red',
      indicator: JSON.stringify([
        { name: 'Sales' },
        { name: 'Administration' },
        { name: 'Information Technology' },
        { name: 'Customer Support' },
        { name: 'Development' },
        { name: 'Marketing' }
      ]),
      // 指示器文字
      axisNameVisible: true,
      axisNameFontSize: 18,
      axisNameColor: 18,
      // 坐标数值
      axisLabelVisible: false,
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
      '[{"value":[144,122,233,211,134,231],"name":"Allocated Budget"},{"value":[432,234,123,213,233,231],"name":"Actual Spending"}]',
      dataSource: 1,
      pollTime: 0
    }
  }
}

