import axios from 'axios'
import { Message } from 'element-ui'
import { tansParams } from '@/utils/common'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: 'http://xxx.xxx.xxx',
  timeout: 30000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    Message({
      message: '出错啦，稍后再试！',
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
