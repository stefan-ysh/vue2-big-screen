/**
 * 数据分析类型大屏的mock数据
 */

// 公共组件
const commonComponents = {
  // 标题组件
  headerTitle: {
    type: 'header-title',
    title: '数据分析大屏',
    subtitle: '实时数据分析与可视化',
    style: {
      fontSize: 36,
      color: '#fff',
      textAlign: 'center'
    }
  },
  // 数据卡片组
  dataCards: {
    type: 'data-cards',
    layout: 'horizontal',
    items: [
      { title: '总销售额', value: '¥126,560', ratio: '+12.5%', icon: 'money' },
      { title: '新增用户', value: '1,856', ratio: '+6.2%', icon: 'user' },
      { title: '订单量', value: '8,526', ratio: '+8.5%', icon: 'shopping' },
      { title: '访问量', value: '156,285', ratio: '+15.8%', icon: 'view' }
    ]
  },
  // 折线图
  lineChart: {
    type: 'line-chart',
    title: '销售趋势分析',
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '去年',
        type: 'line',
        data: [3500, 3000, 4500, 5000, 5500, 6000, 5200, 4900, 6300, 7000, 6800, 7500],
        smooth: true
      },
      {
        name: '今年',
        type: 'line',
        data: [4500, 3800, 5200, 6000, 6500, 7000, 6300, 6000, 7500, 8300, 8000, 9000],
        smooth: true
      }
    ]
  },
  // 饼图
  pieChart: {
    type: 'pie-chart',
    title: '销售占比分布',
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 35, name: '电子产品' },
          { value: 25, name: '服装鞋帽' },
          { value: 20, name: '家居用品' },
          { value: 15, name: '食品饮料' },
          { value: 5, name: '其他' }
        ]
      }
    ]
  },
  // 柱状图
  barChart: {
    type: 'bar-chart',
    title: '各区域销售对比',
    xAxis: {
      type: 'category',
      data: ['华东', '华南', '华北', '华中', '西南', '西北', '东北']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '去年',
        type: 'bar',
        data: [15000, 12000, 8000, 6000, 5000, 3000, 4000]
      },
      {
        name: '今年',
        type: 'bar',
        data: [18000, 14000, 10000, 7500, 6000, 4000, 5000]
      }
    ]
  },
  // 表格组件
  tableData: {
    type: 'data-table',
    title: '产品销售排行',
    columns: [
      { label: '排名', prop: 'rank' },
      { label: '产品名称', prop: 'name' },
      { label: '销售额', prop: 'amount' },
      { label: '同比增长', prop: 'growth' }
    ],
    data: [
      { rank: 1, name: 'iPhone 14 Pro', amount: '¥25,680,000', growth: '+15%' },
      { rank: 2, name: '小米手机13', amount: '¥18,450,000', growth: '+12%' },
      { rank: 3, name: '华为Mate50', amount: '¥16,320,000', growth: '+8%' },
      { rank: 4, name: '三星Galaxy S22', amount: '¥12,580,000', growth: '+5%' },
      { rank: 5, name: 'OPPO Find X5', amount: '¥10,260,000', growth: '+6%' }
    ]
  },
  // 漏斗图
  funnelChart: {
    type: 'funnel-chart',
    title: '销售转化漏斗',
    series: [
      {
        type: 'funnel',
        data: [
          { value: 100000, name: '访问' },
          { value: 60000, name: '咨询' },
          { value: 30000, name: '订单' },
          { value: 20000, name: '付款' },
          { value: 10000, name: '复购' }
        ]
      }
    ]
  }
}

