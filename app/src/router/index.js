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
      path: '/guarantor/:id',
      name: 'guarantor',
      component: _=>import('../views/Guarantor')
    },
    {
      path: '/',
      component: ()=>import('../layouts/Main'),
      children: [
        { name: 'home', path: '', component: ()=>import('../views/Home') },
        { path: 'application', component: ()=>import('../views/Applications'), children: [
            {name: 'all-applications', path: '', component: ()=>import('../views/Applications/AllApplications')},
            {name: 'loan-application', path: 'loan-application', component: ()=>import('../views/Applications/LoanApplication')},
            {name: 'selected-application', props: true, path: ':id', component: ()=>import('../views/Applications/SelectedApplication')},
            {name: 'application-lenders', props: true, path: ':id/lenders', component: ()=>import('../views/Applications/ApplicationLendersList')},
            {
              name: 'application-lenders-bio',
              props: true, path: ':id/lenders/:lender_id',
              component: ()=>import('../views/Applications/ApplicationLenderBio')
            },
          ]
        },

      ]
    },

  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
