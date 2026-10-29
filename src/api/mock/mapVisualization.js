/**
 * 地图可视化类型大屏的mock数据
 */

// 公共组件
const commonComponents = {
  // 标题组件
  headerTitle: {
    type: 'header-title',
    title: '地图可视化大屏',
    subtitle: '地理数据实时可视化',
    style: {
      fontSize: 36,
      color: '#fff',
      textAlign: 'center'
    }
  },
  // 统计卡片组
  statsCards: {
    type: 'stats-cards',
    layout: 'horizontal',
    items: [
      { title: '覆盖区域', value: '34个省市', icon: 'region' },
      { title: '监测点位', value: '1,286个', icon: 'location' },
      { title: '数据总量', value: '156.8万条', icon: 'data' },
      { title: '更新频率', value: '5分钟/次', icon: 'time' }
    ]
  },
  // 中国地图
  chinaMap: {
    type: 'geo-map',
    title: '全国数据分布',
    mapType: 'china',
    zoom: 1.2,
    center: [104.5, 37.8],
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
      inRange: {
        color: ['#abd9e9', '#2c8cbe', '#044c6d']
      }
    },
    series: [
      {
        type: 'map',
        name: '数据量',
        mapType: 'china',
        data: [
          { name: '北京', value: 942 },
          { name: '天津', value: 678 },
          { name: '上海', value: 986 },
          { name: '重庆', value: 752 },
          { name: '河北', value: 572 },
          { name: '山西', value: 453 },
          { name: '辽宁', value: 563 },
          { name: '吉林', value: 331 },
          { name: '黑龙江', value: 389 },
          { name: '江苏', value: 865 },
          { name: '浙江', value: 922 },
          { name: '安徽', value: 593 },
          { name: '福建', value: 684 },
          { name: '江西', value: 456 },
          { name: '山东', value: 738 },
          { name: '河南', value: 683 },
          { name: '湖北', value: 702 },
          { name: '湖南', value: 615 },
          { name: '广东', value: 974 },
          { name: '广西', value: 523 },
          { name: '海南', value: 432 },
          { name: '四川', value: 789 },
          { name: '贵州', value: 435 },
          { name: '云南', value: 517 },
          { name: '西藏', value: 178 },
          { name: '陕西', value: 491 },
          { name: '甘肃', value: 387 },
          { name: '青海', value: 198 },
          { name: '宁夏', value: 203 },
          { name: '新疆', value: 349 },
          { name: '内蒙古', value: 421 },
          { name: '香港', value: 629 },
          { name: '澳门', value: 456 },
          { name: '台湾', value: 583 }
        ]
      }
    ]
  },
  // 散点图
  scatterMap: {
    type: 'scatter-map',
    title: '区域热点分布',
    mapType: 'china',
    zoom: 1.2,
    center: [104.5, 37.8],
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: val => val[2] / 10,
        data: [
          { name: '北京', value: [116.405285, 39.904989, 150] },
          { name: '上海', value: [121.472644, 31.231706, 120] },
          { name: '广州', value: [113.280637, 23.125178, 100] },
          { name: '深圳', value: [114.085947, 22.547, 90] },
          { name: '杭州', value: [120.153576, 30.287459, 85] },
          { name: '武汉', value: [114.298572, 30.584355, 80] },
          { name: '西安', value: [108.948024, 34.263161, 75] },
          { name: '成都', value: [104.065735, 30.659462, 70] },
          { name: '南京', value: [118.767413, 32.041544, 65] },
          { name: '重庆', value: [106.504962, 29.533155, 60] }
        ]
      }
    ]
  },
  // 迁徙图
  migrationMap: {
    type: 'migration-map',
    title: '人口迁徙图',
    mapType: 'china',
    zoom: 1.2,
    center: [104.5, 37.8],
    series: [
      {
        type: 'lines',
        coordinateSystem: 'geo',
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          symbolSize: 3
        },
        lineStyle: {
          width: 1,
          opacity: 0.6,
          curveness: 0.2
        },
        data: [
          {
            fromName: '北京',
            toName: '上海',
            coords: [[116.405285, 39.904989], [121.472644, 31.231706]],
            value: 6500
          },
          {
            fromName: '北京',
            toName: '广州',
            coords: [[116.405285, 39.904989], [113.280637, 23.125178]],
            value: 5500
          },
          {
            fromName: '上海',
            toName: '北京',
            coords: [[121.472644, 31.231706], [116.405285, 39.904989]],
            value: 4500
          },
          {
            fromName: '广州',
            toName: '北京',
            coords: [[113.280637, 23.125178], [116.405285, 39.904989]],
            value: 3500
          },
          {
            fromName: '成都',
            toName: '北京',
            coords: [[104.065735, 30.659462], [116.405285, 39.904989]],
            value: 3000
          },
          {
            fromName: '成都',
            toName: '上海',
            coords: [[104.065735, 30.659462], [121.472644, 31.231706]],
            value: 2800
          },
          {
            fromName: '武汉',
            toName: '上海',
            coords: [[114.298572, 30.584355], [121.472644, 31.231706]],
            value: 2600
          },
          {
            fromName: '武汉',
            toName: '广州',
            coords: [[114.298572, 30.584355], [113.280637, 23.125178]],
            value: 2400
          },
          {
            fromName: '西安',
            toName: '北京',
            coords: [[108.948024, 34.263161], [116.405285, 39.904989]],
            value: 2200
          },
          {
            fromName: '西安',
            toName: '上海',
            coords: [[108.948024, 34.263161], [121.472644, 31.231706]],
            value: 2000
          }
        ]
      }
    ]
  },
  // 热力图
  heatMap: {
    type: 'heat-map',
    title: '区域热力分布',
    mapType: 'china',
    zoom: 1.2,
    center: [104.5, 37.8],
    visualMap: {
      min: 0,
      max: 1,
      calculable: true,
      inRange: {
        color: ['blue', 'green', 'yellow', 'red']
      }
    },
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'geo',
        data: Array.from({ length: 500 }, () => {
          const lng = 100 + Math.random() * 20;
          const lat = 30 + Math.random() * 20;
          return [lng, lat, Math.random()];
        })
      }
    ]
  },
  // 区域列表
  regionTable: {
    type: 'region-table',
    title: '重点区域数据',
    columns: [
      { label: '排名', prop: 'rank' },
      { label: '区域', prop: 'region' },
      { label: '数据量', prop: 'value' },
      { label: '同比增长', prop: 'growth' },
      { label: '占比', prop: 'percent' }
    ],
    data: [
      { rank: 1, region: '华东地区', value: '37,582', growth: '+15.6%', percent: '32.4%' },
      { rank: 2, region: '华南地区', value: '24,863', growth: '+12.8%', percent: '21.5%' },
      { rank: 3, region: '华北地区', value: '21,035', growth: '+8.4%', percent: '18.2%' },
      { rank: 4, region: '西南地区', value: '14,587', growth: '+10.2%', percent: '12.6%' },
      { rank: 5, region: '华中地区', value: '10,364', growth: '+6.8%', percent: '8.9%' }
    ]
  }
};

