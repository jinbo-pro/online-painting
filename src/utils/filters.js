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
