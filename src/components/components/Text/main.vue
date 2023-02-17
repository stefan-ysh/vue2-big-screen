<template>
  <div :style="convertStyle(configProps.attribute)" @click="redirect">
    {{ cptData.value }}
  </div>
</template>

<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'BText',
  props: {
    cptId: {
      type: String,
      default: ''
    },
    configProps: { type: Object, default: () => {} }
  },
  data() {
    return {
      cptData: {},
      uuid: null
    }
  },
  created() {
    this.uuid = require('uuid').v1()
    this.refreshCptData()
  },
  methods: {
    convertStyle(attr) {
      const style = {
        width: '100%',
        height: '100%',
        textAlign: attr.textAlign,
        color: attr.textColor,
        fontSize: attr.textSize + 'px',
        fontStyle: attr.fontStyle,
        fontWeight: attr.fontWeight,
        lineHeight: attr.textLineHeight + 'px',
        backgroundColor: attr.bgColor,
        fontFamily: attr.textFamily,
        textDecoration: attr.textDecoration,
        paddingTop: attr.paddingTop + 'px',
        paddingRight: attr.paddingRight + 'px',
        paddingBottom: attr.paddingBottom + 'px',
        paddingLeft: attr.paddingLeft + 'px'
      }
      if (attr.textShadow) {
        const { offsetX, offsetY, blurRadius, textShadowColor } = attr
        style['text-shadow'] = `${offsetX}px ${offsetY}px ${blurRadius}px ${textShadowColor}`
      }
      return style
    },
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        this.cptData = res
      })
    },
    redirect() {
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
