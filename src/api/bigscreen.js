/**
 * 大屏相关API服务
 * 当前为纯前端 mock 实现；接入后端时仅需将各方法替换为真实请求，
 * 组件层契约（layout -> components 适配）保持不变。
 * 可通过 .env 的 VUE_APP_USE_MOCK 门控 mock 与真实请求的切换。
 */
import { getMockDataById, getMockDataByType, getAvailableExamples as getMockExamples, default as mockData } from './mock';

/** 本地存储的自定义模板 / 已创建大屏（localStorage 持久化，纯前端方案） */
const CUSTOM_TEMPLATES_KEY = 'customTemplates'
const CREATED_SCREENS_KEY = 'createdScreens'

function readLocalJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    return fallback
  }
}

/** 获取本地保存的自定义模板列表 */
export function getCustomTemplates() {
  const list = readLocalJson(CUSTOM_TEMPLATES_KEY, [])
  return Array.isArray(list) ? list : []
}

/** 保存自定义模板 */
export function saveCustomTemplate(template) {
  const list = getCustomTemplates()
  list.unshift(template)
  localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(list))
  return template
}

/** 删除自定义模板 */
export function deleteCustomTemplate(id) {
  const list = getCustomTemplates().filter(t => t.id !== id)
  localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(list))
}

/** 按 id 查找大屏：本地已创建 → 自定义模板 → mock 内置大屏 */
export function findScreenById(id) {
  if (!id) return null
  const created = readLocalJson(CREATED_SCREENS_KEY, {})
  if (created[id]) return normalizeScreenData(created[id])
  const custom = getCustomTemplates().find(t => t.id === id)
  if (custom) return custom
  for (const typeKey of Object.keys(mockData)) {
    const typeData = mockData[typeKey] || {}
    const screen = (typeData.screens || []).find(s => s.id === id)
    if (screen) return normalizeScreenData(screen)
  }
  return null
}

/** 路由中使用的画布网格尺寸（px） */
const GRID_SIZE = 80

/**
 * 各抽象组件类型 -> 已注册组件名 的映射
 * mock layout 中使用抽象类型名（如 metric-cards），
 * 画布实际渲染的是全局注册的组件（如 DataCards）
 */
const COMPONENT_NAME_MAP = {
  'header-title': 'BText',
  'data-cards': 'DataCards',
  'metric-cards': 'DataCards',
  'stats-cards': 'DataCards',
  'marketing-cards': 'DataCards',
  'line-chart': 'LineChart',
  'realtime-chart': 'LineChart',
  'bar-chart': 'BarChart',
  'pie-chart': 'PieChart',
  'donut-chart': 'PieChart',
  'funnel-chart': 'PieChart',
  'radar-chart': 'RadarChart',
  'gauge-chart': 'Dashboard',
  'data-table': 'TableComponent',
  'alert-table': 'TableComponent',
  'region-table': 'TableComponent',
  'migration-map': 'MapMigrate',
  'map-chart': 'MapGc',
  'geo-map': 'MapGc',
  'scatter-map': 'MapGc',
  'map-component': 'MapGc',
  'heatmap-chart': 'MapGc',
  'heat-map': 'MapGc'
}

/** 抽象组件类型 -> 组件面板图标（须为 src/assets/icon/svg 中存在的图标） */
const COMPONENT_ICON_MAP = {
  'header-title': 'text',
  'data-cards': 'num',
  'metric-cards': 'num',
  'stats-cards': 'num',
  'marketing-cards': 'num',
  'line-chart': 'line',
  'realtime-chart': 'line',
  'bar-chart': 'bar',
  'pie-chart': 'pie',
  'donut-chart': 'pie',
  'funnel-chart': 'pie',
  'radar-chart': 'radar',
  'gauge-chart': 'gauge',
  'data-table': 'list',
  'alert-table': 'list',
  'region-table': 'list',
  'migration-map': 'map-migrate',
  'map-chart': 'map-gc',
  'geo-map': 'map-gc',
  'scatter-map': 'map-gc',
  'map-component': 'map-gc',
  'heatmap-chart': 'map-gc',
  'heat-map': 'map-gc'
}

