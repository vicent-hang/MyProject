const db = require('../db/index')
const bcrypt = require('bcryptjs')

//获取用户信息
exports.getUserInfo = (req, res) => {
  const sqlQuery = 'select id,username,email,user_img,status from users where id = ?'
  // 用户的id 在 token中 ，通过请求的req.auth属性拿到
  db.query(sqlQuery , req.auth.id , (err , result) => {
    // 查询失败
    if(err) return res.send({status: 1, message: err.message});
    if(result.length !== 1) return res.send({status: 1, message: '查询用户失败'});
    //查询成功
    res.send({
      status: 1,
      message: 'OK',
      data: result[0]
    })
  })
}

//更新用户信息
exports.updateUserInfo = (req , res) => {
  const userInfo = req.body
  const sqlUpdate = 'update users set ? where id = ?'
  db.query(sqlUpdate, [userInfo , userInfo.id] , (err, result) => {
    if(err) return res.send({status: 1, message: err.message});
    if(result.affectedRows !== 1) return res.send({status: 1, message: '更新失败'});
    res.send({
      status: 0,
      message: 'OK'
    })
  })
}

//重置密码
exports.updatePwd = (req ,res) => {
  //查询用户是否存在
  const sqlQuery = 'select * from users where id = ?'
  db.query(sqlQuery , req.auth.id , (err , result) => {
    if(err) return res.send({status: 0 ,message: err.message});
    if(result.length !== 1) return res.send({status: 1, message: '用户不存在'});
    //判断旧密码oldPwd是否与数据库一致
    const pwdResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
    if(!pwdResult) return res.send({status: 0, message: '原密码错误'});
    //重置
    //对新密码加密
    const newPwd = bcrypt.hashSync(req.body.newPwd , 10)
    const sqlUpdate = 'update users set password = ? where id = ?'
    db.query(sqlUpdate , [newPwd , req.auth.id] , (err , result) => {
      if(err) return res.send({status: 1, message: err.message});
      if(result.affectedRows !== 1) return res.send({status: 1, message: '重置失败'});
      res.send({
        status: 0,
        message: '重置成功 OK'
      })
    })
  })
}

//更新用户头像
exports.updatePic = (req , res) => {
  const sqlUpdate = 'update users set user_img = ? where id = ?'
  db.query(sqlUpdate , [req.body.user_img, req.auth.id] , (err , result) => {
    if(err) return res.send({status: 1, message: err.message});
    if(result.affectedRows !== 1) return res.send({status: 1, message: '更新头像失败'});
    res.send({
      status: 0,
      message: '更新头像成功'
    })
  })
}