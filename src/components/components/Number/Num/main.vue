<template>
  <div style="text-align: center">
    <div
      style="font-family: '840CAI978', serif"
      :style="{
        color: configProps.attribute.numColor,
        fontSize: configProps.attribute.numSize + 'px',
        lineHeight: configProps.attribute.numHeight + 'px'
      }"
    >
      {{ cptData.value }}<span style="font-size: 14px; color: #ccc">{{ cptData.unit ? cptData.unit : '' }}</span>
    </div>
    <div style="color: #ccc">{{ configProps.attribute.title }}</div>
  </div>
</template>

<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'BNum',
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
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        this.cptData = res
      })
    }
  }
}
</script>
