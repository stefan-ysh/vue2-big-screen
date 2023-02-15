export default {
  group: '媒体',
  name: '音频',
  icon: 'audio',
  hidden: true,
  componentName: 'BAudio',
  props: {
    attribute: {
      audioSrc: 'Bottle',
      fontSize: 200,
      isLoop: false,
      color: '#fff',
      playCondition: [
        {
          compareStyle: '',
          target: ''
        }
      ]
    },
    cptDataForm: {
      dataSource: 1,
      pollTime: 0,
      dataText: '{"value":50}'
    }
  }
}
