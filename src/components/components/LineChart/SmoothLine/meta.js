export default {
  group: '折线图',
  name: '平滑线图',
  icon: 'smooth-line-chart',
  componentName: 'LineChart',
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText: '{"xData":"Mon,Tue,Wed,Thu,Fri,Sat,Sun","yData":"120,200,150,80,70,110,130"}'
    },
    attribute: {
      title: '一天用电量分布',
      subtext: '纯属虚构',
      titleLeft: 'center',
      titleTop: 10,
      subtextColor: '#aaa',
      yTickShow: true,
      yGridLineShow: false,
      xLineShow: true,
      yLineShow: true,
      xTickShow: true,
      xLabelShow: true,
      yLabelShow: true,
      lineColor: '#409eff',
      xLabelColor: '#eee',
      xLineColor: '#eee',
      titleTextColor: '#ccc',
      yLabelColor: '#eee',
      yLineColor: '#eee',
      smooth: true,
      showSymbol: true,
      areaColor1: 'rgba(80,141,255,0.39)',
      areaColor2: 'rgba(56,155,255,0.25)',
      areaColor3: 'rgba(38,197,254,0.00)'
    }
  }
}
