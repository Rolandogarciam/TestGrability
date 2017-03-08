import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'

const app = new Vue({
  router,
  store,
  ...App  
}).$mount('#app')

export { app, router, store }