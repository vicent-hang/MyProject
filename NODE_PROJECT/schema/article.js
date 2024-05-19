
const Joi = require('joi')

const title = Joi.string().required()
const content = Joi.string().required()
const nav_id = Joi.number().integer().required()

const pagesize = Joi.number().integer().required()
const pagenum = Joi.number().integer().required()

const id = Joi.number().integer().required()

exports.addArticle_schema = {
  body: {
    title,
    content,
    nav_id
  }
}

exports.getNewList_schema = {
  query: {
    nav_id,
    pagesize,
    pagenum
  }
}

exports.delNews_schema = {
  params: {
    id
  }
}

