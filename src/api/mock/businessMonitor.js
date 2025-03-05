/**
 * 业务监控类型大屏的mock数据
 */

// 公共组件
const commonComponents = {
  // 标题组件
  headerTitle: {
    type: 'header-title',
    title: '业务监控大屏',
    subtitle: '实时业务数据监控',
    style: {
      fontSize: 36,
      color: '#fff',
      textAlign: 'center'
    }
  },
  // 指标卡片组
  metricCards: {
    type: 'metric-cards',
    layout: 'horizontal',
    items: [
      { title: '服务器状态', value: '正常', status: 'success', icon: 'server' },
      { title: 'CPU使用率', value: '45%', status: 'normal', icon: 'cpu' },
      { title: '内存使用率', value: '62%', status: 'warning', icon: 'memory' },
      { title: '磁盘使用率', value: '78%', status: 'warning', icon: 'disk' }
    ]
  },
  // 实时折线图
  realtimeChart: {
    type: 'realtime-chart',
    title: '系统负载实时监控',
    subtitle: '最近30分钟数据',
    xAxis: {
      type: 'time',
      data: Array.from({ length: 30 }, (_, i) => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - 30 + i);
        return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      })
    },
    yAxis: {
      type: 'value',
      max: 100
    },
    series: [
      {
        name: 'CPU',
        type: 'line',
        smooth: true,
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 40) + 30)
      },
      {
        name: '内存',
        type: 'line',
        smooth: true,
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 50)
      },
      {
        name: '磁盘I/O',
        type: 'line',
        smooth: true,
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 20)
      }
    ]
  },
  // 仪表盘
  gauge: {
    type: 'gauge-chart',
    title: '系统健康度',
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#ff4d4f'],
              [0.7, '#faad14'],
              [1, '#52c41a']
            ]
          }
        },
        pointer: {
          length: '60%',
          width: 8,
          itemStyle: {
            color: 'auto'
          }
        },
        detail: {
          formatter: '{value}%',
          fontSize: 30
        },
        data: [{ value: 85, name: '健康度' }]
      }
    ]
  },
  // 环形饼图
  donutChart: {
    type: 'donut-chart',
    title: '访问来源分布',
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 45, name: '直接访问' },
          { value: 25, name: '搜索引擎' },
          { value: 15, name: '社交媒体' },
          { value: 10, name: '电子邮件' },
          { value: 5, name: '其他' }
        ]
      }
    ]
  },
  // 告警列表
  alertTable: {
    type: 'alert-table',
    title: '系统告警信息',
    columns: [
      { label: '时间', prop: 'time' },
      { label: '级别', prop: 'level' },
      { label: '内容', prop: 'content' },
      { label: '状态', prop: 'status' }
    ],
    data: [
      { time: '10:25:34', level: '严重', content: '数据库连接中断', status: '处理中' },
      { time: '09:45:12', level: '警告', content: '内存使用率超过80%', status: '已解决' },
      { time: '08:32:56', level: '一般', content: 'API响应时间过长', status: '监控中' },
      { time: '07:15:43', level: '警告', content: '磁盘空间不足', status: '已解决' },
      { time: '06:58:22', level: '严重', content: '防火墙规则异常', status: '已解决' }
    ]
  },
  // 热力图
  heatmapChart: {
    type: 'heatmap-chart',
    title: '服务器集群负载热力图',
    xAxis: {
      type: 'category',
      data: ['服务器01', '服务器02', '服务器03', '服务器04', '服务器05', '服务器06', '服务器07', '服务器08']
    },
    yAxis: {
      type: 'category',
      data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%'
    },
    series: [
      {
        type: 'heatmap',
        data: Array.from({ length: 64 }, (_, i) => {
          const x = i % 8;
          const y = Math.floor(i / 8);
          return [x, y, Math.floor(Math.random() * 100)];
        })
      }
    ]
  }
};

