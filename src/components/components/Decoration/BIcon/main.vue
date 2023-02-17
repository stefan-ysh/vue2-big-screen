<template>
  <i
    :style="{
      width: width + 'px',
      height: height + 'px',
      color: configProps.attribute.color,
      background: configProps.attribute.background,
      'font-size': configProps.attribute.iconSize + 'px'
    }"
    :class="configProps.attribute.iconType"
  />
</template>
<script>
export default {
  name: 'BIcon',
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    configProps: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
