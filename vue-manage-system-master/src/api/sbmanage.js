import request from '../utils/request'



//查找设备信息表中的全部信息

export const getSbList = () => {
    return request.get('/device/info/get')
}


// 根据id查找设备信息表中信息
export const getSBInfoById = (id) => {
  return request.get(`/device/info/get/${id}`)
}

// 查找设备维修表中全部信息
export const getSbRepairList = () => {
  return request.get(`/device/maint/get`)
}

//根据id查找设备维修表中信息
export const getSbRepairById = (id) => {
  return request.get(`/device/maint/get/${id}`)
}

//分页查询：根据设备号、设备区间（起始设备号、结束设备号）、设备名、 设备类型、设备状态、维修者姓名、维修者电话、维修时间区间（开始维修时间、结束维修时间）查找设备维修表信息
export const getEmployeeInfoByPage_1 = (startDeviceId, endDeviceId, deviceName, deviceType, deviceSituation, maintManagerName, maintManagerPhone, startMaintTime, endMaintTime) => {
  const params = {}
  if (startDeviceId !== '') {
    params.startDeviceId = startDeviceId;
  }
  if (endDeviceId !== '') {
    params.endDeviceId = endDeviceId;
  }
  if (deviceName !== '') {
    params.deviceName = deviceName;
  }
  if (deviceType !== '') {
    params.deviceType = deviceType;
  }
  if (deviceSituation !== '') {
    params.deviceSituation = deviceSituation;
  }
  if (maintManagerName !== '') {
    params.maintManagerName = maintManagerName;
  }
  if (maintManagerPhone !== '') {
    params.maintManagerPhone = maintManagerPhone;
  }
  if (startMaintTime !== '') {
    params.startMaintTime = startMaintTime;
  }
  if (endMaintTime !== '') {
    params.endMaintTime = endMaintTime;
  }
  return request.get('/device/maint/getByPage', { params });
}