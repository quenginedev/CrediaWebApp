import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'

export default {
    install(Vue, options){
        firebase.initializeApp(options)
        Vue.prototype.$firebase = firebase
    }
}