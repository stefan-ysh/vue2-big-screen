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
  components: commonComponents
} 