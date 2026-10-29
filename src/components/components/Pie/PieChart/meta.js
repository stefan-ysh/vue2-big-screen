export default {
  group: '饼图',
  name: '标准饼图',
  icon: 'pie',
  componentName: 'PieChart',
  width: 400,
  height: 300,
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '[{"value":1048,"name":"搜索引擎"},{"value":735,"name":"直接访问"},{"value":580,"name":"邮件营销"},{"value":484,"name":"联盟广告"},{"value":300,"name":"视频广告"}]'
    },
    attribute: {
      title: '标准饼图',
      showTitle: true,
      titleHeight: 40,
      titleColor: '#a0c4ff',
      backgroundColor: 'rgba(12, 26, 60, 0.2)',
      borderColor: '#1D2C5E',
      textColor: '#ffffff',
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ]
        }
      ]
    }
  }
}
