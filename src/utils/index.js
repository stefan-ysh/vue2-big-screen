// import request from '@/utils/request'

import { Message } from 'element-ui'
// 根据接口获取数据
// function getDataByRequest(data) {
//   return request({
//     url: `${data}`,
//     method: 'get'
//   })
// }
/**
 *  文件下载
 * @param downloadUrl   文件
 * @param fileName      文件名
 */
const fileDownload = function(downloadUrl, fileName) {
  const aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.href = downloadUrl
  aLink.download = fileName
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
}

const base64toFile = function(base64, fileName) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type: mime })
}

async function getDataJson(cptDataForm) {
  // 防止 JSON 解析报错
  let resStr = '{}'
  let iptStr = cptDataForm.dataText
  // 静态数据
  if (cptDataForm.dataSource === 1) {
    resStr = JSON.parse(iptStr)
  } else if (cptDataForm.dataSource === 2) {
    // 接口请求
    iptStr = cptDataForm.apiUrl
    if (iptStr) {
      // const res = await getDataByRequest(iptStr)
      // // todo resStr = 接口请求的数据
      // resStr = res
      // Message.closeAll()
      // Message.info('请求接口功能暂未完成')
    } else {
      Message.error('接口地址不能为空')
    }
  } else if (cptDataForm.dataSource === 3) {
    // sql 语句
    iptStr = cptDataForm.sql
    if (iptStr) {
      // todo resStr = sql 语句执行返回的数据
      Message.closeAll()
      Message.info('sql 查询功能暂未完成')
    } else {
      Message.error('SQL不能为空')
    }
  }
  // 处理数据函数
  if (cptDataForm.convertData) {
    const funcStr = cptDataForm.convertData
    // eslint-disable-next-line no-new-func
    const convertFun = new Function('return ' + funcStr)
    return convertFun()(resStr)
  } else {
    return resStr
  }
}

const cptTimer = {}

function pollingRefresh(uuid, cptDataForm, loadData) {
  if (uuid) {
    // 清除旧的定时器
    clearInterval(cptTimer[uuid])
  }
  if (!cptDataForm) {
    Message.warning('cptDataForm ==> null')
    return
  }
  if (!loadData) {
    Message.warning('子组件未实现数据解析方法')
    return
  }
  loadData()
  // 开启轮询
  if (cptDataForm.pollTime && cptDataForm.pollTime !== 0) {
    cptTimer[uuid] = setInterval(function() {
      loadData()
    }, cptDataForm.pollTime * 1000)
  }
}

function clearCptInterval(uuid, clearAll) {
  if (uuid) {
    // 清除旧的定时器
    clearInterval(cptTimer[uuid])
  }
  if (clearAll) {
    for (const key in cptTimer) {
      clearInterval(cptTimer[key])
    }
  }
}

export { fileDownload, base64toFile, getDataJson, pollingRefresh, clearCptInterval }
