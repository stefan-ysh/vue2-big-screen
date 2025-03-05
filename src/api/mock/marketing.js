/**
 * 营销活动类型大屏的mock数据
 */

// 公共组件
const commonComponents = {
  // 标题组件
  headerTitle: {
    type: 'header-title',
    title: '营销活动大屏',
    subtitle: '实时营销数据监控',
    style: {
      fontSize: 36,
      color: '#fff',
      textAlign: 'center'
    }
  },
  // 营销指标卡片
  marketingCards: {
    type: 'marketing-cards',
    layout: 'horizontal',
    items: [
      { title: '活动曝光量', value: '2,568,921', trend: '+15.8%', icon: 'view' },
      { title: '点击量', value: '689,547', trend: '+12.3%', icon: 'click' },
      { title: '转化数', value: '45,682', trend: '+8.7%', icon: 'convert' },
      { title: '客单价', value: '¥258.6', trend: '+5.2%', icon: 'price' }
    ]
  },
  // 转化漏斗
  conversionFunnel: {
    type: 'funnel-chart',
    title: '营销转化漏斗',
    series: [
      {
        type: 'funnel',
        left: '10%',
        right: '10%',
        top: '10%',
        bottom: '10%',
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: [
          { value: 100, name: '曝光量 2,568,921' },
          { value: 80, name: '访问量 1,986,724' },
          { value: 60, name: '关注量 956,234' },
          { value: 40, name: '加购量 458,756' },
          { value: 20, name: '购买量 156,892' }
        ]
      }
    ]
  },
  // 趋势图
  trendChart: {
    type: 'line-chart',
    title: '活动效果趋势',
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        data: [352000, 285000, 315000, 368000, 423000, 456000, 485000]
      },
      {
        name: '转化量',
        type: 'line',
        smooth: true,
        data: [25600, 20400, 22800, 26500, 32400, 35600, 38200]
      }
    ]
  },
  // 地域分布
  regionMap: {
    type: 'map-chart',
    title: '用户地域分布',
    mapType: 'china',
    visualMap: {
      min: 0,
      max: 10000,
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['#e0ffff', '#006edd']
      }
    },
    series: [
      {
        name: '用户数量',
        type: 'map',
        mapType: 'china',
        label: {
          show: false
        },
        data: [
          { name: '北京', value: 8965 },
          { name: '天津', value: 5462 },
          { name: '上海', value: 9876 },
          { name: '重庆', value: 6548 },
          { name: '河北', value: 4562 },
          { name: '山西', value: 3215 },
          { name: '辽宁', value: 4758 },
          { name: '吉林', value: 2684 },
          { name: '黑龙江', value: 3159 },
          { name: '江苏', value: 7856 },
          { name: '浙江', value: 8652 },
          { name: '安徽', value: 5123 },
          { name: '福建', value: 6548 },
          { name: '江西', value: 3854 },
          { name: '山东', value: 6584 },
          { name: '河南', value: 5894 },
          { name: '湖北', value: 5621 },
          { name: '湖南', value: 4852 },
          { name: '广东', value: 9562 },
          { name: '广西', value: 4125 },
          { name: '海南', value: 2658 },
          { name: '四川', value: 7584 },
          { name: '贵州', value: 3254 },
          { name: '云南', value: 3856 },
          { name: '西藏', value: 1254 },
          { name: '陕西', value: 4598 },
          { name: '甘肃', value: 2587 },
          { name: '青海', value: 1526 },
          { name: '宁夏', value: 1458 },
          { name: '新疆', value: 2458 }
        ]
      }
    ]
  },
  // 渠道占比
  channelPie: {
    type: 'pie-chart',
    title: '流量渠道占比',
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 40, name: '搜索引擎' },
          { value: 25, name: '社交媒体' },
          { value: 15, name: '直接访问' },
          { value: 10, name: '广告推广' },
          { value: 10, name: '其他渠道' }
        ]
      }
    ]
  },
  // 用户画像
  userProfile: {
    type: 'radar-chart',
    title: '用户画像分析',
    legend: {
      data: ['目标用户', '实际用户']
    },
    radar: {
      indicator: [
        { name: '年龄分布', max: 100 },
        { name: '消费能力', max: 100 },
        { name: '品牌忠诚', max: 100 },
        { name: '购买频率', max: 100 },
        { name: '社交活跃', max: 100 },
        { name: '兴趣匹配', max: 100 }
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [80, 85, 70, 75, 65, 90],
            name: '目标用户'
          },
          {
            value: [70, 65, 60, 80, 75, 65],
            name: '实际用户'
          }
        ]
      }
    ]
  },
  // 产品排行
  productRank: {
    type: 'bar-chart',
    title: '热销产品排行',
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['产品A', '产品B', '产品C', '产品D', '产品E']
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: [25.6, 22.4, 18.5, 14.2, 12.8]
      }
    ]
  }
};

