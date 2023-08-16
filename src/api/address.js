import request from '@/utils/request'

// 获取地址列表
export const getAddressList = () => {
  console.log(request.get('/address/list'))
  return request.get('/address/list')
}
