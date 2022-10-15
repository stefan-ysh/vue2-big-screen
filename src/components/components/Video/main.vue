<template>
  <div style="width: 100%; height: 100%">
    <video
      :src="configProps.attribute.videoUrl"
      :controls="configProps.attribute.isShowControls"
      :autoplay="configProps.attribute.autoplay"
      :loop="configProps.attribute.isLoop"
      style="width: 100%; height: 100%"
      :style="{ ...rotateDeg }"
    />
  </div>
</template>

<script>
export default {
  name: 'BVideo',
  props: {
    rotateDeg: { type: Object, default: () => {} },
    configProps: { type: Object, default: () => {} }
  }
}
</script>

<style></style>