/** 折线图组件的样式属性默认值（与 LineChart/main.vue 契约一致） */
const LINE_ATTRIBUTE_DEFAULTS = {
  title: '',
  subtext: '',
  titleLeft: 'center',
  titleTop: 10,
  titleTextColor: '#ccc',
  subtextColor: '#aaa',
  lineColor: '#409eff',
  smooth: true,
  showSymbol: true,
  areaColor1: 'rgba(80,141,255,0.39)',
  areaColor2: 'rgba(56,155,255,0.25)',
  areaColor3: 'rgba(38,197,254,0.00)',
  xLabelShow: true,
  xLabelColor: '#eee',
  xLineShow: true,
  xLineColor: '#eee',
  xTickShow: true,
  yLabelShow: true,
  yLabelColor: '#eee',
  yLineShow: true,
  yLineColor: '#eee',
  yTickShow: true,
  yGridLineShow: false
}

/** 柱状图组件的样式属性默认值（与 BarChart/main.vue 契约一致） */
const BAR_ATTRIBUTE_DEFAULTS = {
  backgroundColor: '',
  chartTitle: '',
  titleLeft: 50,
  titleTop: 10,
  barDirection: 'vertical',
  titleTextColor: '#ccc',
  xAxisShow: true,
  yAxisShow: true,
  xLineShow: true,
  yLineShow: true,
  xLabelColor: '#ccc',
  xLineColor: '#ccc',
  yLabelColor: '#0bd124',
  yLineColor: '#ccc',
  yGridLineShow: false,
  yTickShow: true,
  xTickShow: true,
  barBgShow: false,
  barBorderRadius: 5,
  barLabelShow: false,
  barLabelColor: '#ff0',
  barLabelSize: 10,
  gradualColor: true,
  barColor: '#409eff',
  barColor1: '#e9a90a',
  barColor2: '#0bcfcf',
  barColor3: '#cc0ce6',
  barWidth: 18,
  barType: 'bar',
  xFontRotate: 0
}

/** 文本组件的样式属性默认值（与 BText/main.vue 契约一致） */
const TEXT_ATTRIBUTE_DEFAULTS = {
  url: '',
  textColor: '#ffffff',
  textSize: 32,
  fontWeight: 'bold',
  textLineHeight: 40,
  textFamily: '微软雅黑',
  textAlign: 'center',
  textShadow: false,
  offsetX: 0,
  offsetY: 0,
  blurRadius: 0,
  textShadowColor: '#000',
  fontStyle: 'normal',
  textDecoration: 'none',
  bgColor: 'rgba(255, 255, 255, 0)'
}

/** 仪表盘组件的样式属性默认值（与 Gauge/main.vue 契约一致） */
const GAUGE_ATTRIBUTE_DEFAULTS = {
  title: '完成率',
  min: 0,
  max: 100,
  lineDistance: 5,
  labelDistance: 10,
  labelSize: 12,
  tickLength: 5,
  pointerLength: 75,
  pointerWidth: 6,
  detailSize: 25,
  detailColor: '#ddd',
  titleSize: 12,
  titleColor: '#ddd',
  lineWidth: 3,
  color1: '#67e0e3',
  color2: '#37a2da',
  color3: '#fd666d',
  itemColor: '#6ADA13',
  startAngle: 225,
  endAngle: -45
}

/** 地图组件的样式属性默认值（与 MapGc/main.vue 契约一致） */
const MAP_ATTRIBUTE_DEFAULTS = {
  map: 'china',
  roam: false,
  titleText: '',
  titleLeft: 'center',
  titleTop: 10,
  subtext: '',
  titleFontSize: 20,
  titleColor: '#ddd',
  subTitleColor: '#aaa',
  subTitleFontSize: 13,
  seriesName: '区域数据',
  geoLabelColor: '#555',
  geoLabelSize: 14
}

