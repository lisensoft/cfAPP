import Vue from 'vue'
import Vuex from 'vuex'
import cheFuData from './modules/cheFu'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cheFuData
  },
  getters
})

export default store
