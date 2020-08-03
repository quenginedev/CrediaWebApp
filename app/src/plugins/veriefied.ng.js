import axios from 'axios'
import { functions } from "../configs";
const http = axios.create({
    baseURL: functions.url,
    headers: {
        authorization: functions.secret
    }
})

const verify = {
    bvn : function (data){
        return http.post('/verifiedNg', data)
            .then(res=>res.data)
            .catch(err=>err.response)
    }
}

export default {
    install(Vue, options){
        Vue.prototype.$verifiedNG = verify
    }
}