/** 雷达图组件的样式属性默认值（与 RadarChart/main.vue 契约一致） */
const RADAR_ATTRIBUTE_DEFAULTS = {
  titleVisible: true,
  chartTitle: '',
  titleTextColor: '#ccc',
  titleTextFontSize: 20,
  titleX: 0,
  titleY: 0,
  titleFontSize: 14,
  subtext: '',
  subTitleFontSize: 13,
  subTitleColor: '#aaa',
  shape: 'circle',
  splitNumber: 5,
  nameGap: 60,
  radiusInside: 10,
  radiusOutside: 60,
  areaOpacity: 0.6,
  areaColor: '#409eff',
  indicator: '[]',
  axisNameFontSize: 14,
  pieColor: ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#5470c6', '#ff8c71']
}

/** 组件在画布上的默认尺寸（px） */
const COMPONENT_SIZE_MAP = {
  BText: { width: 600, height: 80 },
  DataCards: { width: 960, height: 150 },
  LineChart: { width: 700, height: 350 },
  BarChart: { width: 600, height: 320 },
  PieChart: { width: 420, height: 320 },
  RadarChart: { width: 400, height: 320 },
  Dashboard: { width: 300, height: 240 },
  TableComponent: { width: 640, height: 320 },
  MapMigrate: { width: 640, height: 420 },
  MapGc: { width: 640, height: 420 }
}

function getComponentName(componentType) {
  return COMPONENT_NAME_MAP[componentType] || 'BText'
}

function getComponentIcon(componentType) {
  return COMPONENT_ICON_MAP[componentType] || 'text'
}

/**
 * 从 echarts 风格的 componentData 中抽取 轴类图表（折线/柱状）的数据
 * @returns {Array|Object} LineChart 需要数组行，BarChart 需要单对象
 */
function extractAxisData(componentData, asArray) {
  const xData = (componentData.xAxis && componentData.xAxis.data) || []
  const series = Array.isArray(componentData.series) ? componentData.series : []
  if (asArray) {
    return series.map(s => ({
      name: s.name || '',
      xData: xData.join(','),
      yData: (s.data || []).join(',')
    }))
  }
  const first = series[0] || {}
  return {
    xData: xData.join(','),
    yData: (first.data || []).join(',')
  }
}

/**
 * 依据抽象组件类型生成组件数据（cptDataForm.dataText）
 */
function buildDataText(componentType, componentData) {
  const data = componentData || {}
  switch (componentType) {
    case 'header-title':
      return JSON.stringify({ value: data.title || '' })
    case 'data-cards':
    case 'metric-cards':
    case 'stats-cards':
    case 'marketing-cards':
      return JSON.stringify({ items: Array.isArray(data.items) ? data.items : [] })
    case 'line-chart':
    case 'realtime-chart':
      return JSON.stringify(extractAxisData(data, true))
    case 'bar-chart':
      return JSON.stringify(extractAxisData(data, false))
    case 'pie-chart':
    case 'donut-chart':
    case 'funnel-chart': {
      const firstSeries = (Array.isArray(data.series) && data.series[0]) || {}
      return JSON.stringify(Array.isArray(firstSeries.data) ? firstSeries.data : [])
    }
    case 'gauge-chart': {
      const firstSeries = (Array.isArray(data.series) && data.series[0]) || {}
      const firstDatum = (Array.isArray(firstSeries.data) && firstSeries.data[0]) || {}
      return JSON.stringify({ value: firstDatum.value !== undefined ? firstDatum.value : 0 })
    }
    case 'data-table':
    case 'alert-table':
    case 'region-table':
      return JSON.stringify({
        columns: Array.isArray(data.columns) ? data.columns : [],
        data: Array.isArray(data.data) ? data.data : []
      })
    case 'radar-chart': {
      if (Array.isArray(data.data)) return JSON.stringify(data.data)
      const firstSeries = (Array.isArray(data.series) && data.series[0]) || {}
      return JSON.stringify(Array.isArray(firstSeries.data) ? firstSeries.data : [])
    }
    case 'migration-map':
      return JSON.stringify({
        start: data.start || [116.4551, 40.2539],
        end: Array.isArray(data.end) ? data.end : []
      })
    case 'map-chart':
    case 'geo-map':
    case 'scatter-map':
    case 'map-component':
    case 'heatmap-chart':
    case 'heat-map': {
      if (Array.isArray(data.data)) return JSON.stringify(data.data)
      if (Array.isArray(data.points)) return JSON.stringify(data.points)
      return JSON.stringify([])
    }
    default:
      return JSON.stringify(data)
  }
}