// 618电商大促活动数据大屏
const eCommerce618Screen = {
  id: 'crmp239crm20cccc',
  name: '618电商大促活动数据大屏',
  type: 'marketing',
  description: '618期间各电商平台活动效果监控，包含流量转化、销售额、ROI等核心指标。',
  createTime: '2023-06-05',
  lastModified: '2023-06-17',
  creator: '张三',
  template: 'template-4',
  accessCount: 9870,
  isPublished: true,
  // 页面布局
  layout: [
    {
      id: 'header',
      component: 'header-title',
      componentData: {
        ...commonComponents.headerTitle,
        title: '618电商大促活动数据大屏',
        subtitle: '实时营销数据监控与分析'
      },
      position: { x: 0, y: 0, w: 24, h: 2 }
    },
    {
      id: 'e618Cards',
      component: 'marketing-cards',
      componentData: {
        ...commonComponents.marketingCards,
        items: [
          { title: '总成交额', value: '¥8,345,621,583', trend: '+32.6%', icon: 'money' },
          { title: '总订单量', value: '26,845,972', trend: '+28.4%', icon: 'order' },
          { title: '活动转化率', value: '4.82%', trend: '+1.25%', icon: 'percent' },
          { title: '投入产出比', value: '1:15.8', trend: '+3.2%', icon: 'roi' }
        ]
      },
      position: { x: 0, y: 2, w: 24, h: 3 }
    },
    {
      id: 'platformPerformance',
      component: 'bar-chart',
      componentData: {
        type: 'bar-chart',
        title: '各平台销售额对比',
        xAxis: {
          type: 'category',
          data: ['天猫', '京东', '拼多多', '抖音', '快手', '唯品会', '苏宁']
        },
        yAxis: {
          type: 'value',
          name: '销售额(亿元)'
        },
        series: [
          {
            name: '去年618',
            type: 'bar',
            data: [28.6, 23.4, 14.8, 8.2, 6.5, 5.4, 4.2]
          },
          {
            name: '今年618',
            type: 'bar',
            data: [38.2, 30.6, 22.5, 15.8, 12.4, 7.2, 5.8]
          }
        ]
      },
      position: { x: 0, y: 5, w: 14, h: 8 }
    },
    {
      id: 'conversionFunnel',
      component: 'funnel-chart',
      componentData: {
        ...commonComponents.conversionFunnel,
        title: '618活动转化漏斗',
        series: [
          {
            type: 'funnel',
            left: '10%',
            right: '10%',
            top: '10%',
            bottom: '10%',
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: 100, name: '曝光量 5.2亿' },
              { value: 78, name: '点击量 4.1亿' },
              { value: 52, name: '加购量 2.7亿' },
              { value: 38, name: '下单量 1.9亿' },
              { value: 25, name: '支付量 1.3亿' }
            ]
          }
        ]
      },
      position: { x: 14, y: 5, w: 10, h: 8 }
    },
    {
      id: 'dailySales',
      component: 'line-chart',
      componentData: {
        ...commonComponents.trendChart,
        title: '618期间每日销售趋势',
        xAxis: {
          type: 'category',
          data: ['6/1', '6/2', '6/3', '6/4', '6/5', '6/6', '6/7', '6/8', '6/9', '6/10', '6/11', '6/12', '6/13', '6/14', '6/15', '6/16', '6/17', '6/18']
        },
        yAxis: {
          type: 'value',
          name: '销售额(亿元)'
        },
        series: [
          {
            name: '销售额',
            type: 'line',
            smooth: true,
            data: [12.5, 14.2, 15.8, 18.2, 22.5, 25.6, 28.4, 32.6, 38.5, 42.1, 48.5, 52.6, 58.4, 64.2, 72.5, 85.6, 92.4, 105.8]
          }
        ]
      },
      position: { x: 0, y: 13, w: 24, h: 8 }
    },
    {
      id: 'categoryPerformance',
      component: 'pie-chart',
      componentData: {
        ...commonComponents.channelPie,
        title: '各品类销售占比',
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 28, name: '3C数码' },
              { value: 22, name: '服装鞋包' },
              { value: 18, name: '家电' },
              { value: 12, name: '美妆个护' },
              { value: 10, name: '食品生鲜' },
              { value: 6, name: '家居家装' },
              { value: 4, name: '其他' }
            ]
          }
        ]
      },
      position: { x: 0, y: 21, w: 8, h: 8 }
    },
    {
      id: 'hotProducts',
      component: 'bar-chart',
      componentData: {
        ...commonComponents.productRank,
        title: '618爆款商品排行',
        yAxis: {
          type: 'category',
          data: ['iPhone 14 Pro', '小米手机13', '华为Mate50', '戴森吹风机', 'NIKE运动鞋']
        },
        series: [
          {
            name: '销售额(亿元)',
            type: 'bar',
            data: [12.5, 8.6, 7.8, 5.4, 4.2]
          }
        ]
      },
      position: { x: 8, y: 21, w: 8, h: 8 }
    },
    {
      id: 'userAgeDistribution',
      component: 'pie-chart',
      componentData: {
        type: 'pie-chart',
        title: '购买用户年龄分布',
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: 15, name: '18岁以下' },
              { value: 35, name: '18-25岁' },
              { value: 30, name: '26-35岁' },
              { value: 12, name: '36-45岁' },
              { value: 8, name: '45岁以上' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      position: { x: 16, y: 21, w: 8, h: 8 }
    }
  ]
};

