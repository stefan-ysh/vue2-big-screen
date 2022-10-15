<template>
  <div
    style="width: 100%; height: 100%"
    :style="{
      textAlign: configProps.attribute.textAlign,
      color: configProps.attribute.textColor,
      fontSize: configProps.attribute.textSize + 'px',
      fontStyle: configProps.attribute.fontStyle,
      fontWeight: configProps.attribute.fontWeight,
      lineHeight: configProps.attribute.textLineHeight + 'px',
      backgroundColor: configProps.attribute.bgColor,
      fontFamily: configProps.attribute.textFamily,
      textDecoration: configProps.attribute.textDecoration,
      ...rotateDeg
    }"
    @click="redirect"
  >
    {{ cptData.value }}
  </div>
</template>

<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen'

export default {
  name: 'BText',
  props: {
    rotateDeg: { type: Object, default: () => {} },
    configProps: { type: Object, default: () => {} }
  },
  data () {
    return {
      cptData: {},
      uuid: null
    }
  },
  created () {
    this.uuid = require('uuid').v1()
    this.refreshCptData()
  },
  methods: {
    refreshCptData () {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData () {
      getDataJson(this.configProps.cptDataForm).then((res) => {
        this.cptData = res
      })
    },
    redirect () {
      if (this.configProps.attribute.url) {
        if (this.configProps.attribute.url.startsWith('view')) {
          this.$router.push(this.configProps.attribute.url)
          this.$emit('reload')
        } else {
          window.open(this.configProps.attribute.url)
        }
      }
    }
  }
}
</script>