/**
 * 依据抽象组件类型生成组件样式配置（configProps.attribute）
 */
function buildAttribute(componentType, componentData) {
  const data = componentData || {}
  switch (componentType) {
    case 'header-title': {
      const style = data.style || {}
      return {
        ...TEXT_ATTRIBUTE_DEFAULTS,
        textSize: style.fontSize || 32,
        textColor: style.color || '#ffffff',
        textAlign: style.textAlign || 'center'
      }
    }
    case 'line-chart':
    case 'realtime-chart':
      return { ...LINE_ATTRIBUTE_DEFAULTS, title: data.title || '', subtext: data.subtitle || '' }
    case 'bar-chart':
      return { ...BAR_ATTRIBUTE_DEFAULTS, chartTitle: data.title || '' }
    case 'gauge-chart':
      return { ...GAUGE_ATTRIBUTE_DEFAULTS, title: data.title || '完成率' }
    case 'migration-map':
      return {
        titleText: data.title || '',
        seriesName: data.subtitle || '迁徙图',
        seriesColor: '#a6c84c',
        roam: false,
        titleLeft: 'center',
        titleTop: 10,
        period: 6,
        symbol: 'diamond',
        effectColor: '#fff',
        effectLoop: false,
        lineWidth: 0,
        symbolSize: 6,
        curveness: 0.2,
        subtext: '',
        titleFontSize: 20,
        titleColor: '#ddd',
        subTitleColor: '#aaa',
        subTitleFontSize: 13
      }
    case 'map-chart':
    case 'geo-map':
    case 'scatter-map':
    case 'map-component':
    case 'heatmap-chart':
    case 'heat-map':
      return { ...MAP_ATTRIBUTE_DEFAULTS, titleText: data.title || '', seriesName: data.subtitle || '区域数据' }
    case 'radar-chart':
      return { ...RADAR_ATTRIBUTE_DEFAULTS, chartTitle: data.title || '' }
    default:
      // DataCards / PieChart / TableComponent 组件内部自带兜底默认值，
      // 直接透传 componentData 即可（保留 title/items/columns 等字段）
      return { ...data }
  }
}

/**
 * 将 mock 中的 layout 结构转换为设计器/预览使用的 components 结构
 * @param {Array} layout layout数组
 * @returns {Array} components数组
 */
export function convertLayoutToComponents(layout) {
  if (!Array.isArray(layout)) return []

  return layout.map((item, index) => {
    const { id, component, componentData, position } = item

    // 生成组件ID
    const componentId = id || `cpt_${Date.now()}_${index}`
    const componentName = getComponentName(component)
    const size = COMPONENT_SIZE_MAP[componentName] || { width: 320, height: 200 }

    // 转换位置信息
    const cptX = (position?.x || 0) * GRID_SIZE
    const cptY = (position?.y || 0) * GRID_SIZE

    return {
      id: componentId,
      cptTitle: componentData?.title || component || '组件',
      layerName: componentData?.title || component || '组件',
      icon: getComponentIcon(component),
      hidden: false,
      opacity: 1,
      componentName,
      setterName: `${componentName}-setter`,
      configProps: {
        attribute: buildAttribute(component, componentData),
        cptDataForm: {
          dataText: buildDataText(component, componentData),
          dataSource: 1,
          pollTime: 0,
          apiUrl: '/sc/test',
          sql: '-- 请在此输入用来查询数据的 sql 语句\n',
          convertData: '(data) => {\n  return data;\n};',
          convertChart: '(option) => {\n  return option;\n};'
        },
        animation: {
          name: '',
          delay: 'animate__delay-0s',
          speed: 'animate__slow',
          repeat: 'animate__repeat-1'
        }
      },
      cptX,
      cptY,
      cptZ: index + 1,
      cptWidth: position?.w ? position.w * GRID_SIZE : size.width,
      cptHeight: position?.h ? position.h * GRID_SIZE : size.height,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    }
  })
}