// 春运客流量监控大屏
const springFestivalTrafficScreen = {
  id: 'crmp239crm203jcm',
  name: '春运客流量监控大屏',
  type: 'map-visualization',
  description: '通过地图可视化展示全国春运期间人员流动情况，包含热力图、迁徙图等。',
  createTime: '2023-01-18',
  lastModified: '2023-01-20',
  creator: '李四',
  template: 'template-3',
  accessCount: 8720,
  isPublished: false,
  // 页面布局
  layout: [
    {
      id: 'header',
      component: 'header-title',
      componentData: {
        ...commonComponents.headerTitle,
        title: '2023年春运客流量监控大屏',
        subtitle: '全国人口迁徙实时数据'
      },
      position: { x: 0, y: 0, w: 24, h: 2 }
    },
    {
      id: 'springFestivalStats',
      component: 'stats-cards',
      componentData: {
        ...commonComponents.statsCards,
        items: [
          { title: '累计发送旅客', value: '8,956万人次', icon: 'people' },
          { title: '同比增长', value: '+23.5%', icon: 'growth' },
          { title: '今日客流量', value: '1,256万人次', icon: 'today' },
          { title: '返程高峰预测', value: '2月5-7日', icon: 'calendar' }
        ]
      },
      position: { x: 0, y: 2, w: 24, h: 3 }
    },
    {
      id: 'migrationMap',
      component: 'migration-map',
      componentData: {
        ...commonComponents.migrationMap,
        title: '春运人口迁徙图',
        series: [
          {
            type: 'lines',
            coordinateSystem: 'geo',
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              symbolSize: 3
            },
            lineStyle: {
              width: 1.5,
              opacity: 0.6,
              curveness: 0.2
            },
            data: [
              {
                fromName: '北京',
                toName: '河北',
                coords: [[116.405285, 39.904989], [114.502461, 38.045474]],
                value: 3500
              },
              {
                fromName: '北京',
                toName: '山东',
                coords: [[116.405285, 39.904989], [117.000923, 36.675807]],
                value: 3000
              },
              {
                fromName: '上海',
                toName: '安徽',
                coords: [[121.472644, 31.231706], [117.283042, 31.86119]],
                value: 4200
              },
              {
                fromName: '上海',
                toName: '江苏',
                coords: [[121.472644, 31.231706], [118.767413, 32.041544]],
                value: 3800
              },
              {
                fromName: '广州',
                toName: '湖南',
                coords: [[113.280637, 23.125178], [112.982279, 28.19409]],
                value: 3600
              },
              {
                fromName: '广州',
                toName: '江西',
                coords: [[113.280637, 23.125178], [115.892151, 28.676493]],
                value: 3200
              },
              {
                fromName: '深圳',
                toName: '湖北',
                coords: [[114.085947, 22.547], [114.298572, 30.584355]],
                value: 2800
              },
              {
                fromName: '深圳',
                toName: '河南',
                coords: [[114.085947, 22.547], [113.665412, 34.757975]],
                value: 2600
              },
              {
                fromName: '浙江',
                toName: '江西',
                coords: [[120.153576, 30.287459], [115.892151, 28.676493]],
                value: 2500
              },
              {
                fromName: '福建',
                toName: '江西',
                coords: [[119.306239, 26.075302], [115.892151, 28.676493]],
                value: 2400
              },
              {
                fromName: '江苏',
                toName: '安徽',
                coords: [[118.767413, 32.041544], [117.283042, 31.86119]],
                value: 2300
              },
              {
                fromName: '广东',
                toName: '广西',
                coords: [[113.280637, 23.125178], [108.320004, 22.82402]],
                value: 2200
              }
            ]
          }
        ]
      },
      position: { x: 0, y: 5, w: 24, h: 12 }
    },
    {
      id: 'transportationStats',
      component: 'bar-chart',
      componentData: {
        type: 'bar-chart',
        title: '各交通方式客运量对比',
        xAxis: {
          type: 'category',
          data: ['铁路', '公路', '民航', '水运']
        },
        yAxis: {
          type: 'value',
          name: '万人次'
        },
        series: [
          {
            name: '去年同期',
            type: 'bar',
            data: [35621, 42568, 15687, 4523]
          },
          {
            name: '今年春运',
            type: 'bar',
            data: [42356, 48962, 18745, 5321]
          }
        ]
      },
      position: { x: 0, y: 17, w: 12, h: 8 }
    },
    {
      id: 'regionHeatMap',
      component: 'heat-map',
      componentData: {
        ...commonComponents.heatMap,
        title: '春运人口热力分布',
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'geo',
            data: [
              [116.405285, 39.904989, 0.9], // 北京
              [121.472644, 31.231706, 0.85], // 上海
              [113.280637, 23.125178, 0.8], // 广州
              [114.085947, 22.547, 0.75], // 深圳
              [120.153576, 30.287459, 0.7], // 杭州
              [114.298572, 30.584355, 0.65], // 武汉
              [108.948024, 34.263161, 0.6], // 西安
              [104.065735, 30.659462, 0.55], // 成都
              [118.767413, 32.041544, 0.5], // 南京
              [106.504962, 29.533155, 0.45], // 重庆
              [117.000923, 36.675807, 0.4], // 济南
              [113.665412, 34.757975, 0.35], // 郑州
              [117.283042, 31.86119, 0.3], // 合肥
              [112.982279, 28.19409, 0.25], // 长沙
              [119.306239, 26.075302, 0.2], // 福州
              [115.892151, 28.676493, 0.15], // 南昌
              [114.502461, 38.045474, 0.1], // 石家庄
              [123.429096, 41.796767, 0.05], // 沈阳
              ...Array.from({ length: 200 }, () => {
                const lng = 100 + Math.random() * 25;
                const lat = 25 + Math.random() * 20;
                return [lng, lat, Math.random() * 0.05 + 0.02];
              })
            ]
          }
        ]
      },
      position: { x: 12, y: 17, w: 12, h: 8 }
    },
    {
      id: 'topDestinations',
      component: 'region-table',
      componentData: {
        ...commonComponents.regionTable,
        title: '热门目的地排行',
        columns: [
          { label: '排名', prop: 'rank' },
          { label: '目的地', prop: 'region' },
          { label: '客流量', prop: 'value' },
          { label: '同比增长', prop: 'growth' },
          { label: '主要来源', prop: 'source' }
        ],
        data: [
          { rank: 1, region: '成都', value: '962.5万人次', growth: '+28.4%', source: '北京、上海、广州' },
          { rank: 2, region: '重庆', value: '856.3万人次', growth: '+25.6%', source: '上海、广州、深圳' },
          { rank: 3, region: '长沙', value: '743.8万人次', growth: '+22.5%', source: '广州、深圳、武汉' },
          { rank: 4, region: '武汉', value: '685.2万人次', growth: '+18.7%', source: '北京、上海、广州' },
          { rank: 5, region: '南京', value: '587.4万人次', growth: '+16.9%', source: '上海、北京、杭州' }
        ]
      },
      position: { x: 0, y: 25, w: 24, h: 6 }
    }
  ]
};