// 企业销售业绩分析大屏
const salesAnalysisScreen = {
  id: 'crmp239crm20aaaa',
  name: '企业销售业绩分析大屏',
  type: 'data-analysis',
  description: '分析企业各季度销售业绩，展示销售趋势、同比环比增长、销售漏斗等。',
  createTime: '2023-02-15',
  lastModified: '2023-03-01',
  creator: '王五',
  template: 'template-2',
  accessCount: 3650,
  isPublished: true,
  // 页面布局
  layout: [
    {
      id: 'header',
      component: 'header-title',
      componentData: {
        ...commonComponents.headerTitle,
        title: '企业销售业绩分析大屏',
        subtitle: '实时销售数据分析与监控'
      },
      position: { x: 0, y: 0, w: 24, h: 2 }
    },
    {
      id: 'dataCards',
      component: 'data-cards',
      componentData: {
        ...commonComponents.dataCards,
        items: [
          { title: '本季度销售额', value: '¥836,560', ratio: '+8.5%', icon: 'money' },
          { title: '本季度订单量', value: '12,856', ratio: '+6.2%', icon: 'shopping' },
          { title: '本季度新客户', value: '1,526', ratio: '+5.5%', icon: 'user' },
          { title: '本季度退款率', value: '0.8%', ratio: '-0.2%', icon: 'refund' }
        ]
      },
      position: { x: 0, y: 2, w: 24, h: 3 }
    },
    {
      id: 'salesTrend',
      component: 'line-chart',
      componentData: {
        ...commonComponents.lineChart,
        title: '季度销售趋势分析',
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        series: [
          {
            name: '2022年',
            type: 'line',
            data: [6500, 5000, 8500, 9000, 9500, 10000, 9200, 8900, 11300, 12000, 11800, 13500],
            smooth: true
          },
          {
            name: '2023年',
            type: 'line',
            data: [7500, 6800, 9200, 10000, 10500, 11000, 10300, 10000, 12500, 13300, 13000, 15000],
            smooth: true
          }
        ]
      },
      position: { x: 0, y: 5, w: 16, h: 8 }
    },
    {
      id: 'salesDistribution',
      component: 'pie-chart',
      componentData: {
        ...commonComponents.pieChart,
        title: '销售产品类别分布',
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: 40, name: '企业解决方案' },
              { value: 25, name: '定制开发服务' },
              { value: 20, name: '产品授权' },
              { value: 10, name: '技术支持服务' },
              { value: 5, name: '培训服务' }
            ]
          }
        ]
      },
      position: { x: 16, y: 5, w: 8, h: 8 }
    },
    {
      id: 'salesByRegion',
      component: 'bar-chart',
      componentData: {
        ...commonComponents.barChart,
        title: '各区域销售额对比',
        xAxis: {
          type: 'category',
          data: ['华东', '华南', '华北', '华中', '西南', '西北', '东北']
        },
        series: [
          {
            name: '去年同期',
            type: 'bar',
            data: [28000, 22000, 18000, 16000, 12000, 8000, 9000]
          },
          {
            name: '本季度',
            type: 'bar',
            data: [32000, 24000, 20000, 17500, 13000, 9000, 10000]
          }
        ]
      },
      position: { x: 0, y: 13, w: 12, h: 8 }
    },
    {
      id: 'salesFunnel',
      component: 'funnel-chart',
      componentData: {
        ...commonComponents.funnelChart,
        title: '销售转化漏斗',
        series: [
          {
            type: 'funnel',
            data: [
              { value: 150000, name: '销售线索' },
              { value: 90000, name: '商务接洽' },
              { value: 60000, name: '方案制定' },
              { value: 40000, name: '合同签订' },
              { value: 30000, name: '项目交付' }
            ]
          }
        ]
      },
      position: { x: 12, y: 13, w: 12, h: 8 }
    },
    {
      id: 'topProducts',
      component: 'data-table',
      componentData: {
        ...commonComponents.tableData,
        title: '本季度产品销售额排行',
        columns: [
          { label: '排名', prop: 'rank' },
          { label: '产品名称', prop: 'name' },
          { label: '销售额', prop: 'amount' },
          { label: '同比增长', prop: 'growth' }
        ],
        data: [
          { rank: 1, name: '企业云服务解决方案', amount: '¥12,580,000', growth: '+15%' },
          { rank: 2, name: '数据中心智能管理系统', amount: '¥9,450,000', growth: '+12%' },
          { rank: 3, name: '企业级安全防护系统', amount: '¥8,320,000', growth: '+8%' },
          { rank: 4, name: '物联网平台服务', amount: '¥7,580,000', growth: '+10%' },
          { rank: 5, name: '全栈开发者工具套件', amount: '¥6,260,000', growth: '+6%' }
        ]
      },
      position: { x: 0, y: 21, w: 24, h: 6 }
    }
  ]
}

