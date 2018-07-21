import request from '@/utils/axios'

/**
 * 获取品牌
 * @param {*参数} param
 */
export function getCarTypeBrand(param) {
  return request.fetchPost('/v1/app/car/getCarTypeBrand', param)
}

/**
 * 获取厂家车型
 * @param {*参数} param
 */
export function getCarTypes(param) {
  return request.fetchPost('/v1/app/car/getCarTypes', param)
}
/**
 * 获取年款
 * @param {*参数} param
 */
export function getCarTypeSaleName(param) {
  return request.fetchPost('/v1/app/car/getCarTypeSaleName', param)
}

