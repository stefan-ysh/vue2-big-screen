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
// 数据分析大屏模板
const standardTemplate = {
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
};

const salesTemplate = {
  id: 'sales-analysis',
  name: '销售数据分析模板',
  description: '专为销售数据分析定制的模板，重点展示销售趋势、区域分布、产品排行等',
  preview: '/images/templates/data-analysis-sales.jpg',
  // 与销售分析大屏相同的布局
  layout: salesAnalysisScreen.layout
};

const marketingTemplate = {
  id: 'marketing-analysis',
  name: '营销数据分析模板',
  description: '专为营销数据分析定制的模板',
  preview: '/images/templates/data-analysis-marketing.jpg',
  layout: []
};

const financeTemplate = {
  id: 'finance-analysis',
  name: '财务数据分析模板',
  description: '专为财务数据分析定制的模板',
  preview: '/images/templates/data-analysis-finance.jpg',
  layout: []
};

const operationTemplate = {
  id: 'operation-analysis',
  name: '运营数据分析模板',
  description: '专为运营数据分析定制的模板',
  preview: '/images/templates/data-analysis-operation.jpg',
  layout: []
};

// 其他大屏数据定义
const marketingAnalysisScreen = {
  id: 'marketing001',
  name: '营销分析大屏',
  type: 'data-analysis',
  description: '营销活动分析大屏',
  createTime: '2023-01-15',
  lastModified: '2023-02-01',
  creator: '营销部',
  template: 'template-1',
  accessCount: 2650,
  isPublished: true,
  layout: []
};

const userAnalysisScreen = {
  id: 'user001',
  name: '用户分析大屏',
  type: 'data-analysis',
  description: '用户行为分析大屏',
  createTime: '2023-01-10',
  lastModified: '2023-01-20',
  creator: '用户运营',
  template: 'template-1',
  accessCount: 3120,
  isPublished: true,
  layout: []
};

const productAnalysisScreen = {
  id: 'product001',
  name: '产品分析大屏',
  type: 'data-analysis',
  description: '产品使用分析大屏',
  createTime: '2023-01-05',
  lastModified: '2023-01-15',
  creator: '产品部',
  template: 'template-1',
  accessCount: 2850,
  isPublished: true,
  layout: []
};

const operationAnalysisScreen = {
  id: 'operation001',
  name: '运营分析大屏',
  type: 'data-analysis',
  description: '平台运营分析大屏',
  createTime: '2022-12-20',
  lastModified: '2023-01-10',
  creator: '运营部',
  template: 'template-1',
  accessCount: 3450,
  isPublished: true,
  layout: []
};

const financialAnalysisScreen = {
  id: 'financial001',
  name: '财务分析大屏',
  type: 'data-analysis',
  description: '财务数据分析大屏',
  createTime: '2022-12-15',
  lastModified: '2023-01-05',
  creator: '财务部',
  template: 'template-1',
  accessCount: 1850,
  isPublished: true,
  layout: []
};

const logisticsAnalysisScreen = {
  id: 'logistics001',
  name: '物流分析大屏',
  type: 'data-analysis',
  description: '物流数据分析大屏',
  createTime: '2022-12-10',
  lastModified: '2022-12-25',
  creator: '物流部',
  template: 'template-1',
  accessCount: 2250,
  isPublished: false,
  layout: []
};

