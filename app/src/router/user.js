const integral = [ // 积分路由
  {
    path: '/user/integral',
    name: '积分商城',
    component: resolve => require(['@/views/user/integral/integralMall'], resolve)
  },
  {
    path: '/user/integral/detail',
    name: '积分详细',
    component: resolve => require(['@/views/user/integral/integralDetail'], resolve)
  }
]

export default [
  {
    path: '/user/userSetting',
    name: '用户设置',
    component: resolve => require(['@/views/user/set/userSetting'], resolve)
  },
  {
    path: '/user/userSetting/info',
    name: '个人资料',
    component: resolve => require(['@/views/user/set/userInfo'], resolve)
  },
  {
    path: '/user/userSetting/about',
    name: '关于我们',
    component: resolve => require(['@/views/user/set/about'], resolve)
  },
  {
    path: '/user/myCar',
    name: '我的车辆',
    component: resolve => require(['@/views/user/myCar'], resolve)
  },
  {
    path: '/user/myCar/select',
    name: '选择车辆',
    component: resolve => require(['@/components/selectCar'], resolve)
  },
  {
    path: '/user/myCar/caredit',
    name: '编辑我的车',
    component: resolve => require(['@/views/user/caredit'], resolve)
  },
  {
    path: '/user/myCar/carAdd',
    name: '填写爱车信息',
    component: resolve => require(['@/views/user/carAdd'], resolve)
  },
  {
    path: '/user/myCar/selectBrand',
    name: '选品牌',
    component: resolve => require(['@/components/selectCarType/brand'], resolve)
  },
  {
    path: '/user/myCar/selectYear',
    name: '选年款',
    component: resolve => require(['@/components/selectCarType/modelYear'], resolve)
  },
  {
    path: '/user/myOrder',
    name: '我的订单',
    component: resolve => require(['@/views/user/orderList/orderList'], resolve)
  },
  {
    path: '/user/myOrder/charge',
    name: '生成订单',
    meta: { keepAlive: true },
    component: resolve => require(['@/views/user/orderList/charge'], resolve)
  },
  {
    path: '/user/myOrder/pay',
    name: '订单支付',
    component: resolve => require(['@/views/user/orderList/pay'], resolve)
  },
  {
    path: '/user/myOrder/payOk',
    name: '支付完成',
    component: resolve => require(['@/views/user/orderList/payOk'], resolve)
  },
  {
    path: '/user/myOrder/detail',
    name: '订单详情',
    component: resolve => require(['@/views/user/orderList/orderDetail'], resolve)
  },
  {
    path: '/user/myOrder/review',
    name: '订单评价',
    component: resolve => require(['@/views/user/orderList/orderReview'], resolve)
  },
  {
    path: '/user/myOrder/reviewDetail',
    name: '评价详情',
    component: resolve => require(['@/views/user/orderList/reviewDetail'], resolve)
  },
  {
    path: '/user/myCoupon',
    name: '优惠券列表',
    component: resolve => require(['@/views/user/coupon'], resolve)
  },
  {
    path: '/user/myCoupon/availableCoupon',
    name: '可用优惠券列表',
    component: resolve => require(['@/components/coupon'], resolve)
  },
  ...integral
]
