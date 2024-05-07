import request from '../utils/request'
//巡查记录--查找全部
export const getSecureRecordAll = () => {
  return request.get(`/secure/record/get`);
}

//巡查记录--根据id查找
export function getSecureRecordById(id) {
  return request.get(`/secure/record/get/${id}`);
}

//巡查记录--新增
export function addSecureRecord(date, venue, managerName, report) {
  return request.post(`/secure/record/add?date=${date}&venue=${venue}&managerName=${managerName}&report=${report}`);
}

//巡查记录--根据id删除
export function delSecureRecordById(id) {
  return request.delete(`/secure/record/del/${id}`);
}

//巡查记录--修改
export function editSecureRecord(id, date, venue, managerName, report) {
  return request.post(`/secure/record/edit?id=${id}&date=${date}&venue=${venue}&managerName=${managerName}&report=${report}`);
}