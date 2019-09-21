import axios from 'axios'
import router from '../permission'
import { Message } from 'element-ui'
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('use-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  // return Promise.reject(error)
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据异常'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.clear()
      router.push('/login')
      break
    case 404:
      message = '手机号码错误'
      break
    default:
      break
  }
  Message({ message: message })
  return new Promise(function () {})
})
export default axios
