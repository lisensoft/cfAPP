import request from '@/utils/axios'

/**
 * 获取首页轮播图
 * @param {*参数} param
 */
export function getCarousel(param, closeLoading) {
  return request.fetchPost('/v1/app/carousel/selectTop4', param, closeLoading)
}
/**
 * 获取首页类别
 * @param {*参数} param
 */
export function getcategory(param, closeLoading) {
  return request.fetchPost('/v1/app/category/selectTop8', param, closeLoading)
}

