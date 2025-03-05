/**
 * 大屏相关API服务
 */
import { getMockDataByType, getMockDataById } from './mock';

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
      icon: 'chart-line',
      cover: '/images/covers/data-analysis.jpg'
    },
    { 
      key: 'businessMonitor', 
      name: '业务监控', 
      description: '业务监控类大屏，适合实时监控业务数据和系统状态', 
      icon: 'monitor',
      cover: '/images/covers/business-monitor.jpg'
    },
    { 
      key: 'mapVisualization', 
      name: '地图可视化', 
      description: '地图可视化类大屏，适合展示地理分布数据和空间关系', 
      icon: 'map-marked', 
      cover: '/images/covers/map-visualization.jpg'
    },
    { 
      key: 'marketing', 
      name: '营销活动', 
      description: '营销活动类大屏，适合展示营销数据和活动效果', 
      icon: 'bullhorn',
      cover: '/images/covers/marketing.jpg'
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
 * @returns {Promise<Object>} 大屏列表数据
 */
export function getBigscreenList(params = {}) {
  // 从mock数据中获取对应类型的大屏列表
  const mockData = getMockDataByType(params.type);
  let list = [...mockData.screens];

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
  const end = start + pageSize;
  const pageList = list.slice(start, end);

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
 * @returns {Promise<Object>} 大屏详情数据
 */
export function getBigscreenDetail(id, type) {
  const screenData = getMockDataById(type, id);
  
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
 * @returns {Promise<Array>} 模板列表
 */
export function getBigscreenTemplates(type) {
  const mockData = getMockDataByType(type);
  
  // 模拟延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData.templates);
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
  const id = 'scr_' + Math.random().toString(36).substr(2, 9);
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
 * @returns {Promise<Object>} 组件列表
 */
export function getBigscreenComponents(type) {
  const mockData = getMockDataByType(type);
  
  // 模拟延迟
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData.components || {});
    }, 300);
  });
} 