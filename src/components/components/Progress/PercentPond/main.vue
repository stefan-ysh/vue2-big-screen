<template>
  <dv-percent-pond :key="refreshFlagKey" :config="pondConfig" :style="{ width: '100%', height: '100%' }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'PercentPond',
  props: {
    cptId: {
      type: String,
      default: ''
    },
    width: Number,
    height: Number,
    configProps: Object
  },
  data() {
    return {
      uuid: null,
      pondConfig: {},
      refreshFlagKey: null // 强制刷新视图
    }
  },
  watch: {
    'configProps.attribute': {
      handler() {
        this.loadData()
      },
      deep: true// 深度监听
    },
    width() {
      this.refreshFlagKey = require('uuid').v1()
    },
    height() {
      this.refreshFlagKey = require('uuid').v1()
    }
  },
  created() {
    this.uuid = require('uuid').v1()
    this.refreshFlagKey = require('uuid').v1()
    this.refreshCptData()
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        const tempConfig = JSON.parse(JSON.stringify(this.configProps.attribute))
        tempConfig.value = res.value
        tempConfig.lineDash = [tempConfig.lineWidth, tempConfig.lineSpace]
        tempConfig.colors = [tempConfig.color1, tempConfig.color2]
        this.pondConfig = tempConfig
        this.refreshFlagKey = require('uuid').v1() // 强制刷新视图 报错为dataV组件内部bug
      })
    }
  }
}
</script>

<style scoped>

</style>
