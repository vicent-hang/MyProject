const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.register = (req , res) => {
  const userInfo = req.body
  //判断用户提交的表单是否为空
  if(!userInfo.username || !userInfo.password) {
    return res.send({status: 1, message: '用户名或密码为空!'})
  }

  // 检查名称是否已被占用
  const sqlQuery = 'select * from users where username = ?'
  db.query(sqlQuery , userInfo.username, (err , result) => {
    if(err) {
      return res.send({status: 1, message: err.message})
    }
    //已存在
    if(result.length > 0) {
      return res.send({status: 1,message: '用户名已被占用!'})
    }

    // 对密码加密
    userInfo.password = bcrypt.hashSync(userInfo.password , 10)
    //插入
    const sqlAdd = 'insert into users set ?'
    db.query(sqlAdd , userInfo , (err , result) => {
      if(err) return res.send({status: 1, message: err.message})
      if(result.affectedRows !== 1) {
        return res.send({ status: 1, message: '注册失败'})
      }
      res.send({status: 0, message: '注册成功'})
    })
  })
}

exports.login = (req , res) => {
  const userInfo = req.body
  
  //查询是否存在用户
  const sqlQuery = 'select * from users where username = ?'
  db.query(sqlQuery , userInfo.username , (err, result) => {
    if(err) return res.send({status: 1 , message: err.message});
    if(result.length !== 1) return res.send({status: 1 , message: '登录失败'});
    //验证用户密码是否正确
    const pswRes = bcrypt.compareSync(userInfo.password , result[0].password)
    if(!pswRes) return res.send({status: 1, message: '密码错误'});
    //登录成功
    //使用JWT认证生产token字符串
    //获取相应给用户的信息，并将重要信息置为空
    const user = { ...result[0] , password: '' , user_img: '' }
    // 生产token字符串
    const tokenStr = jwt.sign(user , config.secretKey , {expiresIn: '24h'})
    res.send({
      status: 0,
      message: '登录成功',
      token: 'Bearer ' + tokenStr
    })
  })
}