import axios from 'axios'
import { Toast } from 'vant'
import qs from 'qs'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 100000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers['token'] = localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) { // 不等于200是错误异常
      if (res.code === 504) { // token失效需要重新登录
        window.location.replace('#/home/login')
        const mess = ''
        return Promise.reject(mess)
      } else {
        return Promise.reject(res.msg)
      }
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default {
  // 封装POST请求
  fetchPost: (code, params, closeLoading) => {
    if (!closeLoading) {
      // Toast.loading({
      //   mask: true,
      //   duration: 0,
      //   forbidClick: true,
      //   message: '加载中...'
      // })
    }
    return new Promise((resolve, reject) => {
      service.post(process.env.BASE_API + code, params)
        .then(response => {
          if (!closeLoading) {
            // Toast.clear()
          }
          resolve(response)
        }, err => {
          if (!closeLoading) {
            // Toast.clear()
          }
          if (err) {
            Toast(err)
          }
          reject(err)
        })
        .catch((error) => {
          if (!closeLoading) {
            // Toast.clear()
          }
          if (error) {
            Toast(error)
          }
          reject(error)
        })
    })
  },
  // 封装GET请求
  fetchGet: (code, params) => {
    Toast.loading({
      mask: true,
      duration: 0,
      forbidClick: true,
      message: '加载中...'
    })
    return new Promise((resolve, reject) => {
      service.get(process.env.BASE_API + code, {
        params: params
      })
        .then(response => {
          Toast.clear()
          resolve(response)
        }, err => {
          Toast.clear()
          Toast(err)
          reject(err)
        })
        .catch((error) => {
          Toast.clear()
          Toast(error)
          reject(error)
        })
    })
  }

}
