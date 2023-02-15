<template>
  <div
    style="width: 100%; height: 100%; text-align: center"
    :style="{ ...rotateDeg }"
  >
    <el-carousel
      :type="configProps.attribute.carouseltype"
      :autoplay="configProps.attribute.autoplay"
      :interval="configProps.attribute.interval"
      :direction="configProps.attribute.direction"
      :arrow="configProps.attribute.arrow"
      :indicator-position="'outer'"
      :height="height + 'px'"
      :trigger="configProps.attribute.trigger"
    >
      <el-carousel-item
        v-for="item in configProps.attribute.imgUrls"
        :key="item"
      >
        <el-image
          style="width: 100%; height: 100%"
          :src="item"
          :fit="configProps.attribute.fit"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Carousel',
  props: {
    height: { type: Number, default: 168 },
    rotateDeg: {
      type: Object,
      default: () => {}
    },
    configProps: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
