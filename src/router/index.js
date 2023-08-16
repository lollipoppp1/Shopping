import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'

const Login = () => import('@/views/login')
const Search = () => import('@/views/search/')
const SearchList = () => import('@/views/search/list.vue')
const Prodetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      // 二级路由
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})

const authUrls = ['/pay', '/myorder']
// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }

  const token = store.getters.token
  if (token) next()
  else next('/login')
})

export default router
