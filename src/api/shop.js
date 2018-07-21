import request from '@/utils/axios'

/**
 * 获取维修厂门店列表
 * @param {*参数} param
 */
export function shopList(param, closeLoading) {
  return request.fetchPost('/v1/app/clientCompany/selectList', param, closeLoading)
}
/**
 * 根据id获取门店详细
 * @param {*参数} param
 */
export function getShopDetail(param, closeLoading) {
  return request.fetchPost('/v1/app/clientCompany/select', param, closeLoading)
}
/**
 * 获得评论各种数量
 * @param {*参数} param
 */
export function getTopCounts(param, closeLoading) {
  return request.fetchPost('/v1/app/bill/getTopCounts', param, closeLoading)
}
/**
 * 查找某服务项目
 * @param {*参数} param
 */
export function itemDetail(param, closeLoading) {
  return request.fetchPost('/v1/app/item/selectCompanyItem', param, closeLoading)
}
