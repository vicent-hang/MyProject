const exress = require('express')
const { addArticleMsg, getNewList, delNews, getNewsInfoById } = require('../router_fn/article')
const expressJoi = require('@escook/express-joi')
const router = exress.Router()

//导入解析FormData格式数据的模块
const multer = require('multer')
const path = require('path')
const { addArticle_schema, getNewList_schema, delNews_schema } = require('../schema/article')
//创建multer对象，通过dest属性设置文件存放路径（存入upload文件夹）
const upload = multer({dest: path.join(__dirname , '../upload')})

router.post('/addmsg', upload.single('cover_img'),expressJoi(addArticle_schema),  addArticleMsg)
router.get('/newlist',expressJoi(getNewList_schema), getNewList)
router.get('/delnews/:id' ,expressJoi(delNews_schema) , delNews)
router.get('/newsinfo/:id', expressJoi(delNews_schema) , getNewsInfoById)


module.exports = router