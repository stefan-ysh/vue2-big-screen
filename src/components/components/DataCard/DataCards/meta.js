export default {
  group: '指标卡片',
  name: '数据卡片组',
  icon: 'num',
  componentName: 'DataCards',
  width: 800,
  height: 120,
  props: {
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText:
        '{"items":[{"title":"总销售额","value":"¥126,560","ratio":"+12.5%","icon":"money"},{"title":"新增用户","value":"1,856","ratio":"+6.2%","icon":"user"},{"title":"订单量","value":"8,526","ratio":"+8.5%","icon":"shopping"},{"title":"访问量","value":"156,285","ratio":"+15.8%","icon":"view"}]}'
    },
    attribute: {
      layout: 'horizontal',
      items: [
        { title: '总销售额', value: '¥126,560', ratio: '+12.5%', icon: 'money' },
        { title: '新增用户', value: '1,856', ratio: '+6.2%', icon: 'user' },
        { title: '订单量', value: '8,526', ratio: '+8.5%', icon: 'shopping' },
        { title: '访问量', value: '156,285', ratio: '+15.8%', icon: 'view' }
      ],
      backgroundColor: 'rgba(12, 26, 60, 0.7)',
      borderColor: '#1D2C5E',
      valueColor: '#ffffff',
      titleColor: '#a0c4ff'
    }
  }
}