// 双十一成交量数据监控大屏
const doubleElevenScreen = {
  id: 'c32ionc2oi3rnc2',
  name: '双十一成交量数据监控大屏',
  type: 'business-monitor',
  description: '实时监控双十一期间各平台销售情况，包含交易量、销售额、地域分布等多维数据。',
  createTime: '2022-11-01',
  lastModified: '2022-11-10',
  creator: '张三',
  template: 'template-1',
  accessCount: 12500,
  isPublished: true,
  // 页面布局
  layout: [
    {
      id: 'header',
      component: 'header-title',
      componentData: {
        ...commonComponents.headerTitle,
        title: '双十一成交量数据监控大屏',
        subtitle: '实时电商平台销售数据分析'
      },
      position: { x: 0, y: 0, w: 24, h: 2 }
    },
    {
      id: 'salesMetrics',
      component: 'metric-cards',
      componentData: {
        ...commonComponents.metricCards,
        items: [
          { title: '实时成交额', value: '¥2,456,789,123', status: 'success', icon: 'money' },
          { title: '订单总量', value: '8,765,432', status: 'success', icon: 'order' },
          { title: '支付峰值', value: '458,962笔/秒', status: 'normal', icon: 'payment' },
          { title: '物流订单量', value: '6,254,876', status: 'warning', icon: 'delivery' }
        ]
      },
      position: { x: 0, y: 2, w: 24, h: 3 }
    },
    {
      id: 'realTimeSales',
      component: 'realtime-chart',
      componentData: {
        ...commonComponents.realtimeChart,
        title: '实时销售额走势',
        subtitle: '最近30分钟交易数据',
        series: [
          {
            name: '成交额(万元)',
            type: 'line',
            smooth: true,
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5000) + 10000)
          },
          {
            name: '订单量(百笔)',
            type: 'line',
            smooth: true,
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 2000) + 5000)
          }
        ]
      },
      position: { x: 0, y: 5, w: 16, h: 8 }
    },
    {
      id: 'salesGauge',
      component: 'gauge-chart',
      componentData: {
        ...commonComponents.gauge,
        title: '销售目标完成度',
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#ff4d4f'],
                  [0.7, '#faad14'],
                  [1, '#52c41a']
                ]
              }
            },
            pointer: {
              length: '60%',
              width: 8,
              itemStyle: {
                color: 'auto'
              }
            },
            detail: {
              formatter: '{value}%',
              fontSize: 30
            },
            data: [{ value: 92, name: '完成率' }]
          }
        ]
      },
      position: { x: 16, y: 5, w: 8, h: 8 }
    },
    {
      id: 'categoryDistribution',
      component: 'donut-chart',
      componentData: {
        ...commonComponents.donutChart,
        title: '品类销售占比',
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: 30, name: '电子产品' },
              { value: 20, name: '服装鞋帽' },
              { value: 15, name: '美妆个护' },
              { value: 12, name: '家居家装' },
              { value: 10, name: '食品生鲜' },
              { value: 8, name: '母婴用品' },
              { value: 5, name: '其他' }
            ]
          }
        ]
      },
      position: { x: 0, y: 13, w: 8, h: 8 }
    },
    {
      id: 'platformComparison',
      component: 'bar-chart',
      componentData: {
        type: 'bar-chart',
        title: '各电商平台销售对比',
        xAxis: {
          type: 'category',
          data: ['天猫', '京东', '拼多多', '抖音', '快手', '唯品会', '苏宁']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '成交额(亿元)',
            type: 'bar',
            data: [540, 320, 280, 150, 120, 80, 60]
          }
        ]
      },
      position: { x: 8, y: 13, w: 16, h: 8 }
    },
    {
      id: 'alertsTable',
      component: 'alert-table',
      componentData: {
        ...commonComponents.alertTable,
        title: '系统异常告警',
        columns: [
          { label: '时间', prop: 'time' },
          { label: '级别', prop: 'level' },
          { label: '内容', prop: 'content' },
          { label: '状态', prop: 'status' }
        ],
        data: [
          { time: '10:25:34', level: '严重', content: '支付系统负载过高', status: '处理中' },
          { time: '09:45:12', level: '警告', content: '库存系统同步延迟', status: '已解决' },
          { time: '08:32:56', level: '一般', content: '促销活动页面响应慢', status: '监控中' },
          { time: '07:15:43', level: '警告', content: '订单峰值超出预期', status: '已解决' },
          { time: '06:58:22', level: '严重', content: '物流系统数据异常', status: '已解决' }
        ]
      },
      position: { x: 0, y: 21, w: 24, h: 6 }
    }
  ]
};