// 暑期营销活动效果分析大屏
const summerCampaignScreen = {
  id: 'crmp239crm20ffff',
  name: '暑期营销活动效果分析',
  type: 'marketing',
  description: '暑期营销活动效果分析，包含活动转化率、ROI、用户留存等关键指标。',
  createTime: '2023-07-01',
  lastModified: '2023-08-15',
  creator: '赵六',
  template: 'template-4',
  accessCount: 4280,
  isPublished: true,
  // 页面布局
  layout: [
    {
      id: 'header',
      component: 'header-title',
      componentData: {
        ...commonComponents.headerTitle,
        title: '2023暑期营销活动效果分析',
        subtitle: '暑期营销数据全面监控'
      },
      position: { x: 0, y: 0, w: 24, h: 2 }
    },
    {
      id: 'summerCampaignCards',
      component: 'marketing-cards',
      componentData: {
        ...commonComponents.marketingCards,
        items: [
          { title: '活动投入', value: '¥1,250,000', trend: '--', icon: 'cost' },
          { title: '总收益', value: '¥13,680,500', trend: '--', icon: 'income' },
          { title: '投资回报率', value: '10.94', trend: '+8.6%', icon: 'roi' },
          { title: '新客获取数', value: '86,452', trend: '+12.8%', icon: 'user' }
        ]
      },
      position: { x: 0, y: 2, w: 24, h: 3 }
    },
    {
      id: 'campaignComparison',
      component: 'bar-chart',
      componentData: {
        type: 'bar-chart',
        title: '各子活动效果对比',
        xAxis: {
          type: 'category',
          data: ['开学季促销', '游戏内购活动', '亲子游活动', '夏令营活动', '留学产品促销']
        },
        yAxis: [
          {
            type: 'value',
            name: '转化率(%)',
            min: 0,
            max: 10,
            position: 'left'
          },
          {
            type: 'value',
            name: 'ROI',
            min: 0,
            max: 20,
            position: 'right'
          }
        ],
        series: [
          {
            name: '转化率',
            type: 'bar',
            data: [5.8, 7.2, 4.6, 3.8, 6.5]
          },
          {
            name: 'ROI',
            type: 'line',
            yAxisIndex: 1,
            data: [12.5, 15.8, 8.6, 7.2, 14.2]
          }
        ]
      },
      position: { x: 0, y: 5, w: 14, h: 8 }
    },
    {
      id: 'userProfile',
      component: 'radar-chart',
      componentData: {
        ...commonComponents.userProfile,
        title: '暑期活动用户画像',
        radar: {
          indicator: [
            { name: '在校学生', max: 100 },
            { name: '家长群体', max: 100 },
            { name: '游戏用户', max: 100 },
            { name: '旅游爱好者', max: 100 },
            { name: '教育产品用户', max: 100 }
          ]
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [92, 75, 80, 65, 85],
                name: '目标用户'
              },
              {
                value: [85, 80, 75, 72, 78],
                name: '实际用户'
              }
            ]
          }
        ]
      },
      position: { x: 14, y: 5, w: 10, h: 8 }
    },
    {
      id: 'channelAnalysis',
      component: 'pie-chart',
      componentData: {
        ...commonComponents.channelPie,
        title: '流量来源渠道分析',
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 35, name: '社交媒体' },
              { value: 25, name: '搜索引擎' },
              { value: 20, name: '内容平台' },
              { value: 12, name: '短视频平台' },
              { value: 8, name: '其他' }
            ]
          }
        ]
      },
      position: { x: 0, y: 13, w: 8, h: 8 }
    },
    {
      id: 'conversionFunnel',
      component: 'funnel-chart',
      componentData: {
        ...commonComponents.conversionFunnel,
        title: '暑期活动转化漏斗',
        series: [
          {
            type: 'funnel',
            left: '10%',
            right: '10%',
            top: '10%',
            bottom: '10%',
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: 100, name: '广告展示 1,250,000' },
              { value: 85, name: '点击访问 1,062,500' },
              { value: 65, name: '浏览活动页 812,500' },
              { value: 45, name: '活动参与 562,500' },
              { value: 30, name: '完成购买 375,000' },
              { value: 20, name: '复购 250,000' }
            ]
          }
        ]
      },
      position: { x: 8, y: 13, w: 8, h: 8 }
    },
    {
      id: 'campaignTimeline',
      component: 'line-chart',
      componentData: {
        ...commonComponents.trendChart,
        title: '活动期间每周效果趋势',
        xAxis: {
          type: 'category',
          data: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周']
        },
        yAxis: {
          type: 'value',
          name: '转化量'
        },
        series: [
          {
            name: '转化量',
            type: 'line',
            smooth: true,
            data: [18500, 25600, 32400, 38500, 42300, 38600, 34500, 30200]
          },
          {
            name: '日均花费',
            type: 'line',
            smooth: true,
            data: [25000, 28000, 32000, 35000, 38000, 30000, 26000, 22000]
          }
        ]
      },
      position: { x: 16, y: 13, w: 8, h: 8 }
    },
    {
      id: 'regionDistribution',
      component: 'map-chart',
      componentData: {
        ...commonComponents.regionMap,
        title: '活动用户地域分布',
      },
      position: { x: 0, y: 21, w: 12, h: 10 }
    },
    {
      id: 'productPerformance',
      component: 'bar-chart',
      componentData: {
        ...commonComponents.productRank,
        title: '热销产品排行',
        yAxis: {
          type: 'category',
          data: ['暑期班课程', '电子学习设备', '游戏充值卡', '旅游套餐', '儿童图书']
        },
        series: [
          {
            name: '销售额(万元)',
            type: 'bar',
            data: [456, 385, 325, 268, 215]
          }
        ]
      },
      position: { x: 12, y: 21, w: 12, h: 10 }
    }
  ]
};