// 导出默认数据结构
export default {
  // 组件库
  components: commonComponents,
  
  // 模板列表
  templates: [
    standardTemplate,
    salesTemplate,
    marketingTemplate,
    financeTemplate,
    operationTemplate
  ],
  
  // 具体大屏列表
  screens: [
    salesAnalysisScreen,
    marketingAnalysisScreen,
    userAnalysisScreen,
    productAnalysisScreen,
    operationAnalysisScreen,
    financialAnalysisScreen,
    logisticsAnalysisScreen
  ],
  
  // 不同示例数据集
  examples: {
    // 电商数据示例
    ecommerce: {
      name: '电商数据分析',
      description: '电子商务平台的销售、用户、转化率等数据分析',
      components: {
        // 电商特定的数据卡片
        dataCards: {
          type: 'data-cards',
          layout: 'horizontal',
          items: [
            { title: '昨日GMV', value: '¥2,356,560', ratio: '+15.2%', icon: 'money' },
            { title: '昨日新增用户', value: '8,856', ratio: '+12.3%', icon: 'user' },
            { title: '昨日订单量', value: '32,526', ratio: '+9.8%', icon: 'shopping' },
            { title: '转化率', value: '6.28%', ratio: '+0.5%', icon: 'conversion' }
          ]
        },
        // 电商特定的折线图
        lineChart: {
          type: 'line-chart',
          title: '平台GMV趋势',
          xAxis: {
            type: 'category',
            data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
          },
          yAxis: {
            type: 'value',
            name: 'GMV (万元)'
          },
          series: [
            {
              name: '前日',
              type: 'line',
              data: [35, 20, 15, 12, 25, 65, 80, 70, 60, 90, 160, 95],
              smooth: true,
              lineStyle: { color: '#5470c6' }
            },
            {
              name: '昨日',
              type: 'line',
              data: [40, 25, 18, 15, 30, 75, 95, 80, 70, 110, 185, 120],
              smooth: true,
              lineStyle: { color: '#91cc75' }
            }
          ]
        },
        // 电商特定的饼图
        pieChart: {
          type: 'pie-chart',
          title: '商品类目销售占比',
          series: [
            {
              name: '销售占比',
              type: 'pie',
              radius: ['40%', '70%'],
              data: [
                { value: 1048, name: '服装鞋帽' },
                { value: 735, name: '数码家电' },
                { value: 580, name: '美妆护肤' },
                { value: 484, name: '食品饮料' },
                { value: 300, name: '家居用品' }
              ]
            }
          ]
        },
        // 电商特定的柱状图
        barChart: {
          type: 'bar-chart',
          title: '各渠道订单量对比',
          xAxis: {
            type: 'category',
            data: ['APP', '小程序', 'H5', 'PC官网', '第三方平台']
          },
          yAxis: {
            type: 'value',
            name: '订单量'
          },
          series: [
            {
              name: '订单量',
              type: 'bar',
              data: [15680, 12450, 8960, 6780, 4320],
              itemStyle: {
                color: '#5470c6'
              }
            }
          ]
        },
        // 电商特定的漏斗图
        funnelChart: {
          type: 'funnel-chart',
          title: '用户转化漏斗',
          series: [
            {
              name: '转化漏斗',
              type: 'funnel',
              left: '10%',
              top: 60,
              width: '80%',
              height: '80%',
              data: [
                { value: 100000, name: '访问用户' },
                { value: 35000, name: '浏览商品' },
                { value: 12000, name: '加入购物车' },
                { value: 8500, name: '提交订单' },
                { value: 6280, name: '支付成功' }
              ]
            }
          ]
        },
        // 电商特定的表格数据
        tableData: {
          type: 'data-table',
          title: '热销商品排行',
          columns: [
            { prop: 'rank', label: '排名', width: 80 },
            { prop: 'productName', label: '商品名称', width: 200 },
            { prop: 'category', label: '类目', width: 120 },
            { prop: 'sales', label: '销量', width: 100 },
            { prop: 'revenue', label: '销售额', width: 120 },
            { prop: 'growth', label: '增长率', width: 100 }
          ],
          data: [
            { rank: 1, productName: 'iPhone 15 Pro', category: '数码', sales: '2,856', revenue: '¥2,856万', growth: '+25.6%' },
            { rank: 2, productName: '戴森吹风机', category: '家电', sales: '1,968', revenue: '¥786万', growth: '+18.9%' },
            { rank: 3, productName: 'Nike运动鞋', category: '服装', sales: '1,756', revenue: '¥526万', growth: '+12.3%' },
            { rank: 4, productName: '雅诗兰黛套装', category: '美妆', sales: '1,456', revenue: '¥436万', growth: '+8.7%' },
            { rank: 5, productName: '小米手机', category: '数码', sales: '1,256', revenue: '¥376万', growth: '+15.2%' }
          ]
        },
        // 电商特定的标题
        headerTitle: {
          type: 'header-title',
          title: '电商平台数据分析大屏',
          subtitle: '实时监控平台销售数据、用户行为和业务指标',
          updateTime: '2024-01-15 14:30:25'
        }
      },
      templates: [
        {
          ...standardTemplate,
          name: '电商数据分析模板',
          description: '适用于电商平台的数据分析大屏，包含销售、用户、转化率等数据指标'
        }
      ],
      screens: [
        {
          id: 'ecommerce001',
          name: '电商618活动数据大屏',
          type: 'data-analysis',
          description: '618大促期间的实时销售监控大屏，展示平台GMV、转化率、用户数据等',
          createTime: '2023-05-15',
          lastModified: '2023-06-18',
          creator: '电商运营部',
          template: 'template-1',
          accessCount: 15680,
          isPublished: true,
          layout: []
        },
        {
          id: 'ecommerce002',
          name: '电商用户行为分析大屏',
          type: 'data-analysis',
          description: '分析用户浏览、加购、下单等行为数据，优化转化路径',
          createTime: '2023-04-10',
          lastModified: '2023-05-20',
          creator: '用户增长团队',
          template: 'template-2',
          accessCount: 8560,
          isPublished: true,
          layout: []
        }
      ]
    },
    
    // 零售行业示例
    retail: {
      name: '零售行业分析',
      description: '实体零售门店的销售、客流、库存等数据分析',
      components: {
        // 零售特定的数据卡片
        dataCards: {
          type: 'data-cards',
          layout: 'horizontal',
          items: [
            { title: '今日销售额', value: '¥568,320', ratio: '+8.5%', icon: 'money' },
            { title: '今日客流量', value: '12,568', ratio: '+6.2%', icon: 'customer' },
            { title: '客单价', value: '¥45.2', ratio: '+3.8%', icon: 'price' },
            { title: '库存周转率', value: '3.6次/月', ratio: '+0.2', icon: 'stock' }
          ]
        },
        // 零售特定的折线图
        lineChart: {
          type: 'line-chart',
          title: '门店客流量趋势',
          xAxis: {
            type: 'category',
            data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
          },
          yAxis: {
            type: 'value',
            name: '客流量 (人)'
          },
          series: [
            {
              name: '昨日',
              type: 'line',
              data: [120, 180, 250, 320, 280, 350, 420, 480, 520, 680, 750, 580],
              smooth: true,
              lineStyle: { color: '#5470c6' }
            },
            {
              name: '今日',
              type: 'line',
              data: [135, 195, 275, 350, 310, 380, 450, 520, 580, 720, 820, 650],
              smooth: true,
              lineStyle: { color: '#91cc75' }
            }
          ]
        },
        // 零售特定的饼图
        pieChart: {
          type: 'pie-chart',
          title: '商品品类销售占比',
          series: [
            {
              name: '销售占比',
              type: 'pie',
              radius: ['40%', '70%'],
              data: [
                { value: 2048, name: '服装' },
                { value: 1535, name: '食品' },
                { value: 1280, name: '日用品' },
                { value: 984, name: '化妆品' },
                { value: 600, name: '其他' }
              ]
            }
          ]
        },
        // 零售特定的柱状图
        barChart: {
          type: 'bar-chart',
          title: '各门店销售额对比',
          xAxis: {
            type: 'category',
            data: ['旗舰店', '万达店', '银泰店', '大悦城店', '奥特莱斯店']
          },
          yAxis: {
            type: 'value',
            name: '销售额 (万元)'
          },
          series: [
            {
              name: '销售额',
              type: 'bar',
              data: [156.8, 124.5, 89.6, 67.8, 43.2],
              itemStyle: {
                color: '#ee6666'
              }
            }
          ]
        },
        // 零售特定的漏斗图
        funnelChart: {
          type: 'funnel-chart',
          title: '客户购买转化漏斗',
          series: [
            {
              name: '转化漏斗',
              type: 'funnel',
              left: '10%',
              top: 60,
              width: '80%',
              height: '80%',
              data: [
                { value: 12568, name: '进店客流' },
                { value: 8956, name: '浏览商品' },
                { value: 5680, name: '试用体验' },
                { value: 3456, name: '咨询导购' },
                { value: 2156, name: '完成购买' }
              ]
            }
          ]
        },
        // 零售特定的表格数据
        tableData: {
          type: 'data-table',
          title: '门店业绩排行',
          columns: [
            { prop: 'rank', label: '排名', width: 80 },
            { prop: 'storeName', label: '门店名称', width: 150 },
            { prop: 'location', label: '所在城市', width: 120 },
            { prop: 'sales', label: '销售额', width: 120 },
            { prop: 'traffic', label: '客流量', width: 100 },
            { prop: 'conversion', label: '转化率', width: 100 }
          ],
          data: [
            { rank: 1, storeName: '北京旗舰店', location: '北京', sales: '¥156.8万', traffic: '3,256', conversion: '18.5%' },
            { rank: 2, storeName: '上海万达店', location: '上海', sales: '¥124.5万', traffic: '2,968', conversion: '16.8%' },
            { rank: 3, storeName: '深圳银泰店', location: '深圳', sales: '¥89.6万', traffic: '2,156', conversion: '15.2%' },
            { rank: 4, storeName: '广州大悦城店', location: '广州', sales: '¥67.8万', traffic: '1,856', conversion: '14.6%' },
            { rank: 5, storeName: '杭州奥特莱斯店', location: '杭州', sales: '¥43.2万', traffic: '1,456', conversion: '12.8%' }
          ]
        },
        // 零售特定的标题
        headerTitle: {
          type: 'header-title',
          title: '零售连锁门店数据分析大屏',
          subtitle: '实时监控全国门店销售数据、客流分析和库存管理',
          updateTime: '2024-01-15 14:30:25'
        }
      },
      templates: [
        {
          ...standardTemplate,
          name: '零售行业分析模板',
          description: '适用于零售行业的数据分析大屏，包含销售、客流、库存等数据指标'
        }
      ],
      screens: [
        {
          id: 'retail001',
          name: '全国连锁门店销售大屏',
          type: 'data-analysis',
          description: '监控全国各地连锁门店的销售情况，对比不同区域和门店的业绩',
          createTime: '2023-03-15',
          lastModified: '2023-04-10',
          creator: '零售分析师',
          template: 'template-1',
          accessCount: 5680,
          isPublished: true,
          layout: []
        }
      ]
    },
    
    // 教育行业示例
    education: {
      name: '教育行业分析',
      description: '教育机构的招生、课程、学员等数据分析',
      components: {
        // 教育特定的数据卡片
        dataCards: {
          type: 'data-cards',
          layout: 'horizontal',
          items: [
            { title: '本月招生数', value: '1,286人', ratio: '+12.5%', icon: 'student' },
            { title: '续班率', value: '85.6%', ratio: '+3.2%', icon: 'renew' },
            { title: '平均课耗', value: '4.2课时/周', ratio: '+0.5', icon: 'class' },
            { title: '新增咨询量', value: '3,568', ratio: '+15.8%', icon: 'consult' }
          ]
        },
        // 教育特定的折线图
        lineChart: {
          type: 'line-chart',
          title: '月度招生趋势',
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          yAxis: {
            type: 'value',
            name: '招生人数'
          },
          series: [
            {
              name: '去年',
              type: 'line',
              data: [856, 456, 1256, 1856, 2156, 1956, 2456, 2856, 3156, 2756, 2356, 1856],
              smooth: true,
              lineStyle: { color: '#5470c6' }
            },
            {
              name: '今年',
              type: 'line',
              data: [956, 556, 1456, 2056, 2456, 2256, 2756, 3256, 3556, 3156, 2756, 2156],
              smooth: true,
              lineStyle: { color: '#91cc75' }
            }
          ]
        },
        // 教育特定的饼图
        pieChart: {
          type: 'pie-chart',
          title: '课程类型分布',
          series: [
            {
              name: '课程分布',
              type: 'pie',
              radius: ['40%', '70%'],
              data: [
                { value: 3048, name: '数学' },
                { value: 2535, name: '英语' },
                { value: 1880, name: '语文' },
                { value: 1284, name: '物理' },
                { value: 800, name: '化学' }
              ]
            }
          ]
        },
        // 教育特定的柱状图
        barChart: {
          type: 'bar-chart',
          title: '各年级学员分布',
          xAxis: {
            type: 'category',
            data: ['小学1-3年级', '小学4-6年级', '初中', '高中', '成人教育']
          },
          yAxis: {
            type: 'value',
            name: '学员人数'
          },
          series: [
            {
              name: '学员人数',
              type: 'bar',
              data: [2568, 3456, 4256, 3856, 1256],
              itemStyle: {
                color: '#fac858'
              }
            }
          ]
        },
        // 教育特定的漏斗图
        funnelChart: {
          type: 'funnel-chart',
          title: '招生转化漏斗',
          series: [
            {
              name: '转化漏斗',
              type: 'funnel',
              left: '10%',
              top: 60,
              width: '80%',
              height: '80%',
              data: [
                { value: 8568, name: '咨询量' },
                { value: 5680, name: '试听课' },
                { value: 3456, name: '意向报名' },
                { value: 2156, name: '缴费报名' },
                { value: 1856, name: '正式入学' }
              ]
            }
          ]
        },
        // 教育特定的表格数据
        tableData: {
          type: 'data-table',
          title: '优秀教师排行',
          columns: [
            { prop: 'rank', label: '排名', width: 80 },
            { prop: 'teacherName', label: '教师姓名', width: 120 },
            { prop: 'subject', label: '任教科目', width: 100 },
            { prop: 'students', label: '学员数', width: 100 },
            { prop: 'satisfaction', label: '满意度', width: 100 },
            { prop: 'renewal', label: '续班率', width: 100 }
          ],
          data: [
            { rank: 1, teacherName: '张老师', subject: '数学', students: '156', satisfaction: '98.5%', renewal: '92.3%' },
            { rank: 2, teacherName: '李老师', subject: '英语', students: '142', satisfaction: '97.8%', renewal: '89.6%' },
            { rank: 3, teacherName: '王老师', subject: '语文', students: '138', satisfaction: '96.9%', renewal: '87.2%' },
            { rank: 4, teacherName: '刘老师', subject: '物理', students: '125', satisfaction: '96.2%', renewal: '85.8%' },
            { rank: 5, teacherName: '陈老师', subject: '化学', students: '118', satisfaction: '95.6%', renewal: '84.3%' }
          ]
        },
        // 教育特定的标题
        headerTitle: {
          type: 'header-title',
          title: '教育培训机构数据分析大屏',
          subtitle: '全面监控招生数据、教学质量和学员管理',
          updateTime: '2024-01-15 14:30:25'
        }
      },
      templates: [
        {
          ...standardTemplate,
          name: '教育行业分析模板',
          description: '适用于教育培训机构的数据分析大屏，包含招生、续班、课耗等数据指标'
        }
      ],
      screens: [
        {
          id: 'education001',
          name: '教育机构运营分析大屏',
          type: 'data-analysis',
          description: '全面分析教育机构的招生、续班、教学、财务等运营数据',
          createTime: '2023-02-10',
          lastModified: '2023-03-15',
          creator: '教育运营总监',
          template: 'template-1',
          accessCount: 3250,
          isPublished: true,
          layout: []
        }
      ]
    },

    // 金融行业示例
    finance: {
      name: '金融行业分析',
      description: '金融机构的业务数据、风险控制、客户分析等数据监控',
      components: {
        // 金融特定的数据卡片
        dataCards: {
          type: 'data-cards',
          layout: 'horizontal',
          items: [
            { title: '今日交易额', value: '¥15.68亿', ratio: '+8.9%', icon: 'money' },
            { title: '活跃用户数', value: '286.5万', ratio: '+5.6%', icon: 'user' },
            { title: '风险预警', value: '23笔', ratio: '-12.5%', icon: 'warning' },
            { title: '资产规模', value: '¥1,256亿', ratio: '+2.3%', icon: 'asset' }
          ]
        },
        // 金融特定的折线图
        lineChart: {
          type: 'line-chart',
          title: '日交易量趋势',
          xAxis: {
            type: 'category',
            data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
          },
          yAxis: {
            type: 'value',
            name: '交易额 (亿元)'
          },
          series: [
            {
              name: '昨日',
              type: 'line',
              data: [0.5, 0.3, 0.8, 3.2, 5.6, 4.8, 2.1, 1.2],
              smooth: true,
              lineStyle: { color: '#5470c6' }
            },
            {
              name: '今日',
              type: 'line',
              data: [0.6, 0.4, 0.9, 3.8, 6.2, 5.4, 2.5, 1.5],
              smooth: true,
              lineStyle: { color: '#91cc75' }
            }
          ]
        },
        // 金融特定的饼图
        pieChart: {
          type: 'pie-chart',
          title: '业务类型分布',
          series: [
            {
              name: '业务分布',
              type: 'pie',
              radius: ['40%', '70%'],
              data: [
                { value: 4048, name: '个人理财' },
                { value: 3535, name: '企业贷款' },
                { value: 2880, name: '投资基金' },
                { value: 1884, name: '保险业务' },
                { value: 1200, name: '其他业务' }
              ]
            }
          ]
        },
        // 金融特定的柱状图
        barChart: {
          type: 'bar-chart',
          title: '各产品收益对比',
          xAxis: {
            type: 'category',
            data: ['货币基金', '债券基金', '股票基金', '混合基金', '理财产品']
          },
          yAxis: {
            type: 'value',
            name: '年化收益率 (%)'
          },
          series: [
            {
              name: '年化收益率',
              type: 'bar',
              data: [2.8, 4.2, 8.6, 6.5, 3.9],
              itemStyle: {
                color: '#73c0de'
              }
            }
          ]
        },
        // 金融特定的漏斗图
        funnelChart: {
          type: 'funnel-chart',
          title: '客户转化漏斗',
          series: [
            {
              name: '转化漏斗',
              type: 'funnel',
              left: '10%',
              top: 60,
              width: '80%',
              height: '80%',
              data: [
                { value: 50000, name: '潜在客户' },
                { value: 25000, name: '意向客户' },
                { value: 12000, name: '申请开户' },
                { value: 8500, name: '完成开户' },
                { value: 6200, name: '首次交易' }
              ]
            }
          ]
        },
        // 金融特定的表格数据
        tableData: {
          type: 'data-table',
          title: '热门理财产品',
          columns: [
            { prop: 'rank', label: '排名', width: 80 },
            { prop: 'productName', label: '产品名称', width: 180 },
            { prop: 'type', label: '产品类型', width: 120 },
            { prop: 'yield', label: '年化收益', width: 100 },
            { prop: 'amount', label: '申购金额', width: 120 },
            { prop: 'risk', label: '风险等级', width: 100 }
          ],
          data: [
            { rank: 1, productName: '稳健增长理财计划', type: '混合型', yield: '6.5%', amount: '¥12.8亿', risk: '中等' },
            { rank: 2, productName: '货币增值基金', type: '货币型', yield: '2.8%', amount: '¥8.6亿', risk: '低' },
            { rank: 3, productName: '成长精选股票基金', type: '股票型', yield: '8.6%', amount: '¥6.2亿', risk: '高' },
            { rank: 4, productName: '债券稳健基金', type: '债券型', yield: '4.2%', amount: '¥4.8亿', risk: '中低' },
            { rank: 5, productName: '短期理财产品', type: '理财型', yield: '3.9%', amount: '¥3.2亿', risk: '低' }
          ]
        },
        // 金融特定的标题
        headerTitle: {
          type: 'header-title',
          title: '金融机构业务数据分析大屏',
          subtitle: '实时监控交易数据、风险控制和客户资产管理',
          updateTime: '2024-01-15 14:30:25'
        }
      },
      templates: [
        {
          ...standardTemplate,
          name: '金融行业分析模板',
          description: '适用于金融机构的数据分析大屏，包含交易、风控、客户等数据指标'
        }
      ],
      screens: [
        {
          id: 'finance001',
          name: '金融机构风控监控大屏',
          type: 'data-analysis',
          description: '实时监控金融交易风险、客户资产和业务数据',
          createTime: '2023-01-20',
          lastModified: '2023-02-15',
          creator: '风控部门',
          template: 'template-1',
          accessCount: 4250,
          isPublished: true,
          layout: []
        }
      ]
    }
  }
} 