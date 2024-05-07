import request from '../utils/request'

//藏品信息--查找全部
export const getRelicAll = () => {
  return request.get('/relic/info/get')
}


//藏品信息--新增
export const addNewRelicInfo = (relicName, relicSort, relicLevel, relicState, relicSituation, relicWarehouse) => {
  return request.post(`/relic/info/add?relicName=${relicName}&relicSort=${relicSort}&relicLevel=${relicLevel}&relicState=${relicState}&relicSituation=${relicSituation}&relicWarehouse=${relicWarehouse}`);
}

//藏品信息--根据id删除
export const delRelicInfoById = (id) => {
  return request.delete(`/relic/info/del/${id}`)
}


//藏品信息--修改
export const editRelicInfo = (id, relicName, relicSort, relicLevel, relicState, relicSituation, relicWarehouse) => {
  return request.post(`/relic/info/edit?id=${id}&relicName=${relicName}&relicSort=${relicSort}&relicLevel=${relicLevel}&relicState=${relicState}&relicSituation=${relicSituation}&relicWarehouse=${relicWarehouse}`);
}

// 藏品信息--根据id查找
export const getRelicInfoById = (id) => {
  return request.get(`/relic/info/get/${id}`)
}

//藏品保养记录--查找全部
export const getRelicMaintAll = () => {
  return request.get('/relic/maint/get');
}

//藏品保养记录--新增
export const addRelicMaint = (relicId, maintTime, maintContent, leaderName, leaderPhone) => {
  return request.post(`/relic/maint/add?relicId=${relicId}&maintTime=${maintTime}&maintContent=${maintContent}&leaderName=${leaderName}&leaderPhone=${leaderPhone}`);
}

//藏品保养记录--根据id删除
export const delRelicMaintById = (id) => {
  return request.delete(`/relic/maint/del/${id}`);
}

//藏品保养记录--修改
export const editRelicMaint = (id, relicId, maintTime, maintContent, leaderName, leaderPhone) => {
  return request.post(`/relic/maint/edit?id=${id}&relicId=${relicId}&maintTime=${maintTime}&maintContent=${maintContent}&leaderName=${leaderName}&leaderPhone=${leaderPhone}`);
}

//藏品保养记录--根据id查找
export const getRelicMaintById = (id) => {
  return request.get(`/relic/maint/get/${id}`);
}

//展览安排--查找全部
export const getDisplayRecordAll = () => {
  return request.get(`/relic/display_record/get`);
}

//展览安排--新增
export const addRelicDisplay = (relicId, displayTime, displayPosition, leaderName, leaderPhone) => {
  return request.post(`/relic/display_record/add?relicId=${relicId}&displayTime=${displayTime}&displayPosition=${displayPosition}&leaderName=${leaderName}&leaderPhone=${leaderPhone}`);
}

//展览安排--根据id查找 
export const getDisplayRecordById = (id) => {
  return request.get(`/relic/display_record/get/${id}`);
}

//展览安排--根据id删除
export const delRelicDisplayById = (id) => {
  return request.delete(`/relic/display_record/del/${id}`);
}

//展览安排--修改
export const editRelicDisplay = (id, relicId, displayTime, displayPosition, leaderName, leaderPhone) => {
  return request.post(`/relic/display_record/edit?id=${id}&relicId=${relicId}&displayTime=${displayTime}&displayPosition=${displayPosition}&leaderName=${leaderName}&leaderPhone=${leaderPhone}`);
}

//藏品仓库--查找全部
export const getRelicWarehouseAll = () => {
  return request.get(`/relic/warehouse/get`);
}


//入库审核--查找全部
export const getStoreInAll = () => {
  return request.get(`/store/in/get`);
}


//入库审核--根据id查找
export const getStoreInById = (id) => {
  return request.get(`/store/in/get/${id}`);
}

//入库审核--新增
export const addStoreIn = (relicId, inTime) => {
  return request.post(`/store/in/add?relicId=${relicId}&inTime=${inTime}`);
}

//入库审核--根据id删除
export const delStoreInById = (id) => {
  return request.delete(`/store/in/del/${id}`);
}

//入库审核--修改
export const editStoreIn = (id, relicId, inTime) => {
  return request.post(`/store/in/edit?id=${id}&relicId=${relicId}&inTime=${inTime}`);
}

//出库审核--查找全部
export const getStoreOutAll = () => {
  return request.get(`/store/out/get`);
}

//出库审核--根据id查找
export const getStoreOutById = (id) => {
  return request.get(`/store/out/get/${id}`);
}

//出库审核--新增
export const addStoreOut = (relicId, outPlace, outTime, returnTime, outReason) => {
  return request.post(`/store/out/add?relicId=${relicId}&outPlace=${outPlace}&outTime=${outTime}&returnTime=${returnTime}&outReason=${outReason}`);
}

//出库审核--修改
export const editStoreOut = (id, relicId, outPlace, outTime, returnTime, outReason) => {
  return request.post(`/store/out/edit?id=${id}&relicId=${relicId}&outPlace=${outPlace}&outTime=${outTime}&returnTime=${returnTime}&outReason=${outReason}`);
}

//出库审核--根据id删除
export const delStoreOutById = (id) => {
  return request.delete(`/store/out/del/${id}`);
}

//定期盘点记录Plus--查找全部
export const  getStockPlusAll = () => {
  return request.get(`/store/stockPlus/get`);
}

// 定期盘点记录--新增
export const addStockTake = (relicId, maintId, displayId, storeId) => {
  return request.post(`/store/stockTake/add?relicId=${relicId}&maintId=${maintId}&displayId=${displayId}&storeId=${storeId}`);
}

//定期盘点记录--根据id删除
export const delStockTakeById = (id) => {
  return request.delete(`/store/stockTake/del/${id}`);
}

//定期盘点记录--修改
export const editStockTake = (id, relicId, maintId, displayId, storeId) => {
  return request.post(`/store/stockTake/edit?id=${id}&relicId=${relicId}&maintId=${maintId}&displayId=${displayId}&storeId=${storeId}`);
}

//定期盘点记录Plus--根据id查询
export const getStockPlisById = (id) => {
  return request.get(`/store/stockPlus/get/${id}`);
}

//定期盘点记录Plus--动态SQL、模糊查询
export const users = (relicName, relicLevel, relicState,maintContent, displayPosition) =>  {
  // 创建一个对象用于存储非空值的参数
  const params = {};

  // 检查 relicName 是否为空，如果不为空则加入到 params 对象中
  if (relicName !== '') {
    params.relicName = relicName;
  }

  // 检查 relicLevel 是否为空，如果不为空则加入到 params 对象中
  if (relicLevel !== '') {
    params.relicLevel = relicLevel;
  }

  // 检查 relicState 是否为空，如果不为空则加入到 params 对象中
  if (relicState !== '') {
    params.relicState = relicState;
  }

  // 检查 maintContent 是否为空，如果不为空则加入到 params 对象中
  if (maintContent !== '') {
    params.maintContent = maintContent;
  }

  // 检查 displayPosition 是否为空，如果不为空则加入到 params 对象中
  if (displayPosition !== '') {
    params.displayPosition = displayPosition;
  }

  // 发起请求，使用 params 对象作为参数
  return request.get(`/store/stockPlus/getByPage`, { params });
};

