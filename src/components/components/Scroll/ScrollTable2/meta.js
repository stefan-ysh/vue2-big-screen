export default {
  group: '滚动信息',
  name: '滚动表格2',
  icon: 'scroll-table',
  componentName: 'ScrollTable2',
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '[{"name": "周口","age": 55,"birth":"1990-10-20"},{"name": "南阳","age": 120,"birth":"1998-11-20"},{"name": "西峡","age": 78,"birth":"1996-08-10"},{"name": "驻马店","age": 66,"birth":"1992-01-01"}]'
    },
    attribute: {
      showIndex: false,
      theadHeight: 80,
      theadBg: ['#00478F', '#0061C2'],
      theadColor: '#ff8c71',
      theadSize: 14,
      tbodyColor: '#ddd',
      tbodySize: 13,
      oddRowBg: '#7192ff',
      evenRowBg: '#436eff',
      showLine: 4,
      columns: [
        { colKey: 'name', title: '姓名', type: 'text', width: 0 },
        { colKey: 'age', title: '年龄', type: 'text', width: 0 },
        { colKey: 'birth', title: '出生日期', type: 'text', width: 0 }
      ]
    }
  }
}
