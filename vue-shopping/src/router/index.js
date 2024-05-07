import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import User from '@/views/layout/user'

import store from '@/store'
// 打包优化:路由懒加载
// 目标:配置路由懒加载，实现打包优化
// 说明:当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
const Login = () => import('@/views/login')
const MyOrder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/user', component: User }
      ],
      redirect: '/home'
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确定将来是哪个商品，路由参数中携带 id
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchList', component: SearchList }
  ]
})

// 添加导航守卫
// 所有的路由在真正被访问到之前（解析渲染对应的组件页面前） ， 都会先经过全局前置守卫
// 只有全局前置守卫放行了 ， 才会到达对应页面

// 全局前置导航守卫
// to：到哪去，到哪儿去的完整路由信息对象 （路径，参数）
// from ： 从哪儿来， 从哪儿来的完整路由信息对象（路径， 对象）
// next()  是否放行
// （1）next（） 直接放行，放行到to要去的路径
// （2）next（路径） 进行拦截，拦截到next里面配置的路径

// 定义一个数组 保存 权限页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 访问的页面是否为权限页面  to.path获取当前页面路径
  if (!authUrls.includes(to.path)) {
    // 非权限 直接放行
    next()
    return
  }

  // 权限页面 判断是否已有登录凭证token
  const token = store.getters.token
  // console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
