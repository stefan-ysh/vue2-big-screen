export default {
  group: '柱状图',
  name: '象形柱状图',
  icon: 'conical-column-chart',
  componentName: 'BarChart',
  props: {
    attribute: {
      backgroundColor: '',
      chartTitle: '标题一',
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
      dataText: '{"xData":"Mon,Tue,Wed,Thu,Fri,Sat,Sun","yData":"120,200,150,80,70,110,130"}',
      dataSource: 1,
      pollTime: 0
    }
  }
}
