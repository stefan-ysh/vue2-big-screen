export default {
  group: '饼图',
  name: '玫瑰饼图',
  icon: 'pie',
  componentName: 'Pie',
  props: {
    attribute: {
      theme: 'light',
      chartTitle: '标题一',
      titleX: 40,
      titleY: 20,
      titleTextColor: '#ccc',
      subtext: '纯属虚构',
      subtextColor: '#aaa',
      titleFontSize: 18,
      orient: 'horizontal',
      legendTextColor: '#ddd',
      legendX: 'center',
      legendY: 'bottom',
      borderRadius: 0,
      radiusInside: 0,
      radiusOutside: 60,
      roseType: 'radius',
      legendShow: true,
      labelFontSize: 13,
      labelColor: '#ddd',
      legendFontSize: 12,
      labelPosition: 'outside',
      pieColor: ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#5470c6', '#ff8c71']
    },
    cptDataForm: {
      dataText:
        '[{"value":1048,"name":"搜索引擎"},{"value":735,"name":"直接访问"},{"value":580,"name":"邮件营销"},{"value":484,"name":"联盟广告"},{"value":300,"name":"视频广告"}]',
      dataSource: 1,
      pollTime: 0
    }
  }
}
