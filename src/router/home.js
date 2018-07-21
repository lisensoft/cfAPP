export default [
  {
    path: '/home/area',
    name: '地区选择',
    component: resolve => require(['@/components/selectArea'], resolve)
  },
  {
    path: '/home/login',
    name: '登录',
    component: resolve => require(['@/views/login/login'], resolve)
  }
]
