/**
 * 工具类 Created by jiachenpan on 16/11/18.
 */

const parseTime = function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

const formatTime = function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

const getLocalStorage = (...args) => {
  const storage = {}
  for (const arg of args) {
    storage[arg] = window
      .localStorage
      .getItem(arg) || ''
  }
  return storage
}

const setLocalStorage = (data) => {
  for (const prop in data) {
    window
      .localStorage
      .setItem(prop, data[prop])
  }
}

const removeLocalStorage = (...args) => {
  for (const arg of args) {
    window
      .localStorage
      .removeItem(arg)
  }
}
// sessionStorage 保存
const getSessionStorage = (...args) => {
  const storage = {}
  for (const arg of args) {
    storage[arg] = window
      .sessionStorage
      .getItem(arg) || ''
  }
  return storage
}

const setSessionStorage = (data) => {
  for (const prop in data) {
    window
      .sessionStorage
      .setItem(prop, data[prop])
  }
}
/**
 * 获取url参数
 * @param {*} name  参数名
 */
const getLocationParam = function(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window
    .location
    .hash.split('?')[1]
    .match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return ''
}
/**
 * 生成GUID
 * @returns {*}
 */
const Guid = function newGuid() {
  let guid = formatTime(new Date(), 'yyyyMMdd-HHmm-ss')
  for (let i = 1; i <= 18; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
    if ((i === 2) || (i === 6) || (i === 10)) {
      guid += '-'
    }
  }
  return guid
}

/**
 * 深度复制 数组 数组中的对象
 * @param {*} source 数据
 */
const objDeepCopy = function objDeepCopy(source) {
  var sourceCopy = source instanceof Array ? [] : {}
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  }
  return sourceCopy
}

/**
 * 保留小数位数方法
 * @param number 数
 * @param defaultBit  默认的小数位数
 * @returns
 */
const NumberFixed = function NumberFixed(number, { defaultBit = 0 }) {
  if (number === 'Infinity' || isNaN(number) || number === undefined || number == null) {
    return 0
  }
  let n = 2
  if (defaultBit !== 0) { // 有默认小数位数读取默认
    n = defaultBit
  }
  return +(+number).toFixed(n)
}
const localStorageTool = {// localstorage 的方法
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
}
const sessionStorageTool = {// sessionStorageTool 的方法
  getSessionStorage,
  setSessionStorage
}
export {
  localStorageTool, // localstorage 工具
  getLocationParam,
  sessionStorageTool, // sessionstorage 工具app 不能用sessioinStorage
  parseTime,
  formatTime,
  NumberFixed, // 保留小数位数 js减法计算问题
  objDeepCopy, // 深度复制
  Guid // 生成juid
}
