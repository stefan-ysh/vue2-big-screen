/**
 * Mock数据管理器
 * 用于管理大屏设计器中不同示例的mock数据
 *
 * 示例的 key/name/description 以 src/api/mock 各文件中的 examples 为单一真源，
 * 此处只负责补充展示用的图标/配色，并生成组件预览用的动态数据。
 */
import { getAvailableExamples } from '@/api/mock'

/** 各示例的展示样式（图标/配色），key 与 api/mock 中 examples 的 key 对应 */
const EXAMPLE_STYLE_MAP = {
  ecommerce: { icon: 'shopping-cart-full', color: '#409EFF' },
  retail: { icon: 'shop', color: '#67C23A' },
  education: { icon: 'reading', color: '#E6A23C' },
  finance: { icon: 'money', color: '#F56C6C' },
  fintech: { icon: 'money', color: '#F56C6C' },
  manufacturing: { icon: 'monitor', color: '#409EFF' },
  social: { icon: 'chat-dot-round', color: '#409EFF' },
  offline: { icon: 'location', color: '#E6A23C' },
  migration: { icon: 'truck', color: '#409EFF' },
  epidemic: { icon: 'user-solid', color: '#F56C6C' },
  logistics: { icon: 'truck', color: '#67C23A' }
}

const DEFAULT_EXAMPLE_STYLE = { icon: 'document', color: '#909399' }

class MockDataManager {
  constructor() {
    this.currentExample = null
  }

  /**
   * 设置当前示例
   * @param {string} example 示例名称
   */
  setCurrentExample(example) {
    this.currentExample = example
  }

  /**
   * 获取当前示例
   * @returns {string} 当前示例名称
   */
  getCurrentExample() {
    return this.currentExample
  }

  /**
   * 生成动态数据
   * @param {string} type 数据类型
   * @param {Object} config 配置参数
   * @returns {any} 生成的数据
   */
  generateDynamicData(type, config = {}) {
    switch (type) {
      case 'sales':
        return this.generateSalesData(config)
      case 'user':
        return this.generateUserData(config)
      case 'traffic':
        return this.generateTrafficData(config)
      case 'financial':
        return this.generateFinancialData(config)
      default:
        return this.generateDefaultData(config)
    }
  }

  /**
   * 生成销售数据
   */
  generateSalesData(config) {
    const { days = 30, baseValue = 10000 } = config
    const data = []
    const labels = []

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i - 1))
      labels.push(date.toLocaleDateString())

      // 生成带有趋势的随机数据
      const trend = Math.sin(i / days * Math.PI) * 0.3
      const random = (Math.random() - 0.5) * 0.4
      const value = Math.round(baseValue * (1 + trend + random))
      data.push(value)
    }

    return { labels, data }
  }

  /**
   * 生成用户数据
   */
  generateUserData(config) {
    const { categories = ['新用户', '活跃用户', '留存用户', '流失用户'] } = config
    return categories.map(category => ({
      name: category,
      value: Math.floor(Math.random() * 10000) + 1000
    }))
  }

  /**
   * 生成流量数据
   */
  generateTrafficData(config) {
    const { hours = 24 } = config
    const data = []
    const labels = []

    for (let i = 0; i < hours; i++) {
      labels.push(`${i}:00`)
      // 模拟一天中的流量变化
      const hourFactor = Math.sin((i - 6) / 24 * 2 * Math.PI) * 0.5 + 0.5
      const value = Math.floor(hourFactor * 1000 + Math.random() * 200)
      data.push(value)
    }

    return { labels, data }
  }

  /**
   * 生成财务数据
   */
  generateFinancialData(config) {
    const { months = 12 } = config
    const revenue = []
    const profit = []
    const labels = []

    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月',
                       '7月', '8月', '9月', '10月', '11月', '12月']

    for (let i = 0; i < months; i++) {
      labels.push(monthNames[i])
      const revenueValue = Math.floor(Math.random() * 500000) + 100000
      const profitValue = Math.floor(revenueValue * (0.1 + Math.random() * 0.3))
      revenue.push(revenueValue)
      profit.push(profitValue)
    }

    return { labels, revenue, profit }
  }

  /**
   * 生成默认数据
   */
  generateDefaultData(config) {
    const { count = 10 } = config
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `项目${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 100
    }))
  }

  /**
   * 获取示例配置（元数据来自 api/mock，单一真源）
   * @param {string} type 大屏类型
   * @returns {Array} 示例配置列表
   */
  getExampleConfigs(type) {
    return getAvailableExamples(type).map(example => ({
      ...example,
      ...(EXAMPLE_STYLE_MAP[example.key] || DEFAULT_EXAMPLE_STYLE)
    }))
  }
}

// 创建单例实例
const mockDataManager = new MockDataManager()

export default mockDataManager
