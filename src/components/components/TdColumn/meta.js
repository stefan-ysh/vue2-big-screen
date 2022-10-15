export default {
  group: '图表',
  name: '立体柱图',
  icon: 'td-column',
  componentName: 'TdColumnChart',
  props: {
    attribute: {
      chartTitle: '标题一',
      titleLeft: 'center',
      titleTop: 10,
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
      gradualColor: true,
      barColor: '#017ebb',
      barColor1: '#017ebb',
      barColor2: '#06fbfe',
      barColor3: '#06fbfe',
      barWidth: 18,
      xFontRotate: 0
    },
    cptDataForm: {
      dataText:
        '{"xData":"Mon,Tue,Wed,Thu,Fri,Sat,Sun","yData":"320,302,120,100,540,123,345","yData2":"120,102,90,150,120,123,145","yData3": "320,302,120,100,540,123,345","yData4": "440,404,210,250,660,246,490"}',
      dataSource: 1,
      pollTime: 0
    }
  }
}