// 营销活动大屏模板
const marketingTemplates = [
  {
    id: 'default',
    name: '通用营销活动模板',
    description: '适用于各类营销活动监控的通用模板，包含转化漏斗、用户画像、渠道分析等组件',
    preview: '/images/templates/marketing-default.jpg',
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
        id: 'marketingCards',
        component: 'marketing-cards',
        componentData: {
          ...commonComponents.marketingCards
        },
        position: { x: 0, y: 2, w: 24, h: 3 }
      },
      {
        id: 'conversionFunnel',
        component: 'funnel-chart',
        componentData: {
          ...commonComponents.conversionFunnel
        },
        position: { x: 0, y: 5, w: 12, h: 10 }
      },
      {
        id: 'trendChart',
        component: 'line-chart',
        componentData: {
          ...commonComponents.trendChart
        },
        position: { x: 12, y: 5, w: 12, h: 10 }
      },
      {
        id: 'channelPie',
        component: 'pie-chart',
        componentData: {
          ...commonComponents.channelPie
        },
        position: { x: 0, y: 15, w: 8, h: 8 }
      },
      {
        id: 'userProfile',
        component: 'radar-chart',
        componentData: {
          ...commonComponents.userProfile
        },
        position: { x: 8, y: 15, w: 8, h: 8 }
      },
      {
        id: 'productRank',
        component: 'bar-chart',
        componentData: {
          ...commonComponents.productRank
        },
        position: { x: 16, y: 15, w: 8, h: 8 }
      },
      {
        id: 'regionMap',
        component: 'map-chart',
        componentData: {
          ...commonComponents.regionMap
        },
        position: { x: 0, y: 23, w: 24, h: 10 }
      }
    ]
  },
  {
    id: 'e-commerce-campaign',
    name: '电商活动模板',
    description: '专为电商营销活动设计的模板，重点展示销售转化、商品表现、用户行为等数据',
    preview: '/images/templates/marketing-ecommerce.jpg',
    // 与618大屏相同的布局
    layout: eCommerce618Screen.layout
  },
  {
    id: 'seasonal-campaign',
    name: '季节性活动模板',
    description: '专为季节性营销活动设计的模板，包含活动对比、用户画像、区域分布等组件',
    preview: '/images/templates/marketing-seasonal.jpg',
    // 与暑期营销大屏相同的布局
    layout: summerCampaignScreen.layout
  }
];

export default {
  // 所有屏幕数据
  screens: [
    eCommerce618Screen,
    summerCampaignScreen
  ],
  // 所有模板
  templates: marketingTemplates,
  // 公共组件
  components: commonComponents
} 