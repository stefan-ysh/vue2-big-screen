<template>
  <div :style="{ width: '100%', height: '100%', ...style }" />
</template>
<script>
export default {
  name: 'BCDiv',
  props: {
    width: Number,
    height: Number,
    configProps: Object
  },
  data() {
    return {
      style: {}
    }
  },
  watch: {
    configProps: {
      handler(newVal) {
        const style = {
          'border-right-width': newVal.attribute.borderRightWidth + 'px',
          'border-right-style': newVal.attribute.borderRightStyle,
          'border-right-color': newVal.attribute.borderRightColor,
          'border-top-width': newVal.attribute.borderTopWidth + 'px',
          'border-top-color': newVal.attribute.borderTopColor,
          'border-top-style': newVal.attribute.borderTopStyle,
          'border-bottom-width': newVal.attribute.borderBottomWidth + 'px',
          'border-bottom-color': newVal.attribute.borderBottomColor,
          'border-bottom-style': newVal.attribute.borderBottomStyle,
          'border-left-color': newVal.attribute.borderLeftColor,
          'border-left-style': newVal.attribute.borderLeftStyle,
          'border-left-width': newVal.attribute.borderLeftWidth + 'px',
          'border-top-right-radius': newVal.attribute.topRightRadius + 'px',
          'border-bottom-right-radius': newVal.attribute.bottomRightRadius + 'px',
          'border-top-left-radius': newVal.attribute.topLeftRadius + 'px',
          'border-bottom-left-radius': newVal.attribute.bottomLeftRadius + 'px',
          background: newVal.attribute.bgColor
        }
        // 开启渐变色
        if (newVal.attribute.gradient) {
          let gcolor = ''
          newVal.attribute.gradientColors.forEach((c, i) => {
            gcolor += `${c} ${newVal.attribute.gradientPercentage[i]}%,`
          })
          gcolor = gcolor.substring(0, gcolor.lastIndexOf(','))
          style.background = `linear-gradient(${newVal.attribute.gradientDirection},${gcolor})`
        }
        if (newVal.attribute.boxShadow) {
          const { offsetX, offsetY, blurRadius, spreadRadius, boxShadowColor } = newVal.attribute
          style['box-shadow'] = `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${boxShadowColor}`
        }
        this.style = { ...style }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
