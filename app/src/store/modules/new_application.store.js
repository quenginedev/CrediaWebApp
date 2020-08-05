export default {
    namespaced: true,
    state: {
        application: null
    },
    getters: {
        has_pending(state){
            return !!state.application
        }
    }
}