// 员工绩效监控大屏
const employeePerformanceScreen = {
  id: 'crmp239crm20bbbb',
  name: '员工绩效监控大屏',
  type: 'data-analysis',
  description: '展示企业各部门员工绩效情况，包含完成率、达成率、同环比等指标。',
  createTime: '2023-03-10',
  lastModified: '2023-03-15',
  creator: '赵六',
  template: 'template-2',
  accessCount: 1230,
  isPublished: false,
  // 页面布局
  layout: [
    {
      id: 'header',
      component: 'header-title',
      componentData: {
        ...commonComponents.headerTitle,
        title: '员工绩效监控大屏',
        subtitle: '实时员工绩效数据分析与监控'
      },
      position: { x: 0, y: 0, w: 24, h: 2 }
    },
    {
      id: 'performanceCards',
      component: 'data-cards',
      componentData: {
        ...commonComponents.dataCards,
        items: [
          { title: '员工总数', value: '325', ratio: '+5.2%', icon: 'user' },
          { title: '平均绩效分', value: '86.5', ratio: '+2.3%', icon: 'chart' },
          { title: '任务完成率', value: '92.6%', ratio: '+1.8%', icon: 'task' },
          { title: '绩效达标率', value: '88.2%', ratio: '+3.5%', icon: 'success' }
        ]
      },
      position: { x: 0, y: 2, w: 24, h: 3 }
    },
    {
      id: 'departmentPerformance',
      component: 'bar-chart',
      componentData: {
        ...commonComponents.barChart,
        title: '各部门绩效评分',
        xAxis: {
          type: 'category',
          data: ['研发部', '市场部', '销售部', '客服部', '财务部', '人力资源', '运维部']
        },
        yAxis: {
          type: 'value',
          max: 100
        },
        series: [
          {
            name: '上季度',
            type: 'bar',
            data: [85, 78, 92, 86, 82, 80, 88]
          },
          {
            name: '本季度',
            type: 'bar',
            data: [88, 82, 94, 89, 84, 83, 90]
          }
        ]
      },
      position: { x: 0, y: 5, w: 14, h: 8 }
    },
    {
      id: 'performanceDistribution',
      component: 'pie-chart',
      componentData: {
        ...commonComponents.pieChart,
        title: '员工绩效等级分布',
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: 15, name: '优秀(A+)' },
              { value: 30, name: '良好(A)' },
              { value: 40, name: '合格(B)' },
              { value: 10, name: '待改进(C)' },
              { value: 5, name: '不合格(D)' }
            ]
          }
        ]
      },
      position: { x: 14, y: 5, w: 10, h: 8 }
    },
    {
      id: 'performanceTrend',
      component: 'line-chart',
      componentData: {
        ...commonComponents.lineChart,
        title: '员工绩效趋势分析',
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        series: [
          {
            name: '优秀率',
            type: 'line',
            data: [12, 15, 14, 16, 15, 18, 20, 19, 18, 21, 22, 24],
            smooth: true
          },
          {
            name: '达标率',
            type: 'line',
            data: [82, 85, 84, 86, 88, 90, 91, 90, 92, 93, 94, 95],
            smooth: true
          }
        ]
      },
      position: { x: 0, y: 13, w: 24, h: 8 }
    },
    {
      id: 'topPerformers',
      component: 'data-table',
      componentData: {
        ...commonComponents.tableData,
        title: '绩效优秀员工排行',
        columns: [
          { label: '排名', prop: 'rank' },
          { label: '姓名', prop: 'name' },
          { label: '部门', prop: 'department' },
          { label: '职位', prop: 'position' },
          { label: '绩效分', prop: 'score' },
          { label: '同比增长', prop: 'growth' }
        ],
        data: [
          { rank: 1, name: '张三', department: '销售部', position: '销售经理', score: '98.5', growth: '+5.2%' },
          { rank: 2, name: '李四', department: '研发部', position: '高级工程师', score: '97.2', growth: '+3.8%' },
          { rank: 3, name: '王五', department: '市场部', position: '市场总监', score: '96.8', growth: '+4.5%' },
          { rank: 4, name: '赵六', department: '研发部', position: '产品经理', score: '95.5', growth: '+2.5%' },
          { rank: 5, name: '钱七', department: '运维部', position: '运维主管', score: '94.8', growth: '+6.2%' }
        ]
      },
      position: { x: 0, y: 21, w: 24, h: 6 }
    }
  ]
}

