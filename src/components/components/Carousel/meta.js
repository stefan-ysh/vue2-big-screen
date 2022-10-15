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
      fit: 'none',
      imgUrls: [
        require('@/assets/images/1st.png'),
        require('@/assets/images/2nd.png'),
        require('@/assets/images/3rd.png'),
        require('@/assets/images/4th.png'),
        require('@/assets/images/5th.png'),
        require('@/assets/images/6th.png'),
        require('@/assets/images/7th.png')
      ]
    }
  }
}
