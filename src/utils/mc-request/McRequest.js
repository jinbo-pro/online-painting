import { BaseRequest } from './BaseRequest'
import { queryString } from './utils'
export class McRequest extends BaseRequest {
  get(url, data, ctr) {
    return this.main(url, { params: data }, ctr)
  }
  postForm(url, data, ctr) {
    return this.main(
      url,
      {
        data: queryString(data),
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      },
      ctr
    )
  }
  postFormData(url, data, ctr) {
    return this.main(
      url,
      {
        data,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data;' }
      },
      ctr
    )
  }
  postJson(url, data, ctr) {
    return this.main(
      url,
      {
        data: JSON.stringify(data),
        method: 'post',
        headers: { 'content-type': 'application/json;charset=UTF-8' }
      },
      ctr
    )
  }
}
