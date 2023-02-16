import store from '@/store'
import axios from 'axios'
import request from '@/utils/request'
import { Message } from 'element-ui'
import _vue from '@/main.js'
const reqList = new Map()
const loadingMap = new Map()
// const socketResult = new Map()
// const ws = ''
const handleGet = (url, query, cptId) => {
  const reqUrl = `${url}?${new URLSearchParams(query).toString()}`
  return request({
    url: reqUrl,
    method: 'get',
    cancelToken: new axios.CancelToken(c => {
      reqList.set(cptId, c)
    })
  })
}
const handlePost = (url, data, cptId) => {
  return request({
    url,
    method: 'post',
    data,
    cancelToken: new axios.CancelToken(c => {
      reqList.set(cptId, c)
    })
  })
}
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

async function getDataJson(cptDataForm, id) {
  // 防止 JSON 解析报错
  let res = '{}'
  let currentCptRef = null
  let loading = false
  let iptStr = cptDataForm.dataText
  /**
   * 数据源类型
   * 静态数据 1
   * 借接口数据 2
   * sql 语句查询数据 3
   * websocket 数据 4
   */
  const dataSource = cptDataForm.dataSource
  // 静态数据
  if (dataSource === 1) {
    res = JSON.parse(iptStr)
  } else if (dataSource === 2) {
    // 接口请求
    const url = cptDataForm.apiUrl
    // 请求方式 GET POST
    const reqType = cptDataForm.reqType
    // 请求参数
    const paramsObj = store.state.bigScreen.reqParams[id]

    if (url) {
      if (reqList.has(id)) {
        reqList.get(id)()
        reqList.delete(id)
      }
      _vue.$nextTick(() => {
        currentCptRef = store.state.bigScreen.cptRefs.get(id)
        const { loadingText, loadingIcon, maskColor } = cptDataForm
        const loadingIsExist = loadingMap.has(id)
        loading = cptDataForm.loading
        if (loading && loadingIsExist) {
          loadingMap.get(id).close()
          loadingMap.delete(id)
        }
        loading && loadingMap.set(id, _vue.$modal.loading(loadingText, currentCptRef.$el, loadingIcon, maskColor))
      })
      if (reqType === 'GET') {
        res = await handleGet(url, paramsObj, id)
      } else {
        res = await handlePost(url, paramsObj, id)
      }
    } else {
      Message.error('接口地址不能为空')
    }
  } else if (dataSource === 3) {
    // sql 语句
    iptStr = cptDataForm.sql
    if (iptStr) {
      // todo res = sql 语句执行返回的数据
      Message.closeAll()
      Message.info('sql 查询功能暂未完成')
    } else {
      Message.error('SQL不能为空')
    }
  } else if (dataSource === 4) {
    return Message.info('socket 测试中，暂不可用')
    // // 如果已有值，则显示
    // if (socketResult.has(id)) {
    //   res = socketResult.get(id)
    // } else {
    //   // websocket
    //   const path = `${cptDataForm.socketUrl}/${id}`
    //   ws = new WebSocket(path)

    //   /** readState
    //    * CONNECTING：值为 0，表示正在连接。
    //    * OPEN：值为 1，表示连接成功，可以通信了。
    //    * CLOSING：值为 2，表示连接正在关闭。
    //    * CLOSED：值为 3，表示连接已经关闭，或者打开连接失败。
    //    */

    //   // 监听是否连接成功
    //   ws.onopen = () => {
    //     console.log('ws连接状态：' + ws.readyState)
    //   }
    //   // 接听服务器发回的信息并处理展示
    //   ws.onmessage = (e) => {
    //   // console.log('接收到来自服务器的消息：' + e.data)
    //     socketResult.set(id, JSON.parse(e.data))
    //   }
    //   // 监听连接关闭事件
    //   ws.onclose = () => {
    //   // 监听整个过程中websocket的状态
    //     console.log('ws连接状态：' + ws.readyState)
    //     ws.send('连接关闭')
    //   }
    //   // 监听并处理报错事件
    //   ws.onerror = (err) => {
    //     console.log(err)
    //   }
    // }
  }
  // 处理数据函数
  if (cptDataForm.convertData) {
    const funcStr = cptDataForm.convertData
    const convertFun = new Function('return ' + funcStr)
    if (currentCptRef) {
      loading && loadingMap.get(id).close()
      loading && loadingMap.delete(id)
    }
    return convertFun()(res)
  } else {
    if (currentCptRef) {
      loading && loadingMap.get(id).close()
      loading && loadingMap.delete(id)
    }
    return res
  }
}

const cptTimers = {}

function pollingRefresh(uuid, cptDataForm, loadData) {
  if (uuid) {
    // 清除旧的定时器
    clearInterval(cptTimers[uuid])
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
    cptTimers[uuid] = setInterval(function() {
      loadData()
    }, cptDataForm.pollTime * 1000)
  }
}

function clearCptInterval(uuid, clearAll) {
  if (uuid) {
    // 清除旧的定时器
    clearInterval(cptTimers[uuid])
  }
  if (clearAll) {
    for (const key in cptTimers) {
      clearInterval(cptTimers[key])
    }
  }
}

export { fileDownload, base64toFile, getDataJson, pollingRefresh, clearCptInterval }
