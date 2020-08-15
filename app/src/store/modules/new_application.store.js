export default {
    namespaced: true,
    state: {
        step: 0,
        application_type: null,
        fund_details: {},
        personal_details: {},
        business_details: {},
        business_financials: {},
        validations: {}
    },
    getters: {
        has_pending(state){
            return !!state.application_type
        }
    },
    mutations: {
        setApplicationType(state, application_type){
          state.application_type = application_type
        },
        resetApplication(state){
            state.step = 0,
            state.application_type = null,
            state.fund_details = {},
            state.personal_details = {},
            state.business_details = {},
            state.business_financials = {},
            state.validations = {}
        },
        setFundDetails(state, { step, fund_details }){
            state.step = step
            state.fund_details = fund_details
        },
        setPersonalDetails(state, {step, details}){
            state.step = step
            state.personal_details = details
        },
        setBusinessDetails(state, {step, details}){
            state.step = step
            state.business_details = details
        },
        setBusinessFinance(state, {step, financials}){
            state.step = step
            state.business_financials = financials
        },

    }
}