<template>
  <dv-active-ring-chart :key="refreshFlagKey" :config="config" :style="{ width: '100%', height: '100%' }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'
export default {
  name: 'ActiveRing',
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
      config: {},
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
    this.refreshCptData()
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
      this.refreshFlagKey = require('uuid').v1()
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        this.config = JSON.parse(JSON.stringify(this.configProps.attribute))
        this.config.data = res
      })
    }
  }
}
</script>

<style scoped></style>
