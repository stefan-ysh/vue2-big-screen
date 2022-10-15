
<template>
  <div :id="uuid" :style="{ width: '100%', height: '100%', ...rotateDeg }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen'

export default {
  name: 'RadarChart',
  props: {
    width: Number,
    height: Number,
    rotateDeg: Object,
    configProps: { type: Object, default: () => {} }
  },
  data () {
    return {
      uuid: '',
      chartOption: {},
      chart: undefined,
      cptData: []
    }
  },
  watch: {
    'configProps.attribute': {
      handler (newObj) {
        this.loadChart(newObj)
      },
      deep: true // 深度监听
    },
    width () {
      this.chart.resize()
    },
    height () {
      this.chart.resize()
    }
  },
  created () {
    this.uuid = require('uuid').v1()
  },
  mounted () {
    this.chart = this.$echarts.init(document.getElementById(this.uuid))
    this.refreshCptData()
  },
  methods: {
    refreshCptData () {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData () {
      getDataJson(this.configProps.cptDataForm).then((res) => {
        this.cptData = res
        this.loadChart(this.configProps.attribute)
      })
    },
    loadChart (attribute) {
      const that = this
      that.chartOption = {
        title: {
          text: attribute.chartTitle,
          left: attribute.titleX,
          top: attribute.titleY,
          subtext: attribute.subtext,
          textStyle: {
            fontSize: attribute.titleFontSize,
            color: attribute.titleTextColor
          },
          // 副标题文本样式设置
          subtextStyle: {
            fontSize: attribute.subTitleFontSize,
            color: attribute.subTitleColor
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: attribute.legend
        },
        radar: {
          shape: attribute.shape,
          indicator: JSON.parse(attribute.indicator),
          splitNumber: attribute.splitNumber,
          nameGap: attribute.nameGap,
          radius: [
            attribute.radiusInside + '%',
            attribute.radiusOutside + '%'
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: this.cptData
          }
        ]
      }
      that.chart.setOption(that.chartOption)
    }
  }
}
</script>

<style scoped></style>