// 智慧城市交通监控大屏
const smartCityTrafficScreen = {
  id: 'crmp239crm20eeee',
  name: '智慧城市交通监控大屏',
  type: 'business-monitor',
  description: '实时监控城市交通情况，包含道路拥堵指数、车流量、事故多发点等数据。',
  createTime: '2023-05-20',
  lastModified: '2023-05-25',
  creator: '王五',
  template: 'template-1',
  accessCount: 5430,
  isPublished: false,
  // 页面布局
  layout: [
    {
      id: 'header',
      component: 'header-title',
      componentData: {
        ...commonComponents.headerTitle,
        title: '智慧城市交通监控大屏',
        subtitle: '实时城市交通数据分析'
      },
      position: { x: 0, y: 0, w: 24, h: 2 }
    },
    {
      id: 'trafficMetrics',
      component: 'metric-cards',
      componentData: {
        ...commonComponents.metricCards,
        items: [
          { title: '交通指数', value: '5.8', status: 'warning', icon: 'traffic' },
          { title: '平均车速', value: '28.5 km/h', status: 'normal', icon: 'speed' },
          { title: '今日事故', value: '15起', status: 'danger', icon: 'accident' },
          { title: '拥堵路段', value: '32处', status: 'warning', icon: 'road' }
        ]
      },
      position: { x: 0, y: 2, w: 24, h: 3 }
    },
    {
      id: 'cityMap',
      component: 'map-component',
      componentData: {
        type: 'map-component',
        title: '城市交通态势图',
        mapType: 'city',
        center: [116.397428, 39.90923],
        zoom: 12,
        markers: [
          { position: [116.368904, 39.913423], type: 'congestion', level: 'severe' },
          { position: [116.382122, 39.901176], type: 'congestion', level: 'moderate' },
          { position: [116.323066, 39.989956], type: 'accident', level: 'severe' },
          { position: [116.407394, 39.923991], type: 'construction', level: 'moderate' },
          { position: [116.497394, 39.873991], type: 'congestion', level: 'severe' }
        ],
        heatmapData: Array.from({ length: 100 }, () => {
          return [
            116.3 + Math.random() * 0.4,
            39.8 + Math.random() * 0.3,
            Math.random() * 100
          ];
        })
      },
      position: { x: 0, y: 5, w: 16, h: 10 }
    },
    {
      id: 'trafficTrend',
      component: 'realtime-chart',
      componentData: {
        ...commonComponents.realtimeChart,
        title: '实时交通流量趋势',
        subtitle: '最近1小时数据',
        xAxis: {
          type: 'category',
          data: Array.from({ length: 12 }, (_, i) => {
            const now = new Date();
            now.setMinutes(now.getMinutes() - 60 + i * 5);
            return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
          })
        },
        series: [
          {
            name: '主干道流量',
            type: 'line',
            smooth: true,
            data: [2500, 2800, 3200, 3600, 4000, 4200, 3800, 3500, 3200, 3000, 2800, 2600]
          },
          {
            name: '次干道流量',
            type: 'line',
            smooth: true,
            data: [1800, 2000, 2300, 2500, 2800, 3000, 2700, 2500, 2300, 2100, 2000, 1900]
          }
        ]
      },
      position: { x: 16, y: 5, w: 8, h: 6 }
    },
    {
      id: 'congestionGauge',
      component: 'gauge-chart',
      componentData: {
        ...commonComponents.gauge,
        title: '城市道路畅通指数',
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 10,
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#52c41a'],
                  [0.7, '#faad14'],
                  [1, '#ff4d4f']
                ]
              }
            },
            pointer: {
              length: '60%',
              width: 8,
              itemStyle: {
                color: 'auto'
              }
            },
            detail: {
              formatter: '{value}',
              fontSize: 30
            },
            data: [{ value: 5.8, name: '拥堵指数' }]
          }
        ]
      },
      position: { x: 16, y: 11, w: 8, h: 4 }
    },
    {
      id: 'areaTraffic',
      component: 'bar-chart',
      componentData: {
        type: 'bar-chart',
        title: '各区域交通拥堵指数',
        xAxis: {
          type: 'category',
          data: ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山', '通州区', '大兴区']
        },
        yAxis: {
          type: 'value',
          max: 10
        },
        series: [
          {
            name: '拥堵指数',
            type: 'bar',
            data: [6.2, 5.8, 7.3, 5.5, 4.8, 4.2, 6.8, 5.3]
          }
        ]
      },
      position: { x: 0, y: 15, w: 12, h: 6 }
    },
    {
      id: 'timeDistribution',
      component: 'heatmap-chart',
      componentData: {
        ...commonComponents.heatmapChart,
        title: '全天交通拥堵时段分布',
        xAxis: {
          type: 'category',
          data: ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山', '通州区', '大兴区']
        },
        yAxis: {
          type: 'category',
          data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%'
        },
        series: [
          {
            type: 'heatmap',
            data: [
              [0, 0, 1.2], [0, 1, 1.0], [0, 2, 3.5], [0, 3, 8.2], [0, 4, 5.4], [0, 5, 6.8], [0, 6, 9.1], [0, 7, 3.2],
              [1, 0, 1.0], [1, 1, 0.8], [1, 2, 3.8], [1, 3, 7.8], [1, 4, 5.2], [1, 5, 6.5], [1, 6, 8.8], [1, 7, 3.0],
              [2, 0, 1.5], [2, 1, 1.2], [2, 2, 4.5], [2, 3, 9.2], [2, 4, 6.4], [2, 5, 7.8], [2, 6, 9.5], [2, 7, 4.2],
              [3, 0, 1.3], [3, 1, 1.0], [3, 2, 4.0], [3, 3, 7.5], [3, 4, 5.8], [3, 5, 6.2], [3, 6, 8.5], [3, 7, 3.5],
              [4, 0, 1.1], [4, 1, 0.9], [4, 2, 3.2], [4, 3, 6.8], [4, 4, 4.8], [4, 5, 5.8], [4, 6, 7.2], [4, 7, 2.8],
              [5, 0, 0.8], [5, 1, 0.5], [5, 2, 2.8], [5, 3, 5.5], [5, 4, 4.2], [5, 5, 5.0], [5, 6, 6.5], [5, 7, 2.5],
              [6, 0, 1.4], [6, 1, 1.1], [6, 2, 4.2], [6, 3, 8.5], [6, 4, 6.0], [6, 5, 7.2], [6, 6, 9.2], [6, 7, 3.8],
              [7, 0, 1.2], [7, 1, 1.0], [7, 2, 3.5], [7, 3, 7.2], [7, 4, 5.5], [7, 5, 6.0], [7, 6, 7.8], [7, 7, 3.0]
            ]
          }
        ]
      },
      position: { x: 12, y: 15, w: 12, h: 6 }
    },
    {
      id: 'alertsTable',
      component: 'alert-table',
      componentData: {
        ...commonComponents.alertTable,
        title: '交通事件实时播报',
        columns: [
          { label: '时间', prop: 'time' },
          { label: '类型', prop: 'level' },
          { label: '位置', prop: 'content' },
          { label: '状态', prop: 'status' }
        ],
        data: [
          { time: '10:25:34', level: '事故', content: '朝阳区建国路与东三环交叉口', status: '处理中' },
          { time: '09:45:12', level: '拥堵', content: '西城区西长安街沿线', status: '持续中' },
          { time: '08:32:56', level: '施工', content: '海淀区中关村大街北段', status: '进行中' },
          { time: '07:15:43', level: '事故', content: '丰台区南四环与京开高速交叉处', status: '已处理' },
          { time: '06:58:22', level: '拥堵', content: '东城区东二环主路', status: '持续中' }
        ]
      },
      position: { x: 0, y: 21, w: 24, h: 6 }
    }
  ]
};

