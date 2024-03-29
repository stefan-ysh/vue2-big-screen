export default {
  group: '柱状图',
  name: '堆叠柱状图',
  icon: 'conical-column-chart',
  componentName: 'StackBar',
  props: {
    attribute: {
      backgroundColor: '',
      chartTitle: '标题一',
      colors: ['red', 'yellow', 'blue'],
      titleLeft: 50,
      titleTop: 10,
      barDirection: 'vertical',
      titleTextColor: '#ccc',
      xAxisShow: true,
      yAxisShow: true,
      xLineShow: true,
      yLineShow: true,
      xLabelColor: '#ccc',
      xLineColor: '#ccc',
      yLabelColor: '#0bd124',
      yLineColor: '#ccc',
      yGridLineShow: false,
      yTickShow: true,
      xTickShow: true,
      legendVisible: true,
      legendLeft: 0,
      legnedTop: 0,
      barBgShow: false,
      barBgColor: 'rgba(180, 180, 180, 0.2)',
      barBorderRadius: 5,
      barLabelShow: true,
      barLabelColor: '#ff0',
      barLabelSize: 10,
      gradualColor: true,
      barColor: '#409eff',
      barColor1: '#e9a90a',
      barColor2: '#0bcfcf',
      barColor3: '#cc0ce6',
      barWidth: 18,
      barType: 'pictorialBar',
      xFontRotate: 0,
      barPath: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z'
    },
    cptDataForm: {
      dataText:
        '[{"name":"上衣", "第一季度": "500", "第二季度": "300"},{"name":"上衣", "第一季度": "200", "第二季度": "700"},{"name":"上衣", "第一季度": "600", "第二季度": "100"}]',
      dataSource: 1,
      pollTime: 0
    }
  }
}
