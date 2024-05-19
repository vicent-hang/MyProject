const express = require('express')
const app = express()
//接受跨域请求中间件
const cors = require('cors')
//路由
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
const articleNavRouter = require('./router/aticle_nav')
const articleRouter = require('./router/article')
const Joi = require('joi')
const config = require('./config')
const expressJWT = require('express-jwt')

app.use(cors())
//配置解析表单中间件
app.use(express.urlencoded({extended: false}))

//解析客户端携带的token
//以api开头的不需要token 认证
app.use(expressJWT.expressjwt({secret: config.secretKey , algorithms: ['HS256']}).unless({path: [/^\/api/]}))
app.use('/api' ,userRouter)
app.use('/users', userInfoRouter)
app.use('/article', articleNavRouter)
app.use('/article', articleRouter)

// 错误捕获全局中间件
app.use((err , req , res , next) => {
  if(err instanceof Joi.ValidationError) return res.send({
    status: 1,
    message: err.message
  })
  if(err.name === 'UnauthorizedError') {
    return res.send({status: 1, message: 'token认证失败'})
  }
  //其他错误
  // res.send({
  //   status: 1,
  //   message: err.message
  // })
})
app.listen(8080 , () => {
  console.log('服务已启动, 请访问http://127.0.0.1:8080');
  
})