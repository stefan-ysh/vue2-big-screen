<template>
  <div :style="{ width: width + 'px', height: height + 'px' }">
    <div
      v-if="configProps.attribute.showSortButton && cptData.length > 0"
      :style="{
        'z-index': 9999,
        position: 'absolute',
        left: configProps.attribute.sortBtnLeft + 'px',
        top: configProps.attribute.sortBtnTop + 'px'
      }"
    >
      <el-radio-group v-model="sortType" @change="loadChart(configProps.attribute)">
        <el-radio label="asce">升序</el-radio>
        <el-radio label="desc">降序</el-radio>
      </el-radio-group>
    </div>

    <div :id="uuid" :style="{ width: '100%', height: '100%' }" />
  </div>
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'StackBar',
  props: {
    width: Number,
    height: Number,
    configProps: Object,
    cptId: String
  },
  data() {
    return {
      sortType: '',
      series: [],
      uuid: null,
      chartOption: {},
      chart: undefined,
      activeLegends: undefined,
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
    this.sortType = this.configProps.attribute.defaultSortType
  },
  mounted() {
    const that = this
    this.chart = this.$echarts.init(document.getElementById(this.uuid))
    this.refreshCptData()
    this.chart.on('click', params => {
      debugger
    })
    that.chart.on('legendselectchanged', params => {
      that.activeLegends = params.selected
      that.loadChart(that.configProps.attribute)
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
    // 转换数据
    convertData() {
      const result = this._.cloneDeep(this.cptData)
      if (!result) return
      if (this.configProps.attribute.showSortButton) {
        result.forEach(s => {
          let num = 0
          for (const k in s) {
            if (this.activeLegends && !this.activeLegends[k]) {
              delete s.k
            } else if (!['name'].includes(k)) {
              num += s[k] * 1
            }
          }
          s['__total'] = num
        })
        result.sort((a, b) => {
          if (this.sortType === 'desc') {
            // 降序
            return b.__total - a.__total
          } else {
            // 升序
            return a.__total - b.__total
          }
        })
      }
      const xAxisLabels = []
      const obj = {}
      result.forEach(d => {
        // eslint-disable-next-line no-unused-vars
        const { name, __total, ...vals } = d
        xAxisLabels.push({
          name
        })
        for (const key in vals) {
          if (obj[key]) {
            obj[key].push(vals[key])
          } else {
            obj[key] = []
            obj[key].push(vals[key])
          }
        }
      })
      const types = [obj]
      return { xAxisLabels, types }
    },
    loadChart(attribute) {
      const that = this
      this.series.length = 0
      const result = this.convertData()
      // let columnColor = attribute.barColor
      // if (attribute.gradualColor) {
      //   columnColor = new this.$echarts.graphic.LinearGradient(
      //     0, 0, 0, 1,
      //     [
      //       { offset: 0, color: attribute.barColor1 },
      //       { offset: 0.5, color: attribute.barColor2 },
      //       { offset: 1, color: attribute.barColor3 }
      //     ])
      // }
      const keys = Object.keys(result.types[0])
      const vals = Object.values(result.types[0])
      const len = keys.length
      for (let i = 0; i < len; i++) {
        const o = {
          name: keys[i],
          data: vals[i],
          type: 'bar',
          stack: 'test',
          itemStyle: {
            color: attribute.colors[i]
          },
          barWidth: attribute.barWidth
        }
        this.series.push(o)
      }

      that.chartOption = {
        backgroundColor: attribute.backgroundColor,
        colorgradientColor: ['red', 'yellow', 'green'],
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
          },
          confine: true,
          appendToBody: true
        },
        grid: {
          // x: 10, y: 30, x2: 10, y2: 10,
          // containLabel: true
        },
        legend: {
          textStyle: {
            show: false,
            // todo
            color: 'rgba(51, 51, 51, 0)'
          },
          show: attribute.legendVisible,
          left: attribute.legendLeft,
          top: attribute.legendTop
        },
        xAxis: {
          show: attribute.xAxisShow,
          type: 'category',
          // type: attribute.barDirection === 'horizontal' ? 'value' : 'category',
          data: result.xAxisLabels.map(c => {
            return c.name
          }),
          axisLabel: {
            color: attribute.xLabelColor,
            rotate: attribute.xFontRotate,
            fontSize: 10
          },
          axisLine: {
            show: attribute.xLineShow,
            lineStyle: {
              color: attribute.xLineColor,
              type: 'dashed'
            }
          },
          // x轴刻度线
          axisTick: {
            show: attribute.xTickShow
          },
          lineStyle: {
            type: 'dashed'
          }
        },
        yAxis: {
          show: attribute.yAxisShow,
          // type: attribute.barDirection === 'vertical' ? 'value' : 'category',
          axisLabel: {
            color: attribute.yLabelColor
          },
          axisLine: {
            show: attribute.yLineShow,
            lineStyle: {
              color: attribute.yLineColor,
              type: 'dashed'
            }
          },
          // y轴刻度线
          axisTick: {
            show: attribute.yTickShow,
            lineStyle: {
              type: 'dashed'
            }
          },
          // 网格线
          splitLine: {
            show: attribute.yGridLineShow
            // lineStyle: {
            //   type: 'dashed'
            // }
          }
        },
        series: this.series
        //   [{
        //   data: this.cptData.yData.split(','),
        //   type: attribute.barType, // pictorialBar || bar
        //   showBackground: attribute.barBgShow,
        //   symbol: attribute.barPath,
        //   backgroundStyle: {
        //     color: attribute.barBgColor
        //   },
        //   barWidth: attribute.barWidth,
        //   itemStyle: {
        //     borderRadius: attribute.barBorderRadius
        //   },
        //   label: {
        //     // 开启显示
        //     show: attribute.barLabelShow,
        //     position: 'top',
        //     color: attribute.barLabelColor,
        //     fontSize: attribute.barLabelSize
        //   }
        // }]
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
