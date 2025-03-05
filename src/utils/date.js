/**
 * 日期相关工具函数
 */

/**
 * 格式化日期
 * @param {string|Date} date 日期对象或日期字符串
 * @param {string} format 格式化模式，默认 yyyy-MM-dd
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'yyyy-MM-dd') {
  if (!date) return '';

  let dateObj;
  if (typeof date === 'string') {
    // 处理ISO格式日期字符串
    dateObj = new Date(date);
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    return '';
  }
  
  // 检查日期是否有效
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  
  format = format.replace(/yyyy/g, year);
  format = format.replace(/MM/g, month < 10 ? `0${month}` : month);
  format = format.replace(/M/g, month);
  format = format.replace(/dd/g, day < 10 ? `0${day}` : day);
  format = format.replace(/d/g, day);
  format = format.replace(/HH/g, hours < 10 ? `0${hours}` : hours);
  format = format.replace(/H/g, hours);
  format = format.replace(/mm/g, minutes < 10 ? `0${minutes}` : minutes);
  format = format.replace(/m/g, minutes);
  format = format.replace(/ss/g, seconds < 10 ? `0${seconds}` : seconds);
  format = format.replace(/s/g, seconds);
  
  return format;
}

/**
 * 获取相对时间描述
 * @param {string|Date} date 日期对象或日期字符串
 * @returns {string} 相对时间描述
 */
export function getRelativeTime(date) {
  if (!date) return '';

  let dateObj;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    return '';
  }
  
  // 检查日期是否有效
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  
  // 换算成秒、分钟、小时、天、周、月、年
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (seconds < 60) {
    return '刚刚';
  } else if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 7) {
    return `${days}天前`;
  } else if (weeks < 4) {
    return `${weeks}周前`;
  } else if (months < 12) {
    return `${months}个月前`;
  } else {
    return `${years}年前`;
  }
}

/**
 * 获取日期范围
 * @param {string} range 范围类型: today, yesterday, week, month, year
 * @returns {Array} 开始日期和结束日期数组 [startDate, endDate]
 */
export function getDateRange(range) {
  const now = new Date();
  let start, end;
  
  switch (range) {
    case 'today':
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      break;
    case 'yesterday':
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);
      break;
    case 'week':
      // 获取本周一和本周日
      const day = now.getDay() || 7;
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1);
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - day), 23, 59, 59);
      break;
    case 'month':
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      break;
    case 'year':
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      break;
    default:
      start = now;
      end = now;
  }
  
  return [start, end];
} 