<template>
  <dv-digital-flop :config="flopConfig" :style="{ width: '100%', height: '100%' }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'DigitalFlop',
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
      flopConfig: {}
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
      this.loadData()
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
        this.flopConfig = {
          number: res.value.split(',').map(Number),
          content: this.configProps.attribute.content,
          toFixed: this.configProps.attribute.toFixedNum,
          textAlign: this.configProps.attribute.textAlign,
          rowGap: this.configProps.attribute.rowGap,
          style: this.configProps.attribute.style
        }
      })
    }
  }
}
</script>

<style scoped></style>
