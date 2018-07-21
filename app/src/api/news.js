import request from '@/utils/axios'

/**
 * 获取头条列表
 * @param {*参数} param
 */
export function newsList(param, closeLoading) {
  return request.fetchPost('/v1/app/news/selectList', param, closeLoading)
}
/**
 * 获取一条头条
 * @param {*参数} param
 */
export function newsOne(param, closeLoading) {
  return request.fetchPost('/v1/app/client/news/select', param, closeLoading)
}
/**
 * 头条评论列表
 * @param {*参数} param
 */
export function newsCommentList(param, closeLoading) {
  return request.fetchPost('/v1/app/news/commentList', param, closeLoading)
}
/**
 * 评论头条
 * @param {*参数} param
 */
export function newsComment(param, closeLoading) {
  return request.fetchPost('/v1/app/news/comment', param, closeLoading)
}
/**
 * 头条点赞
 * @param {*参数} param
 */
export function newLike(param, closeLoading) {
  return request.fetchPost('/v1/app/news/like', param, closeLoading)
}
/**
 * 头条评论点赞
 * @param {*参数} param
 */
export function newsCommentLike(param, closeLoading) {
  return request.fetchPost('/v1/app/news/comment/like', param, closeLoading)
}
