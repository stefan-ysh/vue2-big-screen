<template>
  <div :id="uuid" :style="{ width: '100%', height: '100%' }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'BarChart',
  props: {
    width: Number,
    height: Number,
    configProps: Object,
    cptId: String
  },
  data() {
    return {
      uuid: null,
      chartOption: {},
      chart: undefined,
      cptData: {}
    }
  },
  watch: {
    'configProps.attribute': {
      handler(newObj) {
        this.loadChart(newObj)
      },
      deep: true
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
    this.chart.on('click', params => {
      debugger
    })
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
      let columnColor = attribute.barColor
      if (attribute.gradualColor) {
        columnColor = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: attribute.barColor1 },
          { offset: 0.5, color: attribute.barColor2 },
          { offset: 1, color: attribute.barColor3 }
        ])
      }
      that.chartOption = {
        backgroundColor: attribute.backgroundColor,
        color: columnColor,
        title: {
          text: attribute.chartTitle,
          textStyle: {
            color: attribute.titleTextColor
          },
          left: attribute.titleLeft,
          top: attribute.titleTop
        },
        tooltip: {
          trigger: 'axis',
          // 坐标轴指示器，坐标轴触发有效
          axisPointer: {
            // 默认为直线，可选为：'line' | 'shadow'
            type: 'shadow'
          }
        },
        grid: {
          x: 10,
          y: 30,
          x2: 10,
          y2: 10,
          containLabel: true
        },
        xAxis: {
          show: attribute.xAxisShow,
          type: attribute.barDirection === 'horizontal' ? 'value' : 'category',
          data: this.cptData.xData.split(','),
          axisLabel: {
            color: attribute.xLabelColor,
            rotate: attribute.xFontRotate,
            fontSize: 50
          },
          axisLine: {
            show: attribute.xLineShow,
            lineStyle: {
              color: attribute.xLineColor
            }
          },
          // x轴刻度线
          axisTick: {
            show: attribute.xTickShow
          }
        },
        yAxis: {
          show: attribute.yAxisShow,
          type: attribute.barDirection === 'vertical' ? 'value' : 'category',
          axisLabel: {
            color: attribute.yLabelColor
          },
          axisLine: {
            show: attribute.yLineShow,
            lineStyle: {
              color: attribute.yLineColor
            }
          },
          // y轴刻度线
          axisTick: {
            show: attribute.yTickShow
          },
          // 网格线
          splitLine: {
            show: attribute.yGridLineShow
          }
        },
        series: [
          {
            data: this.cptData.yData.split(','),
            type: attribute.barType, // pictorialBar || bar
            showBackground: attribute.barBgShow,
            symbol: attribute.barPath,
            backgroundStyle: {
              color: attribute.barBgColor
            },
            barWidth: attribute.barWidth,
            itemStyle: {
              borderRadius: attribute.barBorderRadius
            },
            label: {
              // 开启显示
              show: attribute.barLabelShow,
              position: 'top',
              color: attribute.barLabelColor,
              fontSize: attribute.barLabelSize
            }
          }
        ]
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

<style scoped></style>