// 业务监控大屏模板
const businessMonitorTemplates = [
  {
    id: 'default',
    name: '通用业务监控模板',
    description: '适用于各类业务监控场景的通用模板，包含各类监控图表和告警组件',
    preview: '/images/templates/business-monitor-default.jpg',
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
        id: 'metricCards',
        component: 'metric-cards',
        componentData: {
          ...commonComponents.metricCards
        },
        position: { x: 0, y: 2, w: 24, h: 3 }
      },
      {
        id: 'realtimeChart',
        component: 'realtime-chart',
        componentData: {
          ...commonComponents.realtimeChart
        },
        position: { x: 0, y: 5, w: 16, h: 8 }
      },
      {
        id: 'gauge',
        component: 'gauge-chart',
        componentData: {
          ...commonComponents.gauge
        },
        position: { x: 16, y: 5, w: 8, h: 8 }
      },
      {
        id: 'donutChart',
        component: 'donut-chart',
        componentData: {
          ...commonComponents.donutChart
        },
        position: { x: 0, y: 13, w: 8, h: 8 }
      },
      {
        id: 'heatmapChart',
        component: 'heatmap-chart',
        componentData: {
          ...commonComponents.heatmapChart
        },
        position: { x: 8, y: 13, w: 16, h: 8 }
      },
      {
        id: 'alertTable',
        component: 'alert-table',
        componentData: {
          ...commonComponents.alertTable
        },
        position: { x: 0, y: 21, w: 24, h: 6 }
      }
    ]
  },
  {
    id: 'e-commerce-monitor',
    name: '电商监控模板',
    description: '专为电商平台监控设计的模板，重点展示销售、订单、物流等关键数据',
    preview: '/images/templates/business-monitor-ecommerce.jpg',
    // 与双十一大屏相同的布局
    layout: doubleElevenScreen.layout
  },
  {
    id: 'traffic-monitor',
    name: '交通监控模板',
    description: '专为城市交通监控设计的模板，包含地图、拥堵指数、交通事件等组件',
    preview: '/images/templates/business-monitor-traffic.jpg',
    // 与智慧城市交通大屏相同的布局
    layout: smartCityTrafficScreen.layout
  }
];

export default {
  // 所有屏幕数据
  screens: [
    doubleElevenScreen,
    smartCityTrafficScreen
  ],
  // 所有模板
  templates: businessMonitorTemplates,
  // 公共组件
  components: commonComponents
} 