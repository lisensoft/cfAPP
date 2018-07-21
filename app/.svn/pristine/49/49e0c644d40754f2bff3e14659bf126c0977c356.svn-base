import Vue from 'vue'
import Router from 'vue-router'
import user from './user'
import news from './news'
import home from './home'
import shop from './shop'
import store from '@/store'
import { getUser } from '@/api/login'
import { localStorageTool } from '@/utils'
Vue.use(Router)

const RouterModel = new Router({
  routes: [
    {
      path: '*',
      redirect: {
        path: '/'
      }
    },
    {
      path: '/',
      name: '主页',
      redirect: '/home',
      meta: { keepAlive: true },
      component: resolve => require(['@/views/layout/layout'], resolve), // resolve => require(['../views/layout/Layout'], resolve),
      children: [
        {
          path: 'home',
          name: '首页',
          component: resolve => require(['@/views/home/home'], resolve),
          meta: { keepAlive: true }
        },
        {
          path: 'shop',
          name: '4S店',
          component: resolve => require(['@/views/shop/shop'], resolve),
          meta: { keepAlive: true }
        },
        {
          path: 'news',
          name: '头条',
          component: resolve => require(['@/views/news/news'], resolve),
          meta: { keepAlive: true }
        },
        {
          path: 'user',
          name: '我的',
          component: resolve => require(['@/views/user/user'], resolve),
          meta: { keepAlive: true }
        }
      ]
    },
    ...user,
    ...news,
    ...home,
    ...shop
  ]
})
RouterModel.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) { // 登录后才获取默认车辆
    if (from.fullPath === '/') { // 初次进入程序获取用户信息
      getUser().then((data) => {
        localStorageTool.setLocalStorage({
          'userInfo': JSON.stringify(data.new) // data.token
        })
      })
    }
    if (store.getters.myDefaultCar.id === undefined || store.getters.myDefaultCar.id === '') {
      store.dispatch('getDefaultCar') // 获取默认车辆
    }
  }
  next()
})

RouterModel.afterEach((to, from) => {
})
export default RouterModel
