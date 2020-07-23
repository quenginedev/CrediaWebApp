import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import vuetify from './plugins/vuetify';
import firebasePlugin from './plugins/firebase'
import firebaseConfig from "./firebase-config";

Vue.use(firebasePlugin, firebaseConfig)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  vuetify,
  render: h => h(App)
}).$mount('#app')
