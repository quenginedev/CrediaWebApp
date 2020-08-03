export default {
    namespaced: true,
    state: {
        auth: {
            id: null,
            email: null,
            firebase_id: null,
            updated_at: null,
            details: {}
        }

    },
    getters: {
        getAuth(state){
            return {
                id: state.auth.id,
                email: state.auth.email,
                firebase_id: state.auth.firebase_id
            }
        },
        getDetails(state){
            return state.auth.details
        }
    },
    mutations: {
        setAuth(state, auth){
            state.auth = auth
        }
    }
}