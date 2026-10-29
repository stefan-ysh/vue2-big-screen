export default {
  group: '地图',
  name: '地图模板',
  icon: 'map-gc',
  componentName: 'MapVisualizationTemplate',
  width: 600,
  height: 400,
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '[{"name":"南海诸岛","value":0},{"name":"北京","value":54},{"name":"上海","value":40},{"name":"广东","value":98},{"name":"湖北","value":152},{"name":"浙江","value":104},{"name":"四川","value":44}]'
    },
    attribute: {
      title: '地图可视化',
      showTitle: true,
      titleHeight: 40,
      titleColor: '#a0c4ff',
      mapType: 'MapGc',
      backgroundColor: 'rgba(12, 26, 60, 0.2)',
      borderColor: '#1D2C5E',
      mapConfig: {
        map: 'china',
        roam: false,
        titleText: '',
        titleLeft: 'center',
        titleTop: 10,
        seriesName: '区域数据',
        geoLabelColor: '#555',
        geoLabelSize: 14
      }
    }
  }
}
