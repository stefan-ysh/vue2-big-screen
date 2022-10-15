<template>
  <dv-scroll-ranking-board :config="config" :style="{ width: width + 'px', height: height + 'px', ...rotateDeg}" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen'
export default {
  name: 'ScrollList',
  props: {
    width: Number,
    height: Number,
    rotateDeg: Object,
    configProps: Object
  },
  data () {
    return {
      config: {},
      uuid: null
    }
  },
  watch: {
    'configProps.attribute': {
      handler () {
        this.loadData()
      },
      deep: true// 深度监听
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
        this.config = JSON.parse(JSON.stringify(this.configProps.attribute))
        this.config.data = res
      })
    }
  }
}
</script>

<style scoped>

</style>
