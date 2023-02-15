export default {
  group: '媒体',
  name: '视频',
  icon: 'video',
  componentName: 'BVideo',
  // 默认宽高，非必填
  // width: 300,
  // height: 200,
  props: {
    // cptDataForm: {
    // },
    attribute: {
      videoUrl:
        'https://static.jeecg.com/upload/test/test_mv02_1591931970511.mov',
      autoplay: true,
      isShowControls: true,
      isLoop: false
    }
  }
}