/** 布局结构的大屏（含 layout 字段）转换为 components 结构 */
function normalizeScreenData(screenData) {
  if (screenData && Array.isArray(screenData.layout) && !Array.isArray(screenData.components)) {
    return {
      ...screenData,
      components: convertLayoutToComponents(screenData.layout)
    }
  }
  return screenData
}

/**
 * 获取大屏类型列表
 * @returns {Promise<Array>} 大屏类型列表
 */
export function getBigscreenTypes() {
  return Promise.resolve([
    {
      key: 'dataAnalysis',
      name: '数据分析',
      description: '数据分析类大屏，适合展示各类数据指标和趋势',
      icon: 'chart-line'
    },
    {
      key: 'businessMonitor',
      name: '业务监控',
      description: '业务监控类大屏，适合实时监控业务数据和系统状态',
      icon: 'monitor'
    },
    {
      key: 'mapVisualization',
      name: '地图可视化',
      description: '地图可视化类大屏，适合展示地理分布数据和空间关系',
      icon: 'map-marked'
    },
    {
      key: 'marketing',
      name: '营销活动',
      description: '营销活动类大屏，适合展示营销数据和活动效果',
      icon: 'bullhorn'
    }
  ]);
}

/**
 * 获取大屏列表
 * @param {Object} params 查询参数
 * @param {string} params.type 大屏类型
 * @param {string} params.keyword 搜索关键词
 * @param {number} params.page 页码
 * @param {number} params.pageSize 每页数量
 * @param {string} params.example 示例名称，用于获取不同示例的数据
 * @returns {Promise<Object>} 大屏列表数据
 */
export function getBigscreenList(params = {}) {
  // 从mock数据中获取对应类型的大屏列表
  const mockData = getMockDataByType(params.type, params.example);
  let list = [...(mockData.screens || [])];

  // 关键词搜索
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    list = list.filter(item =>
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword)
    );
  }

  // 计算分页
  const page = params.page || 1;
  const pageSize = params.pageSize || 10;
  const total = list.length;
  const start = (page - 1) * pageSize;
  const pageList = list.slice(start, start + pageSize);

  // 模拟延迟，更真实
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: pageList,
        pagination: {
          total,
          page,
          pageSize
        }
      });
    }, 300);
  });
}

/**
 * 获取大屏详情
 * @param {string} id 大屏ID
 * @param {string} type 大屏类型
 * @param {string} example 示例名称，用于获取不同示例的数据
 * @returns {Promise<Object>} 大屏详情数据
 */
export function getBigscreenDetail(id, type, example = null) {
  // 如果有示例参数，直接从示例数据中获取
  if (example) {
    const exampleData = getMockDataByType(type, example);
    if (exampleData && exampleData.templates && exampleData.templates.length > 0) {
      // 返回示例的第一个模板，但使用指定的ID
      const template = exampleData.templates[0];

      return new Promise(resolve => {
        setTimeout(() => {
          const result = {
            ...template,
            id: id || template.id,
            name: template.name || `${exampleData.name}模板`,
            description: template.description || exampleData.description,
            title: template.name || `${exampleData.name}模板`
          };

          // 如果模板有layout，转换为components
          if (template.layout && Array.isArray(template.layout)) {
            result.components = convertLayoutToComponents(template.layout);
          } else if (!result.components) {
            result.components = [];
          }

          resolve(result);
        }, 300);
      });
    }
  }

  // 没有示例时：优先本地（已创建大屏/自定义模板/mock 大屏），再走原 mock 逻辑
  const screenData = findScreenById(id) || normalizeScreenData(getMockDataById(type, id, example));

  // 模拟延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(screenData);
    }, 300);
  });
}

