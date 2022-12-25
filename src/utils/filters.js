import { parseTime } from './jcore'

/**
 * 数字格式化
 * @param {number} val
 * @param {number} dec
 * @returns
 */
export function numberFormat(val, dec = 1) {
  const n = Number(val)
  if (n > 1e3) {
    return (n / 1e3).toFixed(dec) + 'k'
  } else {
    return n + ''
  }
}

/**
 * 转换时间格式
 * @param {number} date 日期
 * @param {number} time 时间
 * @returns {string}
 */
export function parseTimeFnumber(date, time) {
  if (!date) return ''
  date = String(date)
  if (date.length == 11) {
    return parseTime(date)
  }
  date = String(date).replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')
  if (!time) return date
  let result = []
  let list = [1000, 100, 100, 100]
  for (let item of list) {
    let t = parseInt(time % item)
    result.push(t < 10 ? '0' + t : '' + t)
    time /= item
  }
  time = result.reverse().slice(0, -1).join(':')
  return date + ' ' + time
}
