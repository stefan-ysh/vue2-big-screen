export default {
  group: '媒体',
  name: '轮播图',
  icon: 'carousel',
  componentName: 'Carousel',
  props: {
    attribute: {
      trigger: 'hover',
      autoplay: true,
      interval: 3000,
      arrow: 'hover', // 'always' 'hover' 'never'
      carouseltype: 'default', // '' or 'card'
      direction: 'horizontal',
      fit: 'contain',
      isPreviewable: true,
      imgUrls: [
        require('@/assets/images/249.png'),
        require('@/assets/images/20.png'),
        require('@/assets/images/257.png'),
        require('@/assets/images/252.png')
      ]
    }
  }
}
