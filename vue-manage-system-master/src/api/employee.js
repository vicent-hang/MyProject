import request from '../utils/request'


//获取所有员工信息
export const getEmployeeAll = () => {
  return request.get('/employee/info')
}

//增加员工
export const addNewEmployee = (userId,salary, workTime, workPosition , auth) => {
  return request.post('/employee/info/add'+ "?" + "userId=" + userId + "&"+ "salary=" + salary + "&" + "workTime=" + workTime + "&" +
  "workPosition=" + workPosition + "&" + "auth=" + auth, {
      userId,
      salary,
      workTime,
      workPosition,
      auth
  })
}

//根据id查查员工
export const getEmployeeById = (id) => {
  return request.get(`/employee/info/${id}`)
}

//根据userId修改员工信息
export const setEmpoyeeInfo = (id ,userId,salary,workPosition,auth,workTime) => {
  // 检查是否提供了id，如果没有，抛出错误或返回 rejected promise
  if (userId === undefined || userId === null) {
    // throw new Error('ID is required.');
    return Promise.reject(new Error('ID is required.'));
  }
  return request.put('/employee/info/edit'+ "?" +"id=" + id + "&" + "userId=" + userId + "&" + "salary=" + salary + "&" + "workPosition=" + workPosition + "&" +
  "auth=" + auth + "&" + "workTime=" + workTime , {
      id,
      userId,
      salary,
      workPosition,
      auth,
      workTime
  })
}

//删除员工信息
export const deleteEmployeeInfo = (id) => {
    return request.delete(`/employee/info/del/${id}`)
}

//根据id批量删除员工表信息
export const delEmployeesInfoBySelect = (ids) => {
  return request.delete(`/employee/info/batchDel/${ids}` )
}

//分页查询员工表信息(10条-页);支持模糊查询;条件可任意选填(或不填)
//弃用
export const  getEmpInfoByPage = (obj , current) => {
  return request.get('/employee/info/getByPage' , {
    employeeInfoQuery: obj,
      current,
    })
}

//分页查询员工表信息(10条-页);支持模糊查询;条件可任意选填(或不填)
export function getEmployeeInfoByPage(name, phone, email, positionName, workTime, minSalary, maxSalary, roleName) {
  const params = {};
  if (name !== '') {
    params.name = name;
  }
  if (phone !== '') {
    params.phone = phone;
  }
  if (email !== '') {
    params.email = email;
  }
  if (positionName !== '') {
    params.positionName = positionName;
  }
  if (workTime !== '') {
    params.workTime = workTime;
  }
  if (minSalary !== '') {
    params.minSalary = minSalary;
  }
  if (maxSalary !== '') {
    params.maxSalary = maxSalary;
  }
  if (roleName !== '') {
    params.roleName = roleName;
  }

  return request.get(`/employee/info/getByPage`, { params });
}