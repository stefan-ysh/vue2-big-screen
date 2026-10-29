/**
 * echarts 图表组件公共 mixin
 *
 * 契约：
 * - 组件模板根元素需绑定 :id="uuid"，mixin 在 mounted 时以该元素初始化 echarts 实例
 * - 组件实现 refreshCptData()（通常调用 pollingRefresh）以加载数据
 * - loadChart 构建好 option 后调用 this.renderChart(option) 完成 convertChart 处理与渲染
 * - 组件可通过覆盖 getChartTheme() 指定 echarts 主题（如 'dark'）
 * - width/height 变化时自动安全 resize（含 window resize 监听），组件销毁时统一
 *   清理定时器、监听器与 echarts 实例
 */
import { v1 as uuidv1 } from 'uuid'
import { clearCptInterval } from '@/utils'

export default {
  data() {
    return {
      uuid: '',
      chart: null
    }
  },
  watch: {
    width() {
      this.resizeChart()
    },
    height() {
      this.resizeChart()
    }
  },
  created() {
    this.uuid = uuidv1()
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
    // 组件可覆盖此方法返回 echarts 主题名
    getChartTheme() {
      return undefined
    },
    initChart() {
      if (!this.$echarts) return
      const el = document.getElementById(this.uuid)
      if (!el) return
      const theme = typeof this.getChartTheme === 'function' ? this.getChartTheme() : undefined
      this.chart = this.$echarts.init(el, theme)
      window.addEventListener('resize', this.resizeChart)
      if (typeof this.refreshCptData === 'function') {
        this.refreshCptData()
      }
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    // 应用组件的 convertChart 处理函数后渲染图表
    renderChart(option) {
      if (!this.chart) return
      const cptDataForm = (this.configProps && this.configProps.cptDataForm) || {}
      if (cptDataForm.convertChart) {
        try {
          const convertFun = new Function('return ' + cptDataForm.convertChart)
          convertFun()(option)
        } catch (e) {
          // 转换函数执行失败时使用原始 option
        }
      }
      this.chart.setOption(option)
    }
  }
}
