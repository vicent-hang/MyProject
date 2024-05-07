<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登陆后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{totalSecond === second ? '获取验证码' : second + '秒后重新发送'}}</button>
        </div>
      </div>

      <div @click="vialdLogin" class="login-btn">登录</div>
    </div>

  </div>
</template>

<script>
import { getPicCode, getMshCode, codeLogin } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      mobile: '', // 用户输入的手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: '', // 用户输入短信验证码
      picKey: '', // 将来请求传递的图形验证码的唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 变更秒数
      timer: null // 定义定时器的 id
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key

      this.$toast('获取图形验证码成功')
    },
    // 校验 手机号 和 图形验证码 是否合法
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('输入的手机号不正确')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('输入的图形验证码不正确')
        return false
      }
      return true
    },
    // 登录校验
    async vialdLogin () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      // console.log(res)
      this.$store.commit('user/setUserInfo', res.data)

      // 进行判断，盘路由是否携带会跳地址
      // 1. 如果有 => 说明是其他页面，拦截到登录来的，需要回挑
      // 2. 如果没有 =》 正常去首页
      const path = this.$route.query.backUrl || '/'
      this.$router.replace(path)
      this.$toast('登录成功')
    },
    async getCode () {
      if (!this.validFn()) {
        return
      }

      // 当目前没有定时器开着 ， 且 totalSecond 和 second 一致
      if (!this.timer && this.totalSecond === this.second) {
        // 发送请求
        // 预期： 希望如果响应的status非200，最好抛出一个promise错误，await智慧等待成功的promise
        await getMshCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信发送成功，请注意查收')

        // 开启定时器
        this.timer = setInterval(() => {
          this.second--
          // console.log('定时器开启')

          if (this.second < 1) {
            clearInterval(this.timer)
            // 重置定时
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #787878;
    }
  }

  .form-item {
    border-bottom: 1px solid #c6c6c6;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    border-radius: 39px;
    color: #fff;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
