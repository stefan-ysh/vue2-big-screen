<template>
  <div :id="uuid" :style="{ width: '100%', height: '100%' }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'LineChart',
  props: {
    cptId: String,
    width: Number,
    height: Number,
    configProps: Object
  },
  data() {
    return {
      uuid: '',
      chartOption: {},
      chart: undefined,
      cptData: []
    }
  },
  watch: {
    'configProps.attribute': {
      handler(newObj) {
        this.loadChart(newObj)
      },
      deep: true// 深度监听
    },
    width() {
      this.chart.resize()
    },
    height() {
      this.chart.resize()
    }
  },
  created() {
    this.uuid = require('uuid').v1()
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById(this.uuid))
    this.refreshCptData()
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId).then(res => {
        this.cptData = res
        this.loadChart(this.configProps.attribute)
      })
    },
    loadChart(attribute) {
      const that = this
      const series = []
      let xData = []
      this.cptData.forEach((c) => {
        if (xData.length === 0) {
          xData = (c.xData.split(','))
        }
        series.push({
          data: c.yData.split(','),
          type: 'line',
          smooth: attribute.smooth,
          // 线条上的圆点
          showSymbol: attribute.showSymbol,
          areaStyle: {
            color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: attribute.areaColor1
              },
              {
                offset: 0.5,
                color: attribute.areaColor2
              },
              {
                offset: 1,
                color: attribute.areaColor3
              }
            ])
          }
        })
      })
      that.chartOption = {
        color: attribute.lineColor,
        title: {
          text: attribute.title,
          subtext: attribute.subtext,
          left: attribute.titleLeft,
          top: attribute.titleTop,
          textStyle: {
            color: attribute.titleTextColor
          },
          subtextStyle: { fontSize: 12, color: attribute.subtextColor }
        },
        grid: {
          x: 10, y: 30, x2: 10, y2: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLabel: {
            show: attribute.xLabelShow,
            color: attribute.xLabelColor
          },
          axisLine: {
            show: attribute.xLineShow,
            lineStyle: {
              color: attribute.xLineColor
            }
          },
          axisTick: { // x轴刻度线
            show: attribute.xTickShow
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: attribute.yLabelShow,
            color: attribute.yLabelColor
          },
          axisLine: {
            show: attribute.yLineShow,
            lineStyle: {
              color: attribute.yLineColor
            }
          },
          axisTick: { // y轴刻度线
            show: attribute.yTickShow
          },
          splitLine: { // 网格线
            show: attribute.yGridLineShow
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        series
      }
      // 图表处理
      if (this.configProps.cptDataForm.convertChart) {
        const funcStr = this.configProps.cptDataForm.convertChart
        const convertFun = new Function('return ' + funcStr)
        convertFun()(this.chartOption)
      }
      that.chart.setOption(that.chartOption)
    }
  }
}
</script>

<style scoped>

</style>
