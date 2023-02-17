export default {
  name: '动态环图',
  icon: 'active-ring',
  componentName: 'ActiveRing',
  group: '饼图',
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '[{"name": "周口","value": 55},{"name": "南阳","value": 120},{"name": "西峡","value": 78},{"name": "驻马店","value": 66}]'
    },
    attribute: {
      lineWidth: 10,
      radius: 80,
      activeRadius: 60,
      showOriginValue: false,
      color: ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#5470c6', '#ff8c71']
    }
  }
}
