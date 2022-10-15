export default {
  group: '装饰',
  name: '时钟',
  icon: 'clock',
  componentName: 'Clock',
  props: {
    attribute: {
      color: '#17d4fe',
      fontSize: 50,
      fontWeight: 'normal',
      fontFamily: '微软雅黑',
      textAlign: 'center',
      fontStyle: 'normal',
      textDecoration: 'none',
      letterSpace: 0,
      lineHeight: 50,
      animation: false,
      format: 'YYYY-MM-DD hh:mm:ss',
      am: false,
      isUpperCase: false,
      showWeek: false
    }
  }
}
