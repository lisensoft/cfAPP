import request from '@/utils/axios'

/**
 * 输入手机号，获取验证码
 * @param {*参数} param
 */
export function getMessage(param) {
  return request.fetchPost('/v1/app/sysShortMsg/getShortMsg', param)
}
/**
 * 登录接口
 * @param {*参数} param
 */
export function login(param) {
  return request.fetchPost('/v1/app/base/login', param)
}
/**
 * 获取用户信息
 * @param {*参数} param
 */
export function getUser(param) {
  return request.fetchPost('/v1/app/carowner/selectByToken', param)
}
/**
 * 获取用户信息-wuyong
 * @param {*参数} param
 */
export function getInfo(param) {
  return request.fetchPost('/v1/sysUser/getUserByToken', param)
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

/**
 * 获取用户权限信息-wuyong
 * @param {*参数} param
 */
export function getUserMenu() {
  return request.fetchPost('/v1/sysMenu/selectListByUserId', {})
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

