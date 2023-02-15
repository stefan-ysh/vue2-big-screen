<template>
  <div style="width: 100%; height: 100%; overflow: hidden">
    <div
      :id="uuid"
      class="clock"
      :class="{ 'animation-class': configProps.attribute.animation }"
      :style="{
        width: '100%',
        height: '100%',
        ...rotateDeg,
        'font-size': configProps.attribute.fontSize + 'px',
        'font-style': configProps.attribute.fontStyle,
        'text-decoration': configProps.attribute.textDecoration,
        'text-align': configProps.attribute.textAlign,
        'font-weight': configProps.attribute.fontWeight,
        'font-family': configProps.attribute.fontFamily,
        color: configProps.attribute.color,
        'letter-spacing': configProps.attribute.letterSpace + 'px',
        'line-height': configProps.attribute.lineHeight + 'px',
      }"
    />
  </div>
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import dayjs from 'dayjs';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Clock',
  props: {
    rotateDeg: {
      type: Object,
      default: () => {}
    },
    configProps: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      uuid: '',
    }
  },
  created() {
    this.uuid = require('uuid').v1()
  },
  mounted() {
    this.showTime()
  },

  methods: {
    showTime() {
      let format = this.configProps.attribute.format

      if (this.configProps.attribute.am) {
        if (this.configProps.attribute.isUpperCase) {
          format = format + ' A';
        } else {
          format = format + ' a';
        }
      }

      if (this.configProps.attribute.showWeek) {
        format = format + ' dddd';
      }
      const result = dayjs().format(format)
      document.getElementById(this.uuid).innerText = result.trim()
      setTimeout(this.showTime, 1000)
    },
  }
}
</script>
<style scoped>
.animation-class {
  animation: move 4s linear infinite;
}
@keyframes move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
