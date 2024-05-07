import request from '../utils/request'

//藏品分类--查找全部
export const getRelicSortAll = () => {
  return request.get(`/relic/sort/get`);
}

//