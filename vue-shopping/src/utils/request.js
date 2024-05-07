import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

// 创建axios 实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的axios 实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 自定义配置 - 请求/相应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 添加loading 效果
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 自定义图标
    duration: 0 // 展示时长为0 ， 响应后关闭
  })

  // 请求拦截器中，统一携带 token
  // 只要有token , 就在请求时携带 ， 便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    // Access-Token 有特殊字符 需用[]
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
  // 对响应数据做点什么 (默认axios 会多包装一层data)
  const res = response.data
  if (res.status !== 200) {
    // 给错误提示
    Toast(res.message)
    // 抛出一个错误的promise
    return Promise.reject(res.message)
  } else {
    // 正确响应 关闭loading
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出
export default instance
