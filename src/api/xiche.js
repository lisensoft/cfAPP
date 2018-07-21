import request from '@/utils/axios'

/**
 * 查找某门店所有的服务项目
 * @param {*参数} param
 */
export function itemList(param, closeLoading) {
  return request.fetchPost('/v1/app/item/selectCompanyItemList', param, closeLoading)
}
/**
 * 查找我的优惠券列表
 * @param {*参数} param
 */
export function myCouponList(param, closeLoading) {
  return request.fetchPost('/v1/app/myCoupon/selectList', param, closeLoading)
}
/**
 * 查找我的最优优惠券
 * @param {*参数} param
 */
export function myCouponGreat(param, closeLoading) {
  return request.fetchPost('/v1/app/myCoupon/selectGreat', param, closeLoading)
}
