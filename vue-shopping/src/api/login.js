// 封装api模块的好处:
// 1.请求与页面逻辑分离
// 2.相同的请求可以直接复用
// 3.请求进行了统一管理

// 此处用于存放所有登录相关的接口请求
// 1. 获取图片验证码
import request from '@/utils/request'

export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2.获取短信验证码
export const getMshCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3.登录验证
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