// 数据分析大屏模板
const dataAnalysisTemplates = [
  {
    id: 'default',
    name: '通用数据分析模板',
    description: '适用于各类数据分析场景的通用模板，包含多种图表和数据展示组件',
    preview: '/images/templates/data-analysis-default.jpg',
    // 页面布局
    layout: [
      {
        id: 'header',
        component: 'header-title',
        componentData: {
          ...commonComponents.headerTitle
        },
        position: { x: 0, y: 0, w: 24, h: 2 }
      },
      {
        id: 'dataCards',
        component: 'data-cards',
        componentData: {
          ...commonComponents.dataCards
        },
        position: { x: 0, y: 2, w: 24, h: 3 }
      },
      {
        id: 'lineChart',
        component: 'line-chart',
        componentData: {
          ...commonComponents.lineChart
        },
        position: { x: 0, y: 5, w: 16, h: 8 }
      },
      {
        id: 'pieChart',
        component: 'pie-chart',
        componentData: {
          ...commonComponents.pieChart
        },
        position: { x: 16, y: 5, w: 8, h: 8 }
      },
      {
        id: 'barChart',
        component: 'bar-chart',
        componentData: {
          ...commonComponents.barChart
        },
        position: { x: 0, y: 13, w: 12, h: 8 }
      },
      {
        id: 'funnelChart',
        component: 'funnel-chart',
        componentData: {
          ...commonComponents.funnelChart
        },
        position: { x: 12, y: 13, w: 12, h: 8 }
      },
      {
        id: 'tableData',
        component: 'data-table',
        componentData: {
          ...commonComponents.tableData
        },
        position: { x: 0, y: 21, w: 24, h: 6 }
      }
    ]
  },
  {
    id: 'sales-analysis',
    name: '销售数据分析模板',
    description: '专为销售数据分析定制的模板，重点展示销售趋势、区域分布、产品排行等',
    preview: '/images/templates/data-analysis-sales.jpg',
    // 与销售分析大屏相同的布局
    layout: salesAnalysisScreen.layout
  },
  {
    id: 'performance-analysis',
    name: '绩效分析模板',
    description: '专为员工绩效分析定制的模板，重点展示部门绩效、员工评分、完成率等',
    preview: '/images/templates/data-analysis-performance.jpg',
    // 与员工绩效大屏相同的布局
    layout: employeePerformanceScreen.layout
  }
]

export default {
  // 所有屏幕数据
  screens: [
    salesAnalysisScreen,
    employeePerformanceScreen
  ],
  // 所有模板
  templates: dataAnalysisTemplates,
  // 公共组件
  components: commonComponents
} 