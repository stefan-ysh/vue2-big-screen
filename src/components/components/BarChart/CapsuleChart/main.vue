<template>
  <div :id="uuid" :style="{ width: '100%', height: '100%' }" />
</template>
<!-- eslint-disable vue/require-default-prop -->
<script>
// http://echarts.zhangmuchen.top/#/detail?cid=xBJ1s5UGI7&version=5.4.0
import { getDataJson, pollingRefresh } from '@/utils'

export default {
  name: 'CapsuleChart',
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
      // debugger
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
    // 自定义图例的函数 用于处理每列数据
    // getFormatter(name) {
    //   debugger
    //   const arr = []
    //   let amt, count, percent
    //   const data = this.CardTypeSum
    //   for (const item of data) {
    //     if (item.CardTypeName === name) {
    //       count = item.SaleNum + '单'
    //       amt = '￥' + item.SaleAmt
    //       if (this.active === 0) {
    //         percent = ((item.SaleAmt / this.allAmt) * 100).toFixed(2) + '%'
    //       } else {
    //         percent = ((item.SaleNum / this.allNum) * 100).toFixed(2) + '%'
    //       }
    //     }
    //   }
    // },
    loadChart(attribute) {
      // 最大值 作为背景
      // const maxArr = [];
      // const len = this.cptData.xData.split(",").length;
      // for (let i = 0; i < len; i++) {
      //   maxArr.push(this.width);
      // }
      const that = this
      // let columnColor = attribute.barColor;
      // if (attribute.gradualColor) {
      //   columnColor = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //     { offset: 0, color: attribute.barColor1 },
      //     { offset: 0.5, color: attribute.barColor2 },
      //     { offset: 1, color: attribute.barColor3 },
      //   ]);
      // }
      // const colors = [
      //   "#DE3757FF",
      //   "#CFAC1DFF",
      //   "#24C47DFF",
      //   "#DE3757FF",
      //   "#24C47DFF",
      //   "#CFAC1DFF",
      // ];

      that.chartOption = {
        title: {
          show: attribute.titleShow,
          text: attribute.chartTitle,
          textStyle: {
            color: attribute.titleTextColor,
            fontSize: attribute.titleFontSize
          },
          left: attribute.titleLeft,
          top: attribute.titleTop
        },
        backgroundColor: attribute.bgColor,
        // tooltip（提示框组件）
        tooltip: {
          // trigger(触发类型)，可选'item','axis','none'
          trigger: 'axis',
          axisPointer: {
            // 指示器类型,可选'line','shadow','cross'
            type: attribute.axisPointerType
          },
          formatter: function(params) {
            return `${params[0].name}: ${params[0].data}`
          }
        },
        // echarts图表的相对于容器的布局,
        // grid: {
        //   top: 90,
        // },
        legend: {},
        xAxis: [
          {
            type: 'value',
            splitLine: {
              show: attribute.xSplitLine
            },
            // axisTick 坐标轴刻度相关设置
            axisTick: {
              show: attribute.xAxisTick
            },
            // axixLine 坐标轴轴线相关设置
            axisLine: {
              show: attribute.xAxisLine,
              lineStyle: {
                color: attribute.xLineColor
              }
            },
            // axisLabel 坐标轴刻度标签的相关设置
            axisLabel: {
              show: attribute.xAxisShow,
              fontSize: attribute.xLabelFontSize,
              color: attribute.xLabelColor,
              rotate: attribute.xFontRotate
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.cptData.xData.split(','),
            axisLabel: {
              show: attribute.yAxisShow,
              color: attribute.yLabelColor,
              fontSize: attribute.yLabelFontSize,
              rotate: attribute.yFontRotate
            },
            splitLine: {
              show: attribute.ySplitLine
            },
            axisLine: {
              show: attribute.yAxisLine,
              lineStyle: {
                color: attribute.yLineColor
              }
            },
            axisTick: {
              show: attribute.yAxisTick
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: this.cptData.yData.split(','),
            barWidth: attribute.barWidth,
            z: 2,
            itemStyle: {
              borderRadius: attribute.capsuleRadius,
              color: function(params) {
                const arr = that.cptData.yData.split(',').map(c => {
                  c = c * 1
                  return c
                })
                const max = Math.max.apply(null, arr)
                if (params.data > max * 0 && params.data < max * 0.4) {
                  return attribute.weakColor
                } else if (params.data >= max * 0.4 && params.data < max * 0.7) {
                  return attribute.mediumColor
                } else if (params.data >= max * 0.7 && params.data <= max * 1) {
                  return attribute.strongColor
                }
              }
            },
            label: {
              // 开启显示
              show: attribute.barLabelShow,
              position: 'top',
              color: attribute.barLabelColor,
              fontSize: attribute.barLabelSize
            },
            showBackground: attribute.showBackground,
            backgroundStyle: {
              color: attribute.capsuleBgColor,
              borderRadius: attribute.capsuleBgRadius
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          }
          // {
          //   type: "bar",
          //   data: maxArr,
          //   barWidth: attribute.bgBarWidth,
          //   // barGap 不同系列的柱间距离
          //   barGap: attribute.barGap,
          //   z: 1,
          //   itemStyle: {
          //     //borderRadius bar圆角半径
          //     borderRadius: attribute.capsuleBgRadius,
          //     color: attribute.capsuleBgColor,
          //   },
          // },
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
