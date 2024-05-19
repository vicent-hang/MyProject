const db = require('../db/index')

exports.getArticleNav = (req ,res) => {
  const sqlQuery = 'select * from article_nav where is_del=0'
  db.query(sqlQuery , (err, result) => {
    if(err) return res.send({status: 1, message: err.message});
    res.send({
      status: 0,
      message: '查询成功',
      data: result
    })
  })
}

exports.addArticleNav = (req , res) => {
  //查询是否存在
  const articleInfo = req.body
  const sqlQuery = 'select * from article_nav where nav_name = ? or nav_enname = ?'
  db.query(sqlQuery , [articleInfo.nav_name , articleInfo.nav_enname] , (err , result) => {
    if(err) return res.send({status: 1, message: err.message});
    // 2条数据占用
    if(result.length === 2) return res.send({status: 1, message: '分类名和英文分类名已存在'});
    if(result.length === 1 && result[0].nav_enname === articleInfo.nav_enname && result[0].nav_name === articleInfo.nav_name){
      return res.send({status: 1, message: '分类名和英文分类名已存在'})
    }
    if(result.length === 1 && result[0].nav_enname === articleInfo.nav_enname) {
      return res.send({status: 1, message: '英文分类名已存在'})
    }
    if(result.length === 1 && result[0].nav_name === articleInfo.nav_name) {
      return res.send({status: 1, message: '分类名已存在'})
    }

    //插入新数据
    const sqlAdd = 'insert into article_nav set ?'
    db.query(sqlAdd, articleInfo , (err , result ) => {
      if(err) return res.send({status: 1, message: err.message});
      if(result.affectedRows !== 1) return res.send({status: 1, message: '增加失败'});
      res.send({
        status: 0,
        message: '增加成功',
        data: articleInfo
      })
    })
  })
}

//根据id删除文章分类
exports.delAritcleNav = (req , res) => {
  //判断id是否存在
  const sqlQuery = 'select * from article_nav where id = ?'
  db.query(sqlQuery , req.params.id , (err , result) => {
    if(err) return res.send({status: 1, message: err.message});
    if(result.length !== 1) return res.send({status: 1, message: '文章分类不存在'});
    //删除 is_del = 1
    const sqlUpdate = 'update article_nav set is_del = 1 where id = ?'
    db.query(sqlUpdate, req.params.id , (err  , result ) => {
      if(err) return res.send({status: 1, message: err.message});
      if(result.affectedRows !== 1) return res.send({status: 1, message: '删除失败'});
      res.send({
        status: 0,
        message: '删除成功'
      })
    })
  })
}

//根据id获取新闻分类
exports.getNav = (req , res) => {
  const sqlQuery = 'select * from article_nav where id = ?'
  db.query(sqlQuery , req.query.id, (err , result) => {
    if(err) return res.send({status: 1, message: err.message});
    if(result.length !== 1) return res.send({status: 1, message: '查询失败'});
    res.send({
      status: 0,
      message: '查询成功',
      data: result[0]
    })
  })
}

//根据id更新新闻分类
exports.updateNav = (req , res) => {
  //判断是否存在该id
  const articleInfo = req.body
  const sqlQuery = 'select * from article_nav where id != ? and ( nav_name = ? or nav_enname =? ) '
  db.query(sqlQuery , [articleInfo.id ,articleInfo.nav_name, articleInfo.nav_enname], (err, result) => {
    if(err) return res.send({status: 1, message: err.message});
    //2条数据占用
    if(result.length === 2) return res.send({status: 1, message: '分类名和英文分类名都被占用'});
    if(result.length ===1 && result[0].nav_name === articleInfo.nav_name) return res.send({
      status: 1,
      message: '分类名已被占用'
    })
    if(result.length ===1 && result[0].nav_enname === articleInfo.nav_enname) return res.send({
      status: 1,
      message: '英文分类名已被占用'
    })
    //更新
    const sqlUpdate = 'update article_nav set ? where id = ?'
    db.query(sqlUpdate, [articleInfo, articleInfo.id], (err , result) => {
      if(err) return res.send({status: 1, message: err.message});
      if(result.affectedRows !== 1) return res.send({status: 1, message: '更新失败'});
      res.send({
        status: 0,
        message: '更新成功'
      })
    })
  })
}