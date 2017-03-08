import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomeView from '../views/HomeView'

const routes = [
    {
      path: '/', component: HomeView,
      children: [
        { path: '', component: HomeView }
      ]
    },
    { path: '*', redirect: '/'  }
]

export default new Router({
  mode: 'history',
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  routes
})