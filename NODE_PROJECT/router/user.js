const express = require('express')
const userFn = require('../router_fn/user')
const { register_schema } = require('../schema/user')
const exressJoi = require('@escook/express-joi')
const router = express.Router()

router.post('/register' , exressJoi(register_schema) , userFn.register )
router.post('/login' ,exressJoi(register_schema), userFn.login)
module.exports = router