/**
 * 复制文字到剪切板
 * @param {string} text
 * @returns
 */
export function copyText(text) {
  if (!text) {
    console.info('没有要复制的内容')
    return
  }
  document.execCommand('Copy')
  var inputZ = document.createElement('input')
  inputZ.setAttribute('id', 'inputCopy')
  inputZ.value = text
  document.body.appendChild(inputZ)
  document.getElementById('inputCopy').select()
  document.execCommand('Copy')
  document.body.removeChild(inputZ)
}
