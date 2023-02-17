<template>
  <component
    :is="configProps.attribute.borderType"
    :style="{ width: width + 'px', height: height + 'px' }"
    :color="[configProps.attribute.borderColor1, configProps.attribute.borderColor2]"
    :backgroundColor="configProps.attribute.backgroundColor"
    :title="configProps.attribute.borderTitle"
    :titleWidth="configProps.attribute.titleWidth"
    :dur="configProps.attribute.dur"
    :reverse="configProps.attribute.reverse"
  />
  <!--  默认宽高为100%（http://datav.jiaminghi.com/guide/borderBox.html），会出现滚动条常驻现象 -->
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
export default {
  name: 'Border',
  props: {
    width: Number,
    height: Number,
    configProps: Object
  },
  data() {
    return {}
  }
}
</script>

<style scoped></style>
