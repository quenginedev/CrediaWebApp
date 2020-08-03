import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/auth',
      component: () => import('../layouts/Auth'),
      children: [
        {name: 'login', path: 'login', component: () => import('../views/Login')},
        {name: 'signup', path: 'signup', component: () => import('../views/Signup')},

      ]
    },
    {
      path: '/',
      component: ()=>import('../layouts/Main'),
      children: [
        { name: 'home', path: '', component: ()=>import('../views/Home') },

      ]
    },

  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
