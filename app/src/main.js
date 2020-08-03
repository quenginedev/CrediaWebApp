import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import vuetify from './plugins/vuetify';
import verifyNG from './plugins/veriefied.ng'
import firebasePlugin from './plugins/firebase'
import firebaseConfig from "./firebase-config";
import creadia from './plugins/credia'

Vue.use(firebasePlugin, firebaseConfig)
Vue.use(verifyNG)
Vue.use(creadia)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  vuetify,
  render: h => h(App)
}).$mount('#app')
