import request from '../utils/request'

// 查找全部员工职务表中信息
export const getWorkList = () => {
  return request.get('/employee/work_position/get')
}

//新增员工职务表中信息
export const addNewEmployeeWork = (positionName) => {
  return request.post(`/employee/work_position/add/${positionName}`)
}

//根据id删除员工职务表中信息
export const deleteWorkInfoById = (id) => {
  return request.post(`/employee/work_position/del/${id}`)
}


//编辑员工职务表中信息
export const editWorkInfo = (id, positionName) => {
  return request.post(`/employee/work_position/edit` , {
    employeeWorkPosition : {
      id,
      positionName
    }
  })
}

// 根据id查找员工职务表中信息
export const getWorkInfoById = (id) => {
  return request.get(`/employee/work_position/get/${id}`)
}