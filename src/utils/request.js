import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading、禁止背景点击
  Toast.loading({
    message: '加载中…',
    forbidClick: true,
    duration: 0
  })
  // 在请求拦截器中统一携带token
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么 默认axios多包装一层data
  const res = response.data
  if (res.status !== 200) {
    // 错误提示 单例模式 同一时间只会存在一个Toast
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 正确-清除loading效果
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
