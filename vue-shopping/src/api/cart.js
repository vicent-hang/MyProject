import request from '@/utils/request'

// 添加商品到购物车
// goodsId => 商品id
// goodsSkuId => 商品规格id （红色的iphone 8）
export const getCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId

  })
}

// 获取购物车商品列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 获取商品更新
export const getUpdadeCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车中的商品
export const deletCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
