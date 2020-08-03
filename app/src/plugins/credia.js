import axios from 'axios'
import { functions } from "../configs";
const http = axios.create({
    baseURL: `${functions.url}/creadia`,
    headers: {
        authorization: functions.secret
    }
})

const creadia = {
    createUser : (user) => {
        return http.post('/create_user', user)
            .then(res=>res.data)
            .catch(err=>err.response)
    }
}

export default {
    install(Vue, options){
        Vue.prototype.$creadia = creadia
    }
}