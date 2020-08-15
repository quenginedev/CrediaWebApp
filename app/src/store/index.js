import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.store'
import persistData from 'vuex-persistedstate'
import new_application from './modules/new_application.store'
import persistedListPaths from "./persistedListPaths";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    new_application
  },
  plugins: [persistData(
      {
        key: 'credia_pending_application',
        paths: persistedListPaths
      }
  )]
})
