import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Exeres from '@/components/Exeres'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Exeres',
      name: 'Exeres',
      component: Exeres
    }
  ]
})
