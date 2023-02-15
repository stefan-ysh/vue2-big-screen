<template>
  <div :id="uuid" :style="{ width: '100%', height: '100%', ...rotateDeg }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen';

export default {
  name: 'ColumnChart',
  props: {
    width: Number,
    height: Number,
    rotateDeg: Object,
    configProps: Object
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
      deep: true // 深度监听
    },
    width() {
      this.chart.resize()
    },
    height() {
      this.chart.resize()
    },
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
      getDataJson(this.configProps.cptDataForm).then((res) => {
        this.cptData = res
        this.loadChart(this.configProps.attribute)
      });
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
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
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
          type: 'category',
          data: this.cptData.xData.split(','),
          axisLabel: {
            color: attribute.xLabelColor,
            rotate: attribute.xFontRotate // 倾斜角度-180~180
          },
          axisLine: {
            show: attribute.xLineShow,
            lineStyle: {
              color: attribute.xLineColor
            }
          },
          axisTick: {
            // x轴刻度线
            show: attribute.xTickShow
          }
        },
        yAxis: {
          show: attribute.yAxisShow,
          type: 'value',
          axisLabel: {
            color: attribute.yLabelColor
          },
          axisLine: {
            show: attribute.yLineShow,
            lineStyle: {
              color: attribute.yLineColor
            }
          },
          axisTick: {
            // y轴刻度线
            show: attribute.yTickShow
          },
          splitLine: {
            // 网格线
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
              color: 'rgba(180, 180, 180, 0.2)',
            },
            barWidth: attribute.barWidth,
            itemStyle: {
              borderRadius: attribute.barBorderRadius
            },
            label: {
              show: attribute.barLabelShow, // 开启显示
              position: 'top', // 在上方显示
              color: attribute.barLabelColor,
              fontSize: attribute.barLabelSize
            }
          }
        ]
      }
      // 图表处理
      if (this.configProps.cptDataForm.convertChart) {
        const funcStr = this.configProps.cptDataForm.convertChart
        // eslint-disable-next-line no-new-func
        const convertFun = new Function('return ' + funcStr)
        convertFun()(this.chartOption)
      }
      that.chart.setOption(that.chartOption)
    },
  }
}
</script>

<style scoped></style>
