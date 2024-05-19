const express = require('express')
const { getArticleNav, addArticleNav, delAritcleNav, getNav, updateNav } = require('../router_fn/aticle_nav')
const router = express.Router()
const exressJoi = require('@escook/express-joi')
const { addnav_schema, delnav_schema, getnav_schema, updatenav_schema } = require('../schema/article_nav')

router.get('/navlist' , getArticleNav)
router.post('/addnav', exressJoi(addnav_schema) , addArticleNav)
router.get('/delnav/:id',exressJoi(delnav_schema), delAritcleNav)
router.get('/getnav', exressJoi(getnav_schema) ,  getNav)
router.post('/updatenav', exressJoi(updatenav_schema), updateNav)

module.exports = router