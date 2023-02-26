import { getTimeDistance, timeNumberFormat } from './jcore'

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
 * 英文时间
 * @param {number} val
 * @returns
 */
export function enDate(val) {
  if (!val) return ''
  const d = timeNumberFormat(val)
  return new Date(d).toDateString()
}
/**
 * 转换数字时间格式
 * @param {number} date 日期
 * @param {number} time 时间
 * @returns {string}
 */
export function parseTimeFnumber(date, time) {
  return timeNumberFormat(date, time)
}
