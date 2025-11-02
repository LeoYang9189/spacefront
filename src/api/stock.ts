import request from "@/utils/request";

interface ProductDetail {
  productName: string;
  subProductName: string;
  retailPrice?: number | string; // 零售价：商品的零售价格，单位为元
  productBlurb: string;
  productCoverImageList: string[];
  productParameter: Record<string, string>;
  designerIntroduction: string;
  productShow: string;
  qrcode: string;
}

// 产品列表
export function getProductList(params: any) {
  return request.post({ url: "/fr/product/productCardList", params });
}

// 产品详情
export function getProductDetail(params: {
  id: string;
}): Promise<ProductDetail> {
  return request.get({ url: "/fr/product/productDetail", params });
}

// 品牌列表
export function getBrandList(params: any) {
  return request.post({ url: "/fr/brand/list", params });
}

// 品牌详情
export function getBrandDetail(params: any) {
  return request.get({ url: "/fr/brand/detail", params });
}

// 产品推荐
export function getProductRecommend(params: any) {
  return request.post({ url: "/fr/product/productList", params });
}