// 新冠疫情数据分析大屏
const covidDataScreen = {
  id: 'crmp239crm20dddd',
  name: '新冠疫情数据分析大屏',
  type: 'map-visualization',
  description: '全球新冠疫情数据可视化，包含各国感染率、疫苗接种率、康复率等数据。',
  createTime: '2023-01-05',
  lastModified: '2023-04-10',
  creator: '李四',
  template: 'template-3',
  accessCount: 15600,
  isPublished: true,
  // 页面布局
  layout: [
    {
      id: 'header',
      component: 'header-title',
      componentData: {
        ...commonComponents.headerTitle,
        title: '全球新冠疫情数据分析大屏',
        subtitle: '实时疫情数据追踪与分析'
      },
      position: { x: 0, y: 0, w: 24, h: 2 }
    },
    {
      id: 'covidStats',
      component: 'stats-cards',
      componentData: {
        ...commonComponents.statsCards,
        items: [
          { title: '全球确诊', value: '6.75亿例', icon: 'virus' },
          { title: '全球死亡', value: '686.5万例', icon: 'death' },
          { title: '疫苗接种率', value: '68.4%', icon: 'vaccine' },
          { title: '全球治愈率', value: '98.7%', icon: 'health' }
        ]
      },
      position: { x: 0, y: 2, w: 24, h: 3 }
    },
    {
      id: 'worldMap',
      component: 'geo-map',
      componentData: {
        type: 'geo-map',
        title: '全球疫情分布',
        mapType: 'world',
        zoom: 1.2,
        center: [0, 20],
        visualMap: {
          min: 0,
          max: 1000000,
          calculable: true,
          inRange: {
            color: ['#ffeda0', '#feb24c', '#f03b20']
          }
        },
        series: [
          {
            type: 'map',
            name: '累计确诊',
            mapType: 'world',
            data: [
              { name: 'United States', value: 102356789 },
              { name: 'India', value: 44987456 },
              { name: 'France', value: 39884992 },
              { name: 'Germany', value: 38243384 },
              { name: 'Brazil', value: 37085520 },
              { name: 'Japan', value: 33394581 },
              { name: 'South Korea', value: 31548083 },
              { name: 'Italy', value: 25647976 },
              { name: 'United Kingdom', value: 24556087 },
              { name: 'Russia', value: 22565567 },
              { name: 'Turkey', value: 17232066 },
              { name: 'Spain', value: 13731725 },
              { name: 'Australia', value: 11472726 },
              { name: 'Vietnam', value: 11526956 },
              { name: 'Argentina', value: 10044957 },
              { name: 'Netherlands', value: 8585995 },
              { name: 'Indonesia', value: 6802090 },
              { name: 'Mexico', value: 7483444 },
              { name: 'Iran', value: 7564350 },
              { name: 'China', value: 503302 }
            ]
          }
        ]
      },
      position: { x: 0, y: 5, w: 16, h: 10 }
    },
    {
      id: 'vaccineStats',
      component: 'pie-chart',
      componentData: {
        type: 'pie-chart',
        title: '全球疫苗接种情况',
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: 68.4, name: '已完全接种' },
              { value: 12.6, name: '部分接种' },
              { value: 19.0, name: '未接种' }
            ]
          }
        ]
      },
      position: { x: 16, y: 5, w: 8, h: 10 }
    },
    {
      id: 'trendChart',
      component: 'line-chart',
      componentData: {
        type: 'line-chart',
        title: '全球疫情趋势',
        xAxis: {
          type: 'category',
          data: ['2020/01', '2020/04', '2020/07', '2020/10', '2021/01', '2021/04', '2021/07', '2021/10', '2022/01', '2022/04', '2022/07', '2022/10', '2023/01']
        },
        yAxis: {
          type: 'value',
          name: '新增确诊(万)'
        },
        series: [
          {
            name: '新增确诊',
            type: 'line',
            smooth: true,
            data: [2, 280, 650, 780, 1450, 980, 850, 1240, 2560, 1820, 780, 680, 420]
          },
          {
            name: '死亡病例',
            type: 'line',
            smooth: true,
            data: [0.1, 18, 32, 43, 78, 52, 36, 58, 96, 65, 28, 21, 12]
          }
        ]
      },
      position: { x: 0, y: 15, w: 24, h: 8 }
    },
    {
      id: 'countryComparison',
      component: 'bar-chart',
      componentData: {
        type: 'bar-chart',
        title: '主要国家疫苗接种率对比',
        xAxis: {
          type: 'value',
          name: '接种率(%)'
        },
        yAxis: {
          type: 'category',
          data: ['新加坡', '中国', '加拿大', '日本', '英国', '德国', '美国', '俄罗斯', '印度', '南非']
        },
        series: [
          {
            name: '疫苗接种率',
            type: 'bar',
            data: [92, 89, 87, 83, 78, 76, 69, 56, 73, 35]
          }
        ]
      },
      position: { x: 0, y: 23, w: 12, h: 8 }
    },
    {
      id: 'countryTable',
      component: 'region-table',
      componentData: {
        ...commonComponents.regionTable,
        title: '主要国家疫情数据',
        columns: [
          { label: '国家', prop: 'region' },
          { label: '累计确诊', prop: 'value' },
          { label: '死亡人数', prop: 'deaths' },
          { label: '死亡率', prop: 'rate' },
          { label: '接种率', prop: 'vaccine' }
        ],
        data: [
          { region: '美国', value: '1.02亿', deaths: '118.6万', rate: '1.16%', vaccine: '69%' },
          { region: '印度', value: '4498.7万', deaths: '53.1万', rate: '1.18%', vaccine: '73%' },
          { region: '法国', value: '3988.5万', deaths: '16.4万', rate: '0.41%', vaccine: '80%' },
          { region: '德国', value: '3824.3万', deaths: '17.1万', rate: '0.45%', vaccine: '76%' },
          { region: '巴西', value: '3708.6万', deaths: '69.9万', rate: '1.88%', vaccine: '83%' }
        ]
      },
      position: { x: 12, y: 23, w: 12, h: 8 }
    }
  ]
};

