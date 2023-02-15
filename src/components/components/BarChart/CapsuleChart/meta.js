export default {
  group: '柱状图',
  name: '胶囊图',
  icon: 'td-column',
  componentName: 'CapsuleChart',
  props: {
    attribute: {
      chartTitle: '胶囊图',
      titleShow: true,
      titleTextColor: '#000',
      titleLeft: 0,
      titleTop: 0,
      titleFontSize: 16,
      bgColor: '#08254F00',
      // 指示器类型,可选'line','shadow','cross'
      axisPointerType: 'line',
      xAxisShow: true,
      yAxisShow: true,
      // x 网格线
      xSplitLine: false,
      // y 网格线
      ySplitLine: false,
      // x 坐标刻度线
      xAxisTick: false,
      // y 坐标刻度线
      yAxisTick: false,
      // x 坐标轴轴线
      xAxisLine: false,
      // y 坐标轴轴线
      yAxisLine: false,
      // x 坐标轴文字颜色
      xLabelColor: '#fff',
      // y 坐标轴文字颜色
      yLabelColor: '#fff',
      xFontRotate: 16,
      yFontRotate: 16,
      // x 坐标轴线颜色
      xAxisLineColor: '#fff',
      // y 坐标轴线颜色
      yAxisLineColor: '#fff',
      // 是否显示柱体背景
      showBackground: true,
      // 胶囊背景色
      capsuleBgColor: '#091A6399',
      // 胶囊背景圆角
      capsuleBgRadius: 50,
      // 背景宽度
      // bgBarWidth: 16,
      // 胶囊圆角
      capsuleRadius: 50,
      // 胶囊宽度
      barWidth: 16,
      // 胶囊和背景图间距
      barGap: '-100%',
      // 最大值
      maxVal: 500
    },
    cptDataForm: {
      dataText: '{"xData":"基础性,组织性,规范性,引领性,凝聚性,纪律性","yData":"320,302,120,100,540,123"}',
      dataSource: 1,
      pollTime: 0
    }
  }
}
