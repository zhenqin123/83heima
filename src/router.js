import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/'
import Login from './views/login'
import Main from './views/home/main'
// import Comment from './views/comment'
// import Material from './views/material'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [{
        path: '',
        component: Main
      },
      {
        path: 'comment',
        component: () => import('./views/comment')

      },
      {
        path: 'material',
        component: () => import('./views/material')

      },
      {
        path: 'articles',
        component: () => import('./views/articles')

      },
      {
        path: 'publish',
        component: () => import('./views/publish')

      },
      {
        path: 'publish/:id',
        component: () => import('./views/publish')

      },
      {
        path: 'account',
        component: () => import('./views/account')

      },
      {
        path: 'Graphicdata',
        component: () => import('./views/Graphicdata')

      }
      ]

    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      component: () => import('./views/404')

    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