// 地图可视化大屏模板
const mapVisualizationTemplates = [
  {
    id: 'default',
    name: '通用地图可视化模板',
    description: '适用于各类地理数据可视化场景的通用模板，包含多种地图类型和展示方式',
    preview: '/images/templates/map-visualization-default.jpg',
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
        id: 'statsCards',
        component: 'stats-cards',
        componentData: {
          ...commonComponents.statsCards
        },
        position: { x: 0, y: 2, w: 24, h: 3 }
      },
      {
        id: 'chinaMap',
        component: 'geo-map',
        componentData: {
          ...commonComponents.chinaMap
        },
        position: { x: 0, y: 5, w: 16, h: 10 }
      },
      {
        id: 'scatterMap',
        component: 'scatter-map',
        componentData: {
          ...commonComponents.scatterMap
        },
        position: { x: 16, y: 5, w: 8, h: 10 }
      },
      {
        id: 'migrationMap',
        component: 'migration-map',
        componentData: {
          ...commonComponents.migrationMap
        },
        position: { x: 0, y: 15, w: 24, h: 8 }
      },
      {
        id: 'heatMap',
        component: 'heat-map',
        componentData: {
          ...commonComponents.heatMap
        },
        position: { x: 0, y: 23, w: 12, h: 8 }
      },
      {
        id: 'regionTable',
        component: 'region-table',
        componentData: {
          ...commonComponents.regionTable
        },
        position: { x: 12, y: 23, w: 12, h: 8 }
      }
    ]
  },
  {
    id: 'migration-visualization',
    name: '人口迁徙可视化模板',
    description: '专为人口迁徙数据可视化定制的模板，重点展示迁徙路线和区域热力分布',
    preview: '/images/templates/map-visualization-migration.jpg',
    // 与春运客流量监控大屏相同的布局
    layout: springFestivalTrafficScreen.layout
  },
  {
    id: 'epidemic-visualization',
    name: '疫情数据可视化模板',
    description: '专为疫情数据可视化定制的模板，包含全球疫情分布、疫苗接种率等组件',
    preview: '/images/templates/map-visualization-epidemic.jpg',
    // 与新冠疫情数据分析大屏相同的布局
    layout: covidDataScreen.layout
  }
];

