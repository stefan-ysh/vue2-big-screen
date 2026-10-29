<template>
  <div class="data-preview">
    <el-dialog
      title="数据预览"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      append-to-body
    >
      <div class="preview-content">
        <div class="preview-header">
          <h3>{{ exampleInfo.name }}</h3>
          <p>{{ exampleInfo.description }}</p>
        </div>
        
        <div class="preview-tabs">
          <el-tabs v-model="activeTab" type="card">
            <el-tab-pane label="图表预览" name="chart">
              <div class="chart-preview">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="chart-item">
                      <h4>销售趋势</h4>
                      <div ref="salesChart" class="chart-container"></div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="chart-item">
                      <h4>用户分布</h4>
                      <div ref="userChart" class="chart-container"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top: 20px;">
                  <el-col :span="24">
                    <div class="chart-item">
                      <h4>财务数据</h4>
                      <div ref="financeChart" class="chart-container"></div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="数据表格" name="table">
              <div class="table-preview">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="name" label="名称" width="180"></el-table-column>
                  <el-table-column prop="value" label="数值" width="180"></el-table-column>
                  <el-table-column prop="growth" label="增长率"></el-table-column>
                  <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                      <el-tag :type="scope.row.status === '正常' ? 'success' : 'warning'">
                        {{ scope.row.status }}
                      </el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="JSON数据" name="json">
              <div class="json-preview">
                <pre>{{ JSON.stringify(previewData, null, 2) }}</pre>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="useThisExample">使用此示例</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mockDataManager from '@/utils/mockDataManager'

export default {
  name: 'DataPreview',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    exampleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeTab: 'chart',
      previewData: {},
      tableData: [],
      charts: {
        sales: null,
        user: null,
        finance: null
      }
    }
  },
  computed: {
    // 以 update:visible 事件同步父组件，避免直接修改 props
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.loadPreviewData()
        this.$nextTick(() => {
          this.initCharts()
        })
      } else {
        this.destroyCharts()
      }
    },
    activeTab(newTab) {
      if (newTab === 'chart') {
        this.$nextTick(() => {
          this.initCharts()
        })
      }
    }
  },
  methods: {
    loadPreviewData() {
      // 生成预览数据
      this.previewData = {
        sales: mockDataManager.generateDynamicData('sales', { days: 7 }),
        user: mockDataManager.generateDynamicData('user'),
        financial: mockDataManager.generateDynamicData('financial', { months: 6 }),
        traffic: mockDataManager.generateDynamicData('traffic', { hours: 12 })
      }
      
      // 生成表格数据
      this.tableData = [
        { name: '销售额', value: '¥1,234,567', growth: '+15.2%', status: '正常' },
        { name: '用户数', value: '45,678', growth: '+8.7%', status: '正常' },
        { name: '订单量', value: '12,345', growth: '+12.3%', status: '正常' },
        { name: '转化率', value: '6.8%', growth: '+2.1%', status: '警告' },
        { name: '客单价', value: '¥89.5', growth: '-1.2%', status: '警告' }
      ]
    },
    
    initCharts() {
      if (!this.$echarts) return

      // 销售趋势图
      if (this.$refs.salesChart) {
        this.charts.sales = this.charts.sales || this.$echarts.init(this.$refs.salesChart)
        const salesOption = {
          title: { text: '近7日销售趋势', textStyle: { fontSize: 14 } },
          tooltip: { trigger: 'axis' },
          xAxis: {
            type: 'category',
            data: this.previewData.sales?.labels || []
          },
          yAxis: { type: 'value' },
          series: [{
            name: '销售额',
            type: 'line',
            data: this.previewData.sales?.data || [],
            smooth: true,
            itemStyle: { color: '#409EFF' }
          }]
        }
        this.charts.sales.setOption(salesOption)
      }
      
      // 用户分布图
      if (this.$refs.userChart) {
        this.charts.user = this.charts.user || this.$echarts.init(this.$refs.userChart)
        const userOption = {
          title: { text: '用户分布', textStyle: { fontSize: 14 } },
          tooltip: { trigger: 'item' },
          series: [{
            name: '用户类型',
            type: 'pie',
            radius: '50%',
            data: this.previewData.user || [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
        this.charts.user.setOption(userOption)
      }
      
      // 财务数据图
      if (this.$refs.financeChart) {
        this.charts.finance = this.charts.finance || this.$echarts.init(this.$refs.financeChart)
        const financeOption = {
          title: { text: '财务数据对比', textStyle: { fontSize: 14 } },
          tooltip: { trigger: 'axis' },
          legend: { data: ['收入', '利润'] },
          xAxis: {
            type: 'category',
            data: this.previewData.financial?.labels || []
          },
          yAxis: { type: 'value' },
          series: [
            {
              name: '收入',
              type: 'bar',
              data: this.previewData.financial?.revenue || [],
              itemStyle: { color: '#67C23A' }
            },
            {
              name: '利润',
              type: 'bar',
              data: this.previewData.financial?.profit || [],
              itemStyle: { color: '#E6A23C' }
            }
          ]
        }
        this.charts.finance.setOption(financeOption)
      }
    },
    
    destroyCharts() {
      Object.values(this.charts).forEach(chart => {
        if (chart) {
          chart.dispose()
        }
      })
      this.charts = { sales: null, user: null, finance: null }
    },
    
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    
    useThisExample() {
      this.$emit('use-example', this.exampleInfo)
      this.handleClose()
    }
  },
  
  beforeDestroy() {
    this.destroyCharts()
  }
}
</script>

<style lang="scss" scoped>
.data-preview {
  .preview-content {
    .preview-header {
      text-align: center;
      margin-bottom: 20px;
      
      h3 {
        margin: 0 0 8px 0;
        color: #303133;
      }
      
      p {
        margin: 0;
        color: #606266;
        font-size: 14px;
      }
    }
    
    .preview-tabs {
      .chart-preview {
        .chart-item {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 16px;
          
          h4 {
            margin: 0 0 12px 0;
            font-size: 14px;
            color: #303133;
          }
          
          .chart-container {
            height: 200px;
            width: 100%;
          }
        }
      }
      
      .table-preview {
        background: #f8f9fa;
        border-radius: 6px;
        padding: 16px;
      }
      
      .json-preview {
        background: #f8f9fa;
        border-radius: 6px;
        padding: 16px;
        
        pre {
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
          color: #303133;
          max-height: 400px;
          overflow-y: auto;
        }
      }
    }
  }
}
</style> 