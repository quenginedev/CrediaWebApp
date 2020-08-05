import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.store'
import new_application from './modules/new_application.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    new_application
  }
})