export default {
  // 所有屏幕数据
  screens: [
    springFestivalTrafficScreen,
    covidDataScreen
  ],
  // 所有模板
  templates: mapVisualizationTemplates,
  // 公共组件
  components: commonComponents,

  // 不同示例数据集
  examples: {
    // 人口迁徙可视化示例
    migration: {
      name: '人口迁徙可视化',
      description: '春运期间人口流动和交通数据可视化',
      components: {
        // 迁徙特定的标题
        headerTitle: {
          type: 'header-title',
          title: '春运人口迁徙可视化大屏',
          subtitle: '全国春运期间人口流动实时监控',
          updateTime: '2024-01-15 14:30:25'
        },
        // 迁徙特定的统计卡片
        statsCards: {
          type: 'stats-cards',
          layout: 'horizontal',
          items: [
            { title: '迁徙总人数', value: '29.8亿人次', icon: 'people' },
            { title: '热门路线', value: '156条', icon: 'route' },
            { title: '交通枢纽', value: '2,856个', icon: 'station' },
            { title: '实时更新', value: '每5分钟', icon: 'time' }
          ]
        },
        // 迁徙特定的中国地图
        chinaMap: {
          type: 'geo-map',
          title: '全国人口迁出分布',
          mapType: 'china',
          zoom: 1.2,
          center: [104.5, 37.8],
          visualMap: {
            min: 0,
            max: 5000,
            calculable: true,
            inRange: {
              color: ['#ffeaa7', '#fdcb6e', '#e17055', '#d63031']
            }
          },
          series: [
            {
              type: 'map',
              name: '迁出人数(万人)',
              mapType: 'china',
              data: [
                { name: '北京', value: 4200 },
                { name: '上海', value: 3800 },
                { name: '广东', value: 4500 },
                { name: '浙江', value: 2800 },
                { name: '江苏', value: 3200 },
                { name: '山东', value: 2600 },
                { name: '河南', value: 2400 },
                { name: '湖北', value: 2200 },
                { name: '湖南', value: 2000 },
                { name: '四川', value: 2800 },
                { name: '重庆', value: 1800 },
                { name: '福建', value: 1600 },
                { name: '安徽', value: 1400 },
                { name: '江西', value: 1200 },
                { name: '河北', value: 1500 },
                { name: '山西', value: 800 },
                { name: '辽宁', value: 1000 },
                { name: '吉林', value: 600 },
                { name: '黑龙江', value: 700 },
                { name: '陕西', value: 900 },
                { name: '甘肃', value: 500 },
                { name: '青海', value: 200 },
                { name: '宁夏', value: 180 },
                { name: '新疆', value: 400 },
                { name: '西藏', value: 150 },
                { name: '内蒙古', value: 350 },
                { name: '广西', value: 800 },
                { name: '海南', value: 300 },
                { name: '贵州', value: 600 },
                { name: '云南', value: 700 },
                { name: '天津', value: 800 },
                { name: '香港', value: 400 },
                { name: '澳门', value: 100 },
                { name: '台湾', value: 600 }
              ]
            }
          ]
        },
        // 迁徙特定的迁徙图
        migrationMap: {
          type: 'migration-map',
          title: '春运人口迁徙流向图',
          mapType: 'china',
          zoom: 1.2,
          center: [104.5, 37.8],
          series: [
            {
              type: 'lines',
              coordinateSystem: 'geo',
              effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                symbolSize: 3
              },
              lineStyle: {
                width: 2,
                opacity: 0.8,
                curveness: 0.2
              },
              data: [
                {
                  fromName: '北京',
                  toName: '河北',
                  coords: [[116.405285, 39.904989], [114.502461, 38.045474]],
                  value: 8500
                },
                {
                  fromName: '上海',
                  toName: '江苏',
                  coords: [[121.472644, 31.231706], [118.767413, 32.041544]],
                  value: 7200
                },
                {
                  fromName: '广州',
                  toName: '湖南',
                  coords: [[113.280637, 23.125178], [112.982279, 28.19409]],
                  value: 6800
                },
                {
                  fromName: '深圳',
                  toName: '江西',
                  coords: [[114.085947, 22.547], [115.892151, 28.676493]],
                  value: 6200
                },
                {
                  fromName: '杭州',
                  toName: '安徽',
                  coords: [[120.153576, 30.287459], [117.283042, 31.86119]],
                  value: 5800
                },
                {
                  fromName: '苏州',
                  toName: '河南',
                  coords: [[120.619585, 31.299379], [113.665412, 34.757975]],
                  value: 5400
                },
                {
                  fromName: '成都',
                  toName: '重庆',
                  coords: [[104.065735, 30.659462], [106.504962, 29.533155]],
                  value: 4800
                },
                {
                  fromName: '武汉',
                  toName: '湖北',
                  coords: [[114.298572, 30.584355], [114.298572, 30.584355]],
                  value: 4200
                }
              ]
            }
          ]
        },
        // 迁徙特定的热力图
        heatMap: {
          type: 'heat-map',
          title: '交通枢纽热力分布',
          mapType: 'china',
          zoom: 1.2,
          center: [104.5, 37.8],
          visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
          },
          series: [
            {
              type: 'heatmap',
              coordinateSystem: 'geo',
              data: [
                [116.405285, 39.904989, 95], // 北京
                [121.472644, 31.231706, 88], // 上海
                [113.280637, 23.125178, 82], // 广州
                [114.085947, 22.547, 78], // 深圳
                [120.153576, 30.287459, 75], // 杭州
                [114.298572, 30.584355, 72], // 武汉
                [108.948024, 34.263161, 68], // 西安
                [104.065735, 30.659462, 65], // 成都
                [118.767413, 32.041544, 62], // 南京
                [106.504962, 29.533155, 58] // 重庆
              ]
            }
          ]
        },
        // 迁徙特定的区域表格
        regionTable: {
          type: 'region-table',
          title: '热门迁徙路线排行',
          columns: [
            { label: '排名', prop: 'rank' },
            { label: '出发地', prop: 'from' },
            { label: '目的地', prop: 'to' },
            { label: '迁徙人数', prop: 'value' },
            { label: '增长率', prop: 'growth' }
          ],
          data: [
            { rank: 1, from: '北京', to: '河北', value: '850万人', growth: '+12.5%' },
            { rank: 2, from: '上海', to: '江苏', value: '720万人', growth: '+8.9%' },
            { rank: 3, from: '广州', to: '湖南', value: '680万人', growth: '+15.2%' },
            { rank: 4, from: '深圳', to: '江西', value: '620万人', growth: '+18.6%' },
            { rank: 5, from: '杭州', to: '安徽', value: '580万人', growth: '+6.8%' }
          ]
        }
      },
      templates: [
        {
          id: 'migration-visualization',
          name: '人口迁徙可视化模板',
          description: '专为人口迁徙数据可视化定制的模板，重点展示迁徙路线和区域热力分布'
        }
      ],
      screens: [
        {
          id: 'migration-001',
          name: '春运人口迁徙可视化大屏',
          type: 'map-visualization',
          description: '春运期间人口流动和交通数据可视化监控',
          createTime: '2023-01-10',
          lastModified: '2023-02-15',
          creator: '交通运输部',
          template: 'migration-visualization',
          accessCount: 18560,
          isPublished: true,
          layout: []
        }
      ]
    },

    // 疫情数据可视化示例
    epidemic: {
      name: '疫情数据可视化',
      description: '全球疫情数据分布和疫苗接种情况可视化',
      components: {
        // 疫情特定的标题
        headerTitle: {
          type: 'header-title',
          title: '全球疫情数据可视化大屏',
          subtitle: '新冠疫情全球分布与疫苗接种监控',
          updateTime: '2024-01-15 14:30:25'
        },
        // 疫情特定的统计卡片
        statsCards: {
          type: 'stats-cards',
          layout: 'horizontal',
          items: [
            { title: '全球确诊', value: '7.02亿例', icon: 'virus' },
            { title: '死亡病例', value: '698万例', icon: 'death' },
            { title: '疫苗接种', value: '135亿剂次', icon: 'vaccine' },
            { title: '覆盖国家', value: '195个', icon: 'globe' }
          ]
        },
        // 疫情特定的世界地图
        worldMap: {
          type: 'geo-map',
          title: '全球疫情分布',
          mapType: 'world',
          zoom: 1.0,
          center: [0, 20],
          visualMap: {
            min: 0,
            max: 100000000,
            calculable: true,
            inRange: {
              color: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d']
            }
          },
          series: [
            {
              type: 'map',
              name: '累计确诊',
              mapType: 'world',
              data: [
                { name: 'United States', value: 102000000 },
                { name: 'India', value: 44987000 },
                { name: 'France', value: 39885000 },
                { name: 'Germany', value: 38243000 },
                { name: 'Brazil', value: 37086000 },
                { name: 'Japan', value: 33803000 },
                { name: 'South Korea', value: 30615000 },
                { name: 'Italy', value: 25603000 },
                { name: 'United Kingdom', value: 24664000 },
                { name: 'Russia', value: 22075000 },
                { name: 'Turkey', value: 17004000 },
                { name: 'Spain', value: 13980000 },
                { name: 'Vietnam', value: 11526000 },
                { name: 'Australia', value: 11394000 },
                { name: 'Argentina', value: 10044000 },
                { name: 'Taiwan', value: 9970000 },
                { name: 'Netherlands', value: 8606000 },
                { name: 'Iran', value: 7572000 },
                { name: 'Israel', value: 4804000 },
                { name: 'Poland', value: 6362000 },
                { name: 'Ukraine', value: 5492000 },
                { name: 'Malaysia', value: 5073000 },
                { name: 'Thailand', value: 4737000 },
                { name: 'Belgium', value: 4785000 },
                { name: 'Canada', value: 4651000 },
                { name: 'Portugal', value: 5521000 },
                { name: 'Austria', value: 5932000 },
                { name: 'Greece', value: 5089000 },
                { name: 'Chile', value: 5230000 },
                { name: 'China', value: 99280000 }
              ]
            }
          ]
        },
        // 疫情特定的散点图
        scatterMap: {
          type: 'scatter-map',
          title: '疫苗接种率分布',
          mapType: 'world',
          zoom: 1.0,
          center: [0, 20],
          series: [
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              symbolSize: val => Math.sqrt(val[2]) * 2,
              data: [
                { name: '新加坡', value: [103.8198, 1.3521, 92] },
                { name: '中国', value: [104.1954, 35.8617, 89] },
                { name: '加拿大', value: [-106.3468, 56.1304, 87] },
                { name: '日本', value: [138.2529, 36.2048, 83] },
                { name: '英国', value: [-3.4360, 55.3781, 78] },
                { name: '德国', value: [10.4515, 51.1657, 76] },
                { name: '美国', value: [-95.7129, 37.0902, 69] },
                { name: '俄罗斯', value: [105.3188, 61.5240, 56] },
                { name: '印度', value: [78.9629, 20.5937, 73] },
                { name: '南非', value: [22.9375, -30.5595, 35] }
              ]
            }
          ]
        },
        // 疫情特定的热力图
        heatMap: {
          type: 'heat-map',
          title: '疫情严重程度热力图',
          mapType: 'world',
          zoom: 1.0,
          center: [0, 20],
          visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
          },
          series: [
            {
              type: 'heatmap',
              coordinateSystem: 'geo',
              data: [
                [-95.7129, 37.0902, 9.5], // 美国
                [78.9629, 20.5937, 8.2], // 印度
                [2.2137, 46.2276, 7.8], // 法国
                [10.4515, 51.1657, 7.5], // 德国
                [-14.2350, -51.9253, 8.8], // 巴西
                [138.2529, 36.2048, 6.2], // 日本
                [127.7669, 35.9078, 5.8], // 韩国
                [12.5674, 41.8719, 6.5], // 意大利
                [-3.4360, 55.3781, 5.2], // 英国
                [105.3188, 61.5240, 4.8] // 俄罗斯
              ]
            }
          ]
        },
        // 疫情特定的区域表格
        regionTable: {
          type: 'region-table',
          title: '主要国家疫情数据',
          columns: [
            { label: '国家', prop: 'region' },
            { label: '累计确诊', prop: 'value' },
            { label: '死亡人数', prop: 'deaths' },
            { label: '死亡率', prop: 'rate' },
            { label: '接种率', prop: 'vaccine' }
          ],
          data: [
            { region: '美国', value: '1.02亿', deaths: '118.6万', rate: '1.16%', vaccine: '69%' },
            { region: '印度', value: '4498.7万', deaths: '53.1万', rate: '1.18%', vaccine: '73%' },
            { region: '法国', value: '3988.5万', deaths: '16.4万', rate: '0.41%', vaccine: '80%' },
            { region: '德国', value: '3824.3万', deaths: '17.1万', rate: '0.45%', vaccine: '76%' },
            { region: '巴西', value: '3708.6万', deaths: '69.9万', rate: '1.88%', vaccine: '83%' }
          ]
        }
      },
      templates: [
        {
          id: 'epidemic-visualization',
          name: '疫情数据可视化模板',
          description: '专为疫情数据可视化定制的模板，包含全球疫情分布、疫苗接种率等组件'
        }
      ],
      screens: [
        {
          id: 'epidemic-001',
          name: '全球疫情数据可视化大屏',
          type: 'map-visualization',
          description: '全球疫情数据分布和疫苗接种情况可视化监控',
          createTime: '2020-03-15',
          lastModified: '2023-12-20',
          creator: '卫生健康委',
          template: 'epidemic-visualization',
          accessCount: 45680,
          isPublished: true,
          layout: []
        }
      ]
    },

    // 物流配送可视化示例
    logistics: {
      name: '物流配送可视化',
      description: '全国物流配送网络和货运数据可视化',
      components: {
        // 物流特定的标题
        headerTitle: {
          type: 'header-title',
          title: '全国物流配送网络可视化大屏',
          subtitle: '智慧物流配送实时监控与分析',
          updateTime: '2024-01-15 14:30:25'
        },
        // 物流特定的统计卡片
        statsCards: {
          type: 'stats-cards',
          layout: 'horizontal',
          items: [
            { title: '配送网点', value: '15,680个', icon: 'warehouse' },
            { title: '运输车辆', value: '286,500辆', icon: 'truck' },
            { title: '日均包裹', value: '3.68亿件', icon: 'package' },
            { title: '配送时效', value: '24小时', icon: 'clock' }
          ]
        },
        // 物流特定的中国地图
        chinaMap: {
          type: 'geo-map',
          title: '全国物流网点分布',
          mapType: 'china',
          zoom: 1.2,
          center: [104.5, 37.8],
          visualMap: {
            min: 0,
            max: 2000,
            calculable: true,
            inRange: {
              color: ['#c6e48b', '#7bc96f', '#239a3b', '#196127']
            }
          },
          series: [
            {
              type: 'map',
              name: '网点数量',
              mapType: 'china',
              data: [
                { name: '北京', value: 1850 },
                { name: '上海', value: 1680 },
                { name: '广东', value: 1950 },
                { name: '浙江', value: 1420 },
                { name: '江苏', value: 1580 },
                { name: '山东', value: 1320 },
                { name: '河南', value: 1180 },
                { name: '湖北', value: 980 },
                { name: '湖南', value: 860 },
                { name: '四川', value: 1120 },
                { name: '重庆', value: 680 },
                { name: '福建', value: 720 },
                { name: '安徽', value: 580 },
                { name: '江西', value: 520 },
                { name: '河北', value: 680 },
                { name: '山西', value: 420 },
                { name: '辽宁', value: 580 },
                { name: '吉林', value: 320 },
                { name: '黑龙江', value: 380 },
                { name: '陕西', value: 480 },
                { name: '甘肃', value: 280 },
                { name: '青海', value: 120 },
                { name: '宁夏', value: 98 },
                { name: '新疆', value: 220 },
                { name: '西藏', value: 85 },
                { name: '内蒙古', value: 180 },
                { name: '广西', value: 420 },
                { name: '海南', value: 150 },
                { name: '贵州', value: 320 },
                { name: '云南', value: 380 },
                { name: '天津', value: 420 }
              ]
            }
          ]
        },
        // 物流特定的配送路线图
        migrationMap: {
          type: 'migration-map',
          title: '主要配送路线图',
          mapType: 'china',
          zoom: 1.2,
          center: [104.5, 37.8],
          series: [
            {
              type: 'lines',
              coordinateSystem: 'geo',
              effect: {
                show: true,
                period: 4,
                trailLength: 0.6,
                symbolSize: 4
              },
              lineStyle: {
                width: 2,
                opacity: 0.7,
                curveness: 0.3
              },
              data: [
                {
                  fromName: '上海',
                  toName: '北京',
                  coords: [[121.472644, 31.231706], [116.405285, 39.904989]],
                  value: 12500
                },
                {
                  fromName: '深圳',
                  toName: '上海',
                  coords: [[114.085947, 22.547], [121.472644, 31.231706]],
                  value: 11200
                },
                {
                  fromName: '杭州',
                  toName: '广州',
                  coords: [[120.153576, 30.287459], [113.280637, 23.125178]],
                  value: 9800
                },
                {
                  fromName: '成都',
                  toName: '北京',
                  coords: [[104.065735, 30.659462], [116.405285, 39.904989]],
                  value: 8600
                },
                {
                  fromName: '武汉',
                  toName: '深圳',
                  coords: [[114.298572, 30.584355], [114.085947, 22.547]],
                  value: 7800
                },
                {
                  fromName: '西安',
                  toName: '上海',
                  coords: [[108.948024, 34.263161], [121.472644, 31.231706]],
                  value: 7200
                }
              ]
            }
          ]
        },
        // 物流特定的热力图
        heatMap: {
          type: 'heat-map',
          title: '包裹密度热力图',
          mapType: 'china',
          zoom: 1.2,
          center: [104.5, 37.8],
          visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
          },
          series: [
            {
              type: 'heatmap',
              coordinateSystem: 'geo',
              data: [
                [121.472644, 31.231706, 98], // 上海
                [116.405285, 39.904989, 92], // 北京
                [113.280637, 23.125178, 88], // 广州
                [114.085947, 22.547, 85], // 深圳
                [120.153576, 30.287459, 82], // 杭州
                [118.767413, 32.041544, 78], // 南京
                [114.298572, 30.584355, 75], // 武汉
                [104.065735, 30.659462, 72], // 成都
                [108.948024, 34.263161, 68], // 西安
                [106.504962, 29.533155, 65] // 重庆
              ]
            }
          ]
        },
        // 物流特定的区域表格
        regionTable: {
          type: 'region-table',
          title: '各地区物流数据统计',
          columns: [
            { label: '地区', prop: 'region' },
            { label: '网点数', prop: 'points' },
            { label: '日均包裹', prop: 'value' },
            { label: '配送时效', prop: 'time' },
            { label: '满意度', prop: 'satisfaction' }
          ],
          data: [
            { region: '华东地区', points: '6,850个', value: '1.25亿件', time: '18小时', satisfaction: '98.5%' },
            { region: '华南地区', points: '4,680个', value: '8,560万件', time: '20小时', satisfaction: '97.8%' },
            { region: '华北地区', points: '3,920个', value: '7,280万件', time: '22小时', satisfaction: '96.9%' },
            { region: '西南地区', points: '2,580个', value: '4,680万件', time: '28小时', satisfaction: '95.2%' },
            { region: '东北地区', points: '1,680个', value: '2,850万件', time: '32小时', satisfaction: '94.6%' }
          ]
        }
      },
      templates: [
        {
          id: 'logistics-visualization',
          name: '物流配送可视化模板',
          description: '专为物流配送网络可视化定制的模板，包含网点分布、配送路线等组件'
        }
      ],
      screens: [
        {
          id: 'logistics-001',
          name: '全国物流配送网络可视化大屏',
          type: 'map-visualization',
          description: '全国物流配送网络和货运数据可视化监控',
          createTime: '2023-05-20',
          lastModified: '2023-12-10',
          creator: '物流运营部',
          template: 'logistics-visualization',
          accessCount: 12580,
          isPublished: true,
          layout: []
        }
      ]
    }
  }
} 