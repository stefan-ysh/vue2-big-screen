
<template>
  <div :id="uuid" :style="{ width: '100%', height: '100%' }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'RadarChart',
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
        tooltip: {
          trigger: 'item',
          confine: true,
          appendToBody: true
        },
        legend: {
          show: attribute.legendVisible,
          data: [attribute.chartTitle]
        },
        radar: {
          shape: attribute.shape,
          indicator: this.cptData.map((d) => { return { name: d.name, color: '#D6E8FF' } }),
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: '#04D0F3'
            }
          },
          // 雷达图背景的颜色，完全不透明度为0(透明背景)
          splitArea: {
            show: false,
            areaStyle: {
              // 图表背景的颜色
              color: 'rgba(255,0,0,0)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              // 设置网格的颜色
              color: '#04D0F3'
            }
          },
          splitNumber: attribute.splitNumber,
          axisNameGap: attribute.nameGap,
          radius: [
            attribute.radiusInside + '%',
            attribute.radiusOutside + '%'
          ],
          // 坐标名字
          axisName: {
            fontSize: attribute.axisNameFontSize
          }
        },
        series: [
          {
            type: 'radar',
            // 范围线和圆点
            itemStyle: {
              // 圆点/边框颜色
              color: attribute.areaColor,
              // 圆点边框颜色
              borderColor: attribute.areaColor
              // 圆点边框类型
              // borderType: 'dashed'
            },
            // 覆盖区域
            areaStyle: {
              color: attribute.areaColor,
              opacity: attribute.areaOpacity
            },
            data: [
              {
                name: attribute.chartTitle,
                value: this.cptData.map(c => { return c.value })
              }
            ]
          }
        ]
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
