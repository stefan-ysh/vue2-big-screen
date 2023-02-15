<template>
  <div :id="uuid" :style="{ width: '100%', height: '100%', ...rotateDeg }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils/big-screen';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  props: {
    width: Number,
    height: Number,
    rotateDeg: Object,
    configProps: Object
  },
  data() {
    return {
      uuid: '',
      chartOption: {},
      chart: null,
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
    this.chart = this.$echarts.init(document.getElementById(this.uuid), 'dark');
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
        backgroundColor: '',
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            startAngle: attribute.startAngle,
            endAngle: attribute.endAngle,
            radius: '100%',
            min: attribute.min,
            max: attribute.max,
            axisLabel: {
              distance: attribute.labelDistance,
              color: '#999',
              fontSize: attribute.labelSize
            },
            axisTick: {
              show: true,
              length: attribute.tickLength,
              distance: attribute.lineDistance
            },
            splitLine: {
              distance: attribute.lineDistance,
              length: attribute.tickLength * 1.5,
              lineStyle: {
                width: 2,
                color: '#999',
              }
            },
            axisLine: {
              lineStyle: {
                width: attribute.lineWidth,
                color: [
                  [0.3, attribute.color1],
                  [0.7, attribute.color2],
                  [1, attribute.color3]
                ]
              }
            },
            progress: {
              show: true,
              width: attribute.lineWidth
            },
            pointer: {
              length: attribute.pointerLength + '%',
              width: attribute.pointerWidth
            },
            itemStyle: {
              color: attribute.itemColor
            },
            title: {
              show: true,
              fontSize: attribute.titleSize,
              color: attribute.titleColor
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}',
              color: attribute.detailColor,
              fontSize: attribute.detailSize
            },
            data: [
              {
                value: that.cptData.value,
                name: attribute.title
              }
            ]
          }
        ]
      }
      that.chart.setOption(that.chartOption)
    },
  }
}
</script>

<style scoped></style>
