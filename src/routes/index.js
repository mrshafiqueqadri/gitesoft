import Vue from 'vue'
import VueRouter from 'vue-router'

// Page
import MasterLayout from '@/pages/layout'
import Login from '@/pages/auth/login'
import Signup from '@/pages/auth/signup'
import ViewFilm from '@/pages/films/view'
import CreateFilm from '@/pages/films/create'
import Home from '@/pages/home'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: MasterLayout,
      redirect: '/home',
      children:[
        {
          path: '/home',
          component: Home,
          name: 'Home'
        },
        {
          path: '/login',
          component: Login,
          name: 'Login'
        },
        {
          path: '/signup',
          component: Signup,
          name: 'Signup'
        },
        {
          path: '/film/create',
          component: CreateFilm,
          name: 'CreateFilm'
        },
        {
          path: '/film/:name',
          component: ViewFilm,
          name: 'ViewFilm'
        }
      ]
    }
  ]
})
