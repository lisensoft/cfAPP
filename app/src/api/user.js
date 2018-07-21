import request from '@/utils/axios'

/**
 * 获取车辆列表
 * @param {*参数} param
 */
export function carList(param, closeLoading) {
  return request.fetchPost('/v1/app/car/selectList', param, closeLoading)
}
/**
 * 设置默认车辆
 * @param {*参数} param
 */
export function carDefault(param, closeLoading) {
  return request.fetchPost('/v1/app/car/setdefault', param, closeLoading)
}
/**
 * 删除车辆
 * @param {*参数} param
 */
export function carDelete(param, closeLoading) {
  return request.fetchPost('/v1/app/car/delete', param, closeLoading)
}
/**
 * 编辑车辆
 * @param {*参数} param
 */
export function carUpdate(param, closeLoading) {
  return request.fetchPost('/v1/app/car/update', param, closeLoading)
}
/**
 * 新增车辆
 * @param {*参数} param
 */
export function carAdd(param, closeLoading) {
  return request.fetchPost('/v1/app/car/insert', param, closeLoading)
}
/**
 * 生成订单
 * @param {*参数} param
 */
export function createBill(param, closeLoading) {
  return request.fetchPost('/v1/app/bill/createBill', param, closeLoading)
}
/**
 * 支付订单
 * @param {*参数} param
 */
export function payBill(param, closeLoading) {
  return request.fetchPost('/v1/app/bill/payBill', param, closeLoading)
}
/**
 * 查看订单列表
 * @param {*参数} param
 */
export function billList(param, closeLoading) {
  return request.fetchPost('/v1/app/bill/selectList', param, closeLoading)
}
/**
 * 查看订单列表需登录
 * @param {*参数} param
 */
export function selectListNeedToken(param, closeLoading) {
  return request.fetchPost('/v1/app/bill/selectListNeedToken', param, closeLoading)
}
/**
 * 查看某条订单
 * @param {*参数} param
 */
export function bill(param, closeLoading) {
  return request.fetchPost('/v1/app/bill/select', param, closeLoading)
}
/**
 * 查看评论列表(订单评价的评论)
 * @param {*参数} param
 */
export function commentList(param, closeLoading) {
  return request.fetchPost('/v1/app/comment/selectList', param, closeLoading)
}
/**
 * 插入评论(订单评价的评论)
 * @param {*参数} param
 */
export function commentInsert(param, closeLoading) {
  return request.fetchPost('/v1/app/comment/insert', param, closeLoading)
}
/**
 * 通过车主Id获得我的信息
 * @param {*参数} param
 */
export function myInfo(param, closeLoading) {
  return request.fetchPost('/v1/app/carowner/selectMyInfo', param, closeLoading)
}
/**
 * 完成评价
 * @param {*参数} param
 */
export function evaluationBill(param, closeLoading) {
  return request.fetchPost('/v1/app/bill/evaluationBill', param, closeLoading)
}
/**
 * 更新车主
 * @param {*参数} param
 */
export function upUser(param, closeLoading) {
  return request.fetchPost('/v1/app/carowner/update', param, closeLoading)
}
/**
 * 新增积分
 * @param {*参数} param
 */
export function integralInsert(param, closeLoading) {
  return request.fetchPost('/v1/app/integral/insert', param, closeLoading)
}
/**
 * 判断某个车主当天某项任务操作次数
 * @param {*参数} param
 */
export function getTaskCount(param, closeLoading) {
  return request.fetchPost('/v1/app/integral/getATaskCount', param, closeLoading)
}
