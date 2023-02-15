export default {
  group: '媒体',
  name: '图片',
  icon: 'image',
  componentName: 'BImage',
  props: {
    attribute: {
      url: null,
      rotatable: false,
      rotateDuration: 2,
      fit: 'fill',
      preview: false
    }
  }
}
