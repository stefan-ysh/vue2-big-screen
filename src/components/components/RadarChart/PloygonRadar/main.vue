<template>
  <div :id="uuid" :style="{ width: '100%', height: '100%' }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'PloygonRadarChart',
  props: {
    cptId: {
      type: String,
      default: ''
    },
    width: Number,
    height: Number,
    configProps: { type: Object, default: () => {} }
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
      deep: true // 深度监听
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
      getDataJson(this.configProps.cptDataForm, this.cptId).then((res) => {
        this.cptData = res
        this.loadChart(this.configProps.attribute)
      })
    },
    loadChart(attribute) {
      let indicator = []
      // 静态指示器内容
      if (attribute.staticIndicator) {
        indicator = JSON.parse(attribute.indicator)
      } else {
        // 接口数据读取指示器内容
        indicator = this.cptData.indicator
      }
      const series = []
      const legendTitle = []
      this.cptData.value.forEach((c, i) => {
        legendTitle.push(c.name)
        series.push({
          name: c.name,
          type: 'radar',
          // 范围线和圆点
          itemStyle: {
            // 圆点/边框颜色
            color: attribute.pieColor[i],
            // 圆点边框颜色
            borderColor: attribute.pieColor[i]
            // 圆点边框类型
            // borderType: 'dashed'
          },
          // 覆盖区域
          areaStyle: {
            color: attribute.pieColor[i],
            opacity: attribute.areaOpacity
          },
          data: [
            {
              name: attribute.chartTitle,
              value: c.data
            }
          ]
        })
      })
      this.chartOption = {
        title: {
          show: attribute.titleVisible,
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
        legend: {
          show: attribute.legendVisible,
          data: legendTitle
        },
        tooltip: {
          trigger: 'item',
          confine: true,
          appendToBody: true
        },
        radar: {
          shape: 'ploygon',
          indicator,
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: attribute.axisLineColor
            }
          },
          axisLabel: {
            show: attribute.axisLabelVisible
            // showMiniLabel: true,
            // showMaxLabel: true
          },
          // 雷达图网格背景的颜色，完全不透明度为0(透明背景)
          splitArea: {
            show: true,
            areaStyle: {
              // 图表背景的颜色
              color: attribute.splitAreaColor
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              // 设置网格的颜色
              color: attribute.splitLineColor
            }
          },
          splitNumber: attribute.splitNumber,
          axisNameGap: attribute.nameGap,
          radius: [attribute.radiusInside + '%', attribute.radiusOutside + '%'],
          // 坐标名字
          axisName: {
            show: attribute.axisNameVisible,
            fontSize: attribute.axisNameFontSize,
            color: attribute.axisNameColor
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
      this.chart.setOption(this.chartOption)
    }
  }
}
</script>

<style scoped></style>
