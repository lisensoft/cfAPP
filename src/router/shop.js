export default [
  {
    path: '/shop/detail',
    name: '门店详情',
    component: resolve => require(['@/views/shop/shopDetail'], resolve)
  },
  {
    path: '/shop/itemDetail',
    name: '项目详情',
    component: resolve => require(['@/views/shop/itemDetail'], resolve)
  },
  {
    path: '/shop/washCar',
    name: '洗车',
    meta: { keepAlive: true },
    component: resolve => require(['@/views/shop/xiche/xiche'], resolve)
  },
  {
    path: '/shop/washCar/detail',
    name: '店铺详情',
    component: resolve => require(['@/views/shop/xiche/xicheDetail'], resolve)
  },
  {
    path: '/shop/washCar/charge',
    name: '洗车支付',
    meta: { keepAlive: true },
    component: resolve => require(['@/views/shop/xiche/xicheCharge'], resolve)
  },
  {
    path: '/shop/washCar/charge/coupon',
    name: '我的优惠券',
    component: resolve => require(['@/views/shop/xiche/xicheCoupon'], resolve)
  },
  {
    path: '/shop/maintain/handbook',
    name: '保养手册',
    component: resolve => require(['@/views/shop/maintain/handbook'], resolve)
  }
]
