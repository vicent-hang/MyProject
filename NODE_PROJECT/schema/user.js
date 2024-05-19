//配置用户名和密码的验
const Joi = require('joi')
//定义用户名验证规则
const username = Joi.string().alphanum().min(2).max(12).required()
//定义密码验证规则
const password = Joi.string().pattern(/^[\S]{6,15}$/).required()

exports.register_schema = {
  //验证body
  body: {
    username,
    password
  },
  //验证query
  query: {

  },
  //验证params
  params: {

  }
}

//定义id的验证
const id = Joi.number().integer().min(1).required()
//定义email验证
const email = Joi.string().email().required()
exports.update_schema = {
  body: {
    id,
    email
  }
}

//验证新旧密码是否一致
exports.updatePwd_schema = {
  body: {
    oldPwd: password,
    //不能和oldPwd一致，合并password的验证规则
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
  }
}

//验证用户头像格式
// base64格式
const user_img = Joi.string().dataUri().required()
exports.updatePic_schema = {
  body: {
    user_img
  }
}