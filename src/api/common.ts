import { transformToCategoryConfig } from '@/enums/products'
import request from '@/utils/request'
import { tryCatch } from '@/utils/util'

// 获取验证码
export const getVerificationCode = (phone) => {
  return request.get({
    url: '/fr/auth/getVerificationCode',
    params: { phone },
  })
}

// 登录
export const authLogin = (params) => {
  return request.post({
    url: '/fr/auth/login',
    params: params,
  })
}

// 获取banner列表
export const getBannerList = () => {
  return request.get({
    url: '/fr/page/pageConfiguration',
    params: { pageCode: 'Banner' },
  })
}

// 获取banner2列表
export const getBanner2List = () => {
  return request.get({
    url: '/fr/page/pageConfiguration',
    params: { pageCode: 'ProductBanner' },
  })
}

// 产品分类
export async function getCategoryList() {
  const [err, res] = await tryCatch(request.get, {
    url: '/fr/page/pageConfiguration',
    params: { pageCode: 'Classification' },
  })
  if (err) return []
  return transformToCategoryConfig(res)
}

// 保存线索
export const saveContactUs = (params) => {
  return request.post({
    url: '/fr/contactUs/save',
    params,
  })
}
