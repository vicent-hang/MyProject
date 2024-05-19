const Joi  = require('joi')
const nav_name = Joi.string().required()
const nav_enname = Joi.string().alphanum().required()
//integer()整型
const id = Joi.number().integer().required()

exports.addnav_schema = {
  body: {
    nav_name,
    nav_enname
  }
}

exports.delnav_schema = {
  params: {
    id
  }
}

exports.getnav_schema = {
  query: {
    id
  }
}

exports.updatenav_schema = {
  body: {
    id,
    nav_name,
    nav_enname
  }
}