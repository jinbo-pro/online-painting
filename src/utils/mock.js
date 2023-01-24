import Mock from 'mockjs'
import { identityList } from '@/config/app'

function getImg(index) {
  return `http://www.ruanyifeng.com/images_pub/pub_${index}.jpg`
}

/**
 * 模拟数据列表
 * @param {number|string} count
 * @returns
 */
export function listData(count = '2-5') {
  const res = Mock.mock({
    [`data|${count}`]: [
      {
        id: '@guid()',
        stars: '@integer(1, 9999)',
        title: '@word()',
        checked: false,
        userName: '@name()',
        'userImg|+3': 1,
        content: '@sentence()',
        createTime: '@date(dd/MM/yyyy)',
        'path|+1': 1,
        'userList|2-3': ['@name()'],
        identityList: identityList.slice(0, Mock.Random.integer(1, identityList.length))
      }
    ]
  })
  const list = res.data
  for (let item of list) {
    item.path = getImg(item.path)
    item.userImg = getImg(item.userImg)
  }
  return list
}

export function getAllGalleries() {
  const res = Mock.mock({
    'data|5-10': [
      {
        id: '@guid()',
        title: '@word()',
        content: '@sentence()',
        'coverList|2-3': [{ 'path|+1': 1 }]
      }
    ]
  })
  const list = res.data
  for (let item of list) {
    item.coverList = item.coverList.map((e) => getImg(e.path))
  }
  return list
}
