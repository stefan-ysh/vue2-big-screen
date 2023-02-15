<template>
  <div :id="uuid" :style="{ width: '100%', height: '100%', ...rotateDeg }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Pie',
  props: {
    width: Number,
    height: Number,
    rotateDeg: Object,
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
      that.chartOption = {
        color: attribute.pieColor,
        title: {
          text: attribute.chartTitle,
          subtext: attribute.subtext,
          left: attribute.titleX,
          top: attribute.titleY,
          textStyle: {
            fontSize: attribute.titleFontSize,
            color: attribute.titleTextColor
          },
          // 副标题文本样式设置
          subtextStyle: { fontSize: 12, color: attribute.subtextColor }
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: attribute.legendShow,
          orient: attribute.orient,
          x: attribute.legendX,
          y: attribute.legendY,
          textStyle: {
            color: attribute.legendTextColor,
            fontSize: attribute.legendFontSize
          }
        },
        series: [
          {
            name: attribute.chartTitle,
            type: 'pie',
            roseType:
              attribute.roseType === 'false' ? false : attribute.roseType,
            radius: [
              attribute.radiusInside + '%',
              attribute.radiusOutside + '%',
            ],
            label: {
              position: attribute.labelPosition,
              fontSize: attribute.labelFontSize,
              color: attribute.labelColor
            },
            itemStyle: {
              borderRadius: attribute.borderRadius
            },
            data: this.cptData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(255, 0, 0, 0.5)',
              }
            }
          }
        ]
      }
      that.chart.setOption(that.chartOption)
    },
  }
}
</script>

<style scoped></style>
