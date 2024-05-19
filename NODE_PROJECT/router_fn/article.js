const db = require('../db/index')
const path =  require('path')

//发布新闻文章
exports.addArticleMsg = (req , res) => {
  //判断是否上传了图片
  // console.log(req.file);000
  if(!req.file || req.file.fieldname !== 'cover_img' ){
    return res.send({status:1 , message: '文章缩略图不能为空'})
  }
  //整理插入的数据
  const dataInfo = {
    //提交的表单数据
    ...req.body,
    //文章封面
    cover_img: path.join('/upload', req.file.fieldname),
    //发布时间
    c_date: new Date(),
    //当前登录的用户
    author_id: req.auth.id
  }
  const sqlAdd = 'insert into article set ?'
  db.query(sqlAdd , dataInfo , (err , result ) => {
    if(err) return res.send({status: 1, message: err.message});
    if(result.affectedRows !== 1) return res.send({status: 1, message: '添加失败'});
    res.send({
      status: 0,
      message: '文章发布成功'
    })
  })
  // res.send({
  //   status: 0, 
  //   message: 'OK',
  //   reqFile: req.file,
  //   reqBody: req.body
  // })
}


//获取新闻文章列表 每页显示5条数据 显示第一页
exports.getNewList = (req , res) => {
  const pageInfo = req.query
  const sqlQuery = 'select id,title,c_date from article where nav_id = ? limit ?,?'
  const x = pageInfo.pagesize*(pageInfo.pagenum - 1)
  const y = pageInfo.pagesize
  db.query(sqlQuery , [pageInfo.nav_id, x,y], (err , result) => {
    if(err) return res.send({status: 1, message: err.message});
    res.send({
      status: 0,
      message: '获取新闻文章列表成功',
      data: result
    })
  })
}

//删除新闻文章
exports.delNews = (req , res) => {
  const sqlQuery = 'select * from article where id = ?'
  db.query(sqlQuery , req.params.id , (err , result) => {
    if(err) return res.send({status: 1, message: err.message});
    if(result.length !== 1) return res.send({status: 1, message: '该新闻文章不存在'});
    const sqlUpdate = 'update article set is_del = 1 where id = ?'
    db.query(sqlUpdate , req.params.id , (err , result) => {
      if(err) return res.send({status: 1, message: err.message});
      if(result.affectedRows !== 1) return res.send({status: 1, message: '删除失败'});
      res.send({
        status: 0,
        message: '文章删除成功'
      })
    })
  })
}

//根据id 获取新闻文章
exports.getNewsInfoById = (req, res) => {
  const id = req.params.id
  const sqlQuery = 'select * from article where id =?'
  db.query(sqlQuery , id , (err , result) => {
    if(err) return res.send({status: 1, message: err.message});
    if(result.length !== 1) return res.send({status: 1, message: '查询失败'});
    res.send({
      status: 0,
      message: '查询成功',
      data: result[0]
    })
  })
}