<template>
  <div class="pie-chart" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="chart-title" v-if="attribute.showTitle" :style="{ color: attribute.titleColor }">
      {{ chartTitle }}
    </div>
    <div ref="chartContainer" class="chart-container" :style="chartContainerStyle"></div>
  </div>
</template>

<script>
import { v1 as uuidv1 } from 'uuid'
import { getDataJson, pollingRefresh, clearCptInterval } from '@/utils'

export default {
  name: 'PieChart',
  props: {
    cptId: String,
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    configProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      uuid: '',
      chart: null,
      cptData: []
    }
  },
  computed: {
    attribute() {
      return this.configProps.attribute || {}
    },
    chartTitle() {
      return this.cptData.title || this.attribute.title || '饼图'
    },
    seriesData() {
      const attr = this.attribute
      let series = attr.series
      if (!series && attr.chartConfig) {
        series = attr.chartConfig.series
      }
      if (!Array.isArray(series) || series.length === 0) {
        series = [{ type: 'pie', radius: ['40%', '70%'], data: [] }]
      }
      return series
    },
    chartContainerStyle() {
      return {
        width: '100%',
        height: this.attribute.showTitle
          ? `calc(100% - ${this.attribute.titleHeight || 40}px)`
          : '100%',
        backgroundColor: this.attribute.backgroundColor || 'rgba(12, 26, 60, 0.2)',
        border: `1px solid ${this.attribute.borderColor || '#1D2C5E'}`,
        borderRadius: '4px'
      }
    }
  },
  watch: {
    'configProps.attribute': {
      handler() {
        this.updateChart()
      },
      deep: true
    },
    width() {
      this.resizeChart()
    },
    height() {
      this.resizeChart()
    }
  },
  created() {
    this.uuid = uuidv1()
    this.refreshCptData()
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    clearCptInterval(this.uuid)
    window.removeEventListener('resize', this.resizeChart)
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    initChart() {
      if (!this.$echarts || !this.$refs.chartContainer) return
      this.chart = this.$echarts.init(this.$refs.chartContainer)
      window.addEventListener('resize', this.resizeChart)
      this.updateChart()
    },
    refreshCptData() {
      if (this.configProps.cptDataForm) {
        pollingRefresh(this.uuid, this.configProps.cptDataForm, this.loadData)
      }
    },
    loadData() {
      getDataJson(this.configProps.cptDataForm, this.cptId)
        .then(res => {
          // 静态数据支持数组（饼图数据）或 { title, data } 形式
          if (Array.isArray(res)) {
            this.cptData = { data: res }
          } else {
            this.cptData = res && typeof res === 'object' ? res : {}
          }
          this.updateChart()
        })
        .catch(() => {
          this.cptData = {}
        })
    },
    updateChart() {
      if (!this.chart) return
      const series = JSON.parse(JSON.stringify(this.seriesData))
      // 静态数据优先：dataText 提供的数据覆盖第一组 series 的 data
      if (Array.isArray(this.cptData.data) && this.cptData.data.length > 0 && series[0]) {
        this.$set(series[0], 'data', this.cptData.data)
      }
      const legendData = ((series[0] && series[0].data) || [])
        .map(item => item && item.name)
        .filter(Boolean)
      const option = {
        color: this.attribute.pieColor,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: {
            color: this.attribute.textColor || '#ffffff'
          },
          data: legendData
        },
        series
      }
      // 图表处理函数
      if (this.configProps.cptDataForm && this.configProps.cptDataForm.convertChart) {
        try {
          const convertFun = new Function('return ' + this.configProps.cptDataForm.convertChart)
          convertFun()(option)
        } catch (e) {
          // 转换函数执行失败时使用原始 option
        }
      }
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.pie-chart {
  position: relative;

  .chart-title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  .chart-container {
    position: relative;
  }
}
</style>
