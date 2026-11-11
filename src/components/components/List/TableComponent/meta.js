export default {
  group: '表格',
  name: '数据表格',
  icon: 'list',
  componentName: 'TableComponent',
  width: 600,
  height: 300,
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '{"columns":[{"label":"排名","prop":"rank"},{"label":"名称","prop":"name"},{"label":"数值","prop":"value"},{"label":"增长率","prop":"growth"}],"data":[{"rank":1,"name":"华东","value":"12,345","growth":"+15%"},{"rank":2,"name":"华南","value":"9,876","growth":"+12%"},{"rank":3,"name":"华北","value":"7,654","growth":"+8%"},{"rank":4,"name":"西南","value":"5,432","growth":"+5%"}]}'
    },
    attribute: {
      title: '数据表格',
      showTitle: true,
      titleHeight: 40,
      rankHighlight: true,
      columns: [
        { label: '排名', prop: 'rank' },
        { label: '名称', prop: 'name' },
        { label: '数值', prop: 'value' },
        { label: '增长率', prop: 'growth' }
      ],
      data: [
        { rank: 1, name: '华东', value: '12,345', growth: '+15%' },
        { rank: 2, name: '华南', value: '9,876', growth: '+12%' },
        { rank: 3, name: '华北', value: '7,654', growth: '+8%' },
        { rank: 4, name: '西南', value: '5,432', growth: '+5%' }
      ],
      backgroundColor: 'rgba(12, 26, 60, 0.2)',
      borderColor: '#1D2C5E',
      textColor: '#ffffff',
      headerColor: '#a0c4ff',
      headerBgColor: 'rgba(16, 31, 68, 0.6)'
    }
  }
}
