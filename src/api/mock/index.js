/**
 * Mock数据主文件
 * 整合所有类型的大屏模板和数据
 */

// 导入各种类型的mock数据
import dataAnalysisMock from './dataAnalysis'
import businessMonitorMock from './businessMonitor'
import mapVisualizationMock from './mapVisualization'
import marketingMock from './marketing'

// 整合所有mock数据
const mockData = {
  dataAnalysis: dataAnalysisMock,
  businessMonitor: businessMonitorMock,
  mapVisualization: mapVisualizationMock,
  marketing: marketingMock
}

/**
 * 根据类型获取对应的mock数据
 * @param {string} type 大屏类型：dataAnalysis(数据分析)、businessMonitor(业务监控)、mapVisualization(地图可视化)、marketing(营销活动)
 * @returns {Object} 对应类型的mock数据
 */
export function getMockDataByType(type) {
  if (!type || !mockData[type]) {
    // 如果类型不存在，默认返回数据分析类型
    return mockData.dataAnalysis
  }
  return mockData[type]
}

/**
 * 根据类型和ID获取特定的大屏数据
 * @param {string} type 大屏类型
 * @param {string} id 大屏ID，如果为空则返回模板数据
 * @returns {Object} 大屏数据
 */
export function getMockDataById(type, id) {
  const typeData = getMockDataByType(type)
  
  // 如果没有ID，说明是新建大屏，返回默认模板
  if (!id) {
    return typeData.templates[0]
  }
  
  // 在该类型下查找指定ID的大屏
  const screen = typeData.screens.find(item => item.id === id)
  return screen || typeData.templates[0]
}

export default mockData 