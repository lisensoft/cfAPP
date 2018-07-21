import request from '@/utils/axios'

/**
 * 获取积分商品和优惠券
 * @param {*参数} param
 */
export function getIntegralList(param) {
  return request.fetchPost('/v1/app/integralGoods/selectList', param)// /v1/integralGoods/selectList
}
/**
 * 获取积分详细
 * @param {*参数} param
 */
export function getIntegralDetail(param) {
  return request.fetchPost('/v1/app/integralGoods/select', param)
}
