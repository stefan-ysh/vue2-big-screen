<template>
  <div style="width: 100%; height: 100%">
    <!-- <el-image
      :class="{'rotate-item': configProps.attribute.rotatable }"
      style=""
      :style="{ ...rotateDeg }"
      :preview-src-list="configProps.attribute.preview ? [configProps.attribute.url] : []"
      :src="
        configProps.attribute.url
          ? uploadUrl + configProps.attribute.url
          : require('@/assets/logo/logo.png')
      "
      :fit="configProps.attribute.fit"
    /> -->
    <el-image
      :class="{ 'rotate-item': configProps.attribute.rotatable }"
      style=""
      :style="{
        'animation-duration': configProps.attribute.rotateDuration + 's',
        ...rotateDeg,
      }"
      :preview-src-list="
        configProps.attribute.preview ? [configProps.attribute.url] : []
      "
      :src="
        configProps.attribute.url
          ? configProps.attribute.url
          : require('@/assets/logo/logo.png')
      "
      :fit="configProps.attribute.fit"
    />
  </div>
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
export default {
  name: 'BImage',
  props: {
    configProps: { type: Object, default: () => {} },
    rotateDeg: { type: Object, default: () => {} }
  },
  data() {
    return {
      // todo 文件上传url
      uploadUrl: 'example/upload',
    }
  },
}
</script>

<style scoped lang="less">
.el-image {
  width: 100%;
  height: 100%;
}
.rotate-item {
  animation: rot 2s linear infinite;
}
@keyframes rot {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
