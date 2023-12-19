import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
// 创建axios实例
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
// 为request对象添加请求拦截器
request.interceptors.request.use((config) => {
  //获取用户相关的小仓库，获取token，登录成功以后携带个i服务器
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  //config配置对象，headers请求头，经常给服务器端携带公共参数
  //返回配置对象
  return config
  return config
})
// 为request对象添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '无网络'
    }
    // console.log('请求失败',message)
    ElMessage({
      type: 'error',
      message: message,
    })
    return Promise.reject(error)
  },
)
// 对外暴露
export default request
