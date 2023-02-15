<template>
  <component
    :is="configProps.attribute.decorationType"
    v-if="isDataV"
    :key="refreshFlagKey"
    :style="{ width: width + 'px', height: height + 'px', color: configProps.attribute.textColor}"
    :color="[configProps.attribute.color1, configProps.attribute.color2]"
  >{{ configProps.attribute.text }}</component>
  <div v-else :style="{ width }" class="custom-decoration" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
export default {
  name: 'Decoration',
  props: {
    width: Number,
    height: Number,
    configProps: Object
  },
  data() {
    return {
      refreshFlagKey: require('uuid').v1()
    }
  },
  computed: {
    isDataV() {
      return [
        'dv-decoration-1',
        'dv-decoration-2',
        'dv-decoration-3',
        'dv-decoration-4',
        'dv-decoration-5',
        'dv-decoration-6',
        'dv-decoration-7',
        'dv-decoration-8',
        'dv-decoration-9',
        'dv-decoration-10',
        'dv-decoration-11',
        'dv-decoration-12'
      ].includes(this.configProps.attribute.decorationType)
    }
  },
  watch: {
    configProps: {
      handler() {
        this.refreshFlagKey = require('uuid').v1()// 强制刷新视图
      },
      deep: true// 深度监听
    },
    width() {
      this.refreshFlagKey = require('uuid').v1()
    }
  }
}
</script>

<style scoped lang='less'>
.custom-decoration {
  height: 100%;
  box-shadow: inset 0px 0px 30px 1px #0E84DA;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  border: 1px solid #1E93E2;
}
</style>
