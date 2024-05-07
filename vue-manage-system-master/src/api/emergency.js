import request from '../utils/request'

//当发生危险情况时
export const whenEmergency = (id) => {
  return request.post(`/other/emergency?id=${id}`);
}