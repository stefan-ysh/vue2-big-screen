export default {
  group: '滚动信息',
  name: '滚动列表',
  icon: 'scroll-list',
  componentName: 'ScrollList',
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '[{"name":"周口","value":55},{"name":"南阳","value":120},{"name":"西峡","value":78},{"name":"驻马店","value":66},{"name":"新乡","value":80},{"name":"信阳","value":45},{"name":"漯河","value":29}]'
    },
    attribute: {
      data: [], // 表数据
      rowNum: 5, // 表行数
      waitTime: 2000, // 轮播时间间隔(ms)
      carousel: 'single', // 轮播方式'single'|'page'
      unit: '个', // 数值单位
      sort: true, // 自动排序
      valueFormatter: null // 数值格式化
    }
  }
}
