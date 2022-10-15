<template>
  <component
    :is="configProps.attribute.decorationType"
    :key="refreshFlagKey"
    :style="{ width: width + 'px', height: height + 'px', color: configProps.attribute.textColor, ...rotateDeg}"
    :color="[configProps.attribute.color1, configProps.attribute.color2]"
  >{{ configProps.attribute.text }}</component>
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Decoration',
  props: {
    width: Number,
    height: Number,
    rotateDeg: Object,
    configProps: Object
  },
  data () {
    return {
      refreshFlagKey: require('uuid').v1()
    }
  },
  watch: {
    configProps: {
      handler () {
        this.refreshFlagKey = require('uuid').v1()// 强制刷新视图
      },
      deep: true// 深度监听
    },
    width () {
      this.refreshFlagKey = require('uuid').v1()
    }
  }
}
</script>

<style scoped>

</style>
