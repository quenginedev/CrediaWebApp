import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/storage'

export default {
    install(Vue, options){
        firebase.initializeApp(options)
        Vue.prototype.$firebase = firebase
    }
}