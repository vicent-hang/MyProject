const express = require('express')
const { getUserInfo, updateUserInfo, updatePwd, updatePic } = require('../router_fn/userInfo')
const { update_schema, updatePwd_schema, updatePic_schema } = require('../schema/user')
const expressJoi = require('@escook/express-joi')
const router = express.Router()

router.get('/userinfo', getUserInfo)

//验证局部中间件
router.post('/userinfo' ,expressJoi(update_schema), updateUserInfo)

router.post('/updatepsw',expressJoi(updatePwd_schema) ,updatePwd)

router.post('/updatepic',expressJoi(updatePic_schema), updatePic)

module.exports = router