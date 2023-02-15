<template>
  <div
    style="width: 100%; height: 100%; text-align: center"
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
      <el-carousel-item v-for="imgSrc in configProps.attribute.imgUrls" :key="imgSrc">
        <el-image
          style="width: 100%; height: 100%"
          :src="imgSrc"
          :fit="configProps.attribute.fit"
          :preview-src-list="configProps.attribute.isPreviewable ? [imgSrc] : []"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    height: { type: Number, default: 168 },
    configProps: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
