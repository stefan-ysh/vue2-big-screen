export default {
  group: '地图',
  name: '飞线图',
  icon: 'map-migrate',
  componentName: 'MapMigrate',
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '{"start":[116.4551,40.2539],"end":[{"name":"上海","value":95},{"name":"广州","value":90},{"name":"大连","value":80},{"name":"南宁","value":70},{"name":"南昌","value":60},{"name":"拉萨","value":50},{"name":"长春","value":40},{"name":"包头","value":30},{"name":"重庆","value":20},{"name":"乌鲁木齐","value":100}]}'
    },
    attribute: {
      titleText: '春运航班飞线图',
      seriesName: '迁徙top10',
      seriesColor: '#a6c84c',
      roam: false,
      titleLeft: 'center',
      titleTop: 10,
      period: 6,
      symbol: 'diamond',
      effectColor: '#fff',
      effectLoop: false,
      lineWidth: 0,
      symbolSize: 6,
      curveness: 0.2,
      subtext: '模拟数据',
      titleFontSize: 20,
      titleColor: '#ddd',
      subTitleColor: '#aaa',
      subTitleFontSize: 13
    }
  }
}
