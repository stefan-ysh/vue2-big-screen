<template>
  <div style="width: 100%; heigt: 100%">
    <i
      class="el-icon-view"
      :style="{
        color: configProps.attribute.color,
        'font-size': configProps.attribute.fontSize + 'px',
      }"
    />
    <audio :autoplay="autoplay" :loop="configProps.attribute.isLoop">
      <source
        :src="
          require(`@/assets/audio/${
            configProps.attribute.audioSrc
              ? configProps.attribute.audioSrc
              : 'Bottle'
          }.ogg`)
        "
      >
      您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'BAudio',
  props: {
    cptId: {
      type: String,
      default: ''
    },
    configProps: { type: Object, default: () => {} }
  },
  data() {
    return {
      autoplay: false
    }
  },
  watch: {
    'configProps.attribute': {
      handler() {
        this.loadData()
      },
      deep: true
    }
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
      this.refreshFlagKey = require('uuid').v1()
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        const config = JSON.parse(JSON.stringify(this.configProps.attribute))
        this.compareResult(res.value, config.playCondition)
      })
    },
    compareResult(val, conditions) {
      this.autoplay = false
      // 判断是否满足条件
    }
  }
}
</script>
