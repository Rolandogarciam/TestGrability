import Vue from 'vue'
import Vuex from 'vuex'
import characters from './characters'
import comics from './comics'

Vue.use(Vuex)

Vue.config.debug = true

export default new Vuex.Store({
  modules: {
    characters,
    comics
  },
  strict: true,
})
  