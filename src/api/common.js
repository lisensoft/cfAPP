import request from '@/utils/axios'

/**
 * 根据类别名获取字典数据
 * @param {*参数} param
 */
export function getTypeList(param, closeLoading) {
  return request.fetchPost('/v1/app/sysDict/selectList', param, closeLoading)
}

