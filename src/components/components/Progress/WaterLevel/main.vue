<template>
  <dv-water-level-pond
    :key="refreshFlagKey"
    :config="config"
    :style="{ width: width + 'px', height: height + 'px' }"
  />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'
export default {
  name: 'WaterLevel',
  title: '',
  icon: '',
  initWidth: 120,
  initHeight: 100,
  group: 'chart',
  props: {
    cptId: {
      type: String,
      default: ''
    },
    width: Number,
    height: Number,
    configProps: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      config: {},
      uuid: null,
      refreshFlagKey: null
    }
  },
  watch: {
    'configProps.attribute': {
      handler() {
        this.loadData()
      },
      deep: true // 深度监听
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
      this.refreshFlagKey = require('uuid').v1()
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then((res) => {
        const tempVal = JSON.parse(JSON.stringify(this.configProps.attribute))
        tempVal.colors = [tempVal.topColor, tempVal.bottomColor]
        this.config = tempVal
        this.config.data = res
      })
    }
  }
}
</script>

<style scoped></style>