/**
 * 获取大屏模板列表
 * @param {string} type 大屏类型
 * @param {string} example 示例名称，用于获取不同示例的数据
 * @returns {Promise<Array>} 模板列表
 */
export function getBigscreenTemplates(type, example = null) {
  const mockData = getMockDataByType(type, example);

  // 模拟延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData.templates || []);
    }, 300);
  });
}

/**
 * 创建大屏
 * @param {Object} data 大屏数据
 * @returns {Promise<Object>} 创建结果
 */
export function createBigscreen(data) {
  // 生成一个随机ID
  const id = 'scr_' + Math.random().toString(36).slice(2, 11);
  const now = new Date().toISOString();

  // 构建新的大屏数据
  const newScreen = {
    ...data,
    id,
    createTime: now,
    lastModified: now,
    accessCount: 0,
    isPublished: false
  };

  // 解析所选模板的真实内容并本地持久化，
  // 保证设计器按新 id 加载时呈现的就是用户选中的那个模板。
  // 模板数据可能缺少画布尺寸等字段，此处补齐默认值，
  // 否则设计器初始化缩放时会算出 NaN
  if (data.template) {
    const typeData = getMockDataByType(data.type);
    const source =
      (typeData.templates || []).find(t => t.id === data.template) ||
      (typeData.screens || []).find(s => s.id === data.template);
    if (source) {
      const created = readLocalJson(CREATED_SCREENS_KEY, {});
      created[id] = normalizeScreenData({
        ...source,
        id,
        name: data.name || source.name,
        screenWidth: source.screenWidth || 1920,
        screenHeight: source.screenHeight || 1080,
        bgColor: source.bgColor || '#1d1e1f',
        previewScaleType: source.previewScaleType || 'scrollY',
        isPublic: source.isPublic !== undefined ? source.isPublic : true
      });
      localStorage.setItem(CREATED_SCREENS_KEY, JSON.stringify(created));
    }
  }

  // 模拟API延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        data: newScreen
      });
    }, 500);
  });
}

/**
 * 更新大屏
 * @param {string} id 大屏ID
 * @param {Object} data 更新数据
 * @returns {Promise<Object>} 更新结果
 */
export function updateBigscreen(id, data) {
  // 更新修改时间
  const updatedData = {
    ...data,
    lastModified: new Date().toISOString()
  };

  // 模拟API延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        data: updatedData
      });
    }, 500);
  });
}

/**
 * 删除大屏
 * @param {string} id 大屏ID
 * @returns {Promise<Object>} 删除结果
 */
export function deleteBigscreen(id) {
  // 模拟API延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        id,
        message: '删除成功'
      });
    }, 500);
  });
}

/**
 * 发布大屏
 * @param {string} id 大屏ID
 * @returns {Promise<Object>} 发布结果
 */
export function publishBigscreen(id) {
  // 模拟API延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        message: '发布成功',
        publishUrl: `/preview/${id}`
      });
    }, 500);
  });
}

/**
 * 获取大屏组件列表
 * @param {string} type 大屏类型
 * @param {string} example 示例名称，用于获取不同示例的数据
 * @returns {Promise<Object>} 组件列表
 */
export function getBigscreenComponents(type, example = null) {
  const mockData = getMockDataByType(type, example);

  // 模拟延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData.components || {});
    }, 300);
  });
}

/**
 * 获取可用的示例数据列表
 * @param {string} type 大屏类型
 * @returns {Promise<Array>} 示例数据列表
 */
export function getAvailableExamples(type) {
  const examples = getMockExamples(type);

  // 模拟延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(examples);
    }, 300);
  });
}
