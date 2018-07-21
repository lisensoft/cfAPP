// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import { NavBar, Toast, Lazyload, Cell, CellGroup, Icon } from 'vant'
import 'vant/lib/vant-css/icon-local.css'// 采用本地库的icon
// import './assets/util/vconsole.js'
import imgDefault from '@/assets/img/loading.png'
Vue.use(NavBar)// 导航栏
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(Lazyload, {// 图片懒加载配置
  preLoad: 1.3, // 预加载高度的比例
  error: imgDefault,
  loading: imgDefault,
  attempt: 3, // 尝试
  lazyComponent: true // 是否能懒加载模块
})
Vue.config.productionTip = false
Toast.setDefaultOptions({
  duration: 1500
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
