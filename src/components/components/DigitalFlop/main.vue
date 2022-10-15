<template>
  <dv-digital-flop :config="flopConfig" :style="{ width: '100%', height: '100%', ...rotateDeg }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen'

export default {
  name: 'DigitalFlop',
  props: {
    width: Number,
    height: Number,
    rotateDeg: Object,
    configProps: Object
  },
  data () {
    return {
      uuid: null,
      flopConfig: {}
    }
  },
  watch: {
    'configProps.attribute': {
      handler () {
        this.loadData()
      },
      deep: true// 深度监听
    },
    width () {
      this.loadData()
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
      getDataJson(this.configProps.cptDataForm).then(res => {
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

<style scoped>

</style>
