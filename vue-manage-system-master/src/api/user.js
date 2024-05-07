import axios from "../utils/request"
// 登陆接口注册
export function sign(loginAct, loginPwd, isRememberMe) {
    return axios.post("/api/login", {
        loginAct,
        loginPwd,
        isRememberMe
    })
}

// 查询所有用户数据
export function searchuserall() {
    return axios.get('/api/user/all')
}

// 根据用户的id值删除用户
export function deleteUser(id) {
    return axios.delete(`/api/user/${id}`, {

    })
}

//根据用户的id值查找用户
export function searchuser(id) {
    return axios.get(`/api/user/${id}`)
}

// 新增用户
export function adduser(loginAct, loginPwd, name, phone, email, expireTime, state) {
    return axios.post("/api/user" + "?" + "loginAct=" + loginAct + "&" + "loginPwd=" + loginPwd + "&" +
        "name=" + name + "&" + "phone=" + phone + "&" + "email=" + email + "&" + "expireTime=" + expireTime +
        "&" + "state=" + state, {
        loginAct,
        loginPwd,
        name,
        phone,
        email,
        expireTime,
        state
    })
}
export const addUser = (loginAct, loginPwd, name, phone, email, role, expireTime, state, params) => {
    return axios.post(`/api/user?loginAct=${loginAct}&loginPwd=${loginPwd}&name=${name}&phone=${phone}&email=${email}&role=${role}&expireTime=${expireTime}&state=${state}`, params);
}


//编辑用户信息

export function editUser(id, loginAct, loginPwd, name, phone, email, role, expireTime, state, params) {
    return axios.put(`/api/user?id=${id}&loginAct=${loginAct}&loginPwd=${loginPwd}&name=${name}&phone=${phone}&email=${email}&role=${role}&expireTime=${expireTime}&state=${state}`, params);
  }



// 根据id批量删除用户
export const delUserBySelect = (ids) => {
    return axios.delete(`/api/user/batch/${ids}`)
}