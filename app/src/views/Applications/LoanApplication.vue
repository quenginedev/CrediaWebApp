<template>
    <v-row justify="center">
        <v-col cols="12" sm="8" md="10" lg="8" class="text-center">
            <span class="text-h5">{{progress}}%</span>
            <v-progress-linear
                    rounded
                    v-model="progress"
                    color="light-green accent-4"
                    height="15"
                    value="0"></v-progress-linear>
            <p class="text-h4 mt-7 primary--text font-weight-medium mt-5">{{steps[step].name}}</p>
            <p class="caption" >{{steps[step].desc}}</p>
            <v-card flat>
                <v-snackbar v-model="error.show" bottom color="red">
                    {{error.message}}
                </v-snackbar>
                <v-card-text class="pa-6 px-sm-12">
                    <v-form
                        ref="form"
                        lazy-validation
                    >
                        <v-row justify="space-around">
                            <LoanRequirement :fund_details="application.fund_details" v-if="step == 0">
                                <template v-slot:default="{complete}">
                                    <v-btn @click="storeFundDetails" depressed block large color="secondary">
                                        Continue
                                    </v-btn>
                                </template>
                            </LoanRequirement>
                            <PersonalDetails v-slot:default="{updatedDetails}" :details="{...application.personal_details}" v-if="step == 1">
                                <template >
                                    <v-row justify="space-between">
                                        <v-col class="text-center" cols="12" >
                                            <v-btn :loading="loading.personal_details"
                                                   block
                                                   @click="updateDetails(updatedDetails)" depressed large outlined color="secondary">
                                                Update
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="6" sm="6" md="5">
                                            <v-btn block @click="go(-1)" depressed large >
                                                back
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="6" sm="6" md="5">
                                            <v-btn block @click="storePersonalDetails(updatedDetails)" depressed large color="secondary" >
                                                Next
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </template>
                            </PersonalDetails>
                            <BusinessDetails @cac_change="storeBusinessDetails" :details="application.business_details" v-if="step == 2">
                                <v-row justify="space-between">
                                    <v-col cols="6" sm="6" md="5">
                                        <v-btn block @click="go(-1)" depressed large >
                                            back
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="6" sm="6" md="5">
                                        <v-btn block @click="storeBusinessDetailsGo(1)" depressed large color="secondary" >
                                            Next
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </BusinessDetails>
                            <BusinessFinance :financials="application.business_financials" v-if="step == 3">
                                <v-row justify="space-between">
                                    <v-col cols="6" sm="6" md="5">
                                        <v-btn block @click="go(-1)" depressed large >
                                            back
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="6" sm="6" md="5">
                                        <v-btn block @click="storeBusinessFinancials" depressed large color="secondary" >
                                            Next
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </BusinessFinance>
                            <ApplicationValidation v-if="step == 4" :validations="application.validations">
                                <template v-slot:default="{ valid }">
                                    <v-row>
                                        <v-col cols="6" sm="6" md="5">
                                            <v-btn block @click="go(-1)" depressed large >
                                                back
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="6" sm="6" md="5">
                                            <v-btn block
                                                   @click="processApplication"
                                                   depressed large color="secondary"
                                                   :loading="loading.application"
                                            >
                                                Next
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </template>
                            </ApplicationValidation>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {updateUserDetailsByAuthID} from '../../gqlQueries/user'
    import {createApplication} from '../../gqlQueries/application'

    import LoanRequirement from "./LoanFundDetails";
    import PersonalDetails from "./PersonalDetails";
    import BusinessDetails from "./BusinessDetails";
    import BusinessFinance from "./BusinessFinance";
    import ApplicationValidation from "./ApplicationValidation";

    export default {
        name: "LoanApplication",
        components: {ApplicationValidation, BusinessFinance, BusinessDetails, PersonalDetails, LoanRequirement},
        computed: {
            progress(){
                return Math.floor(((this.step / (this.steps.length)) * 100))
            },
        },
        data(){
            return {
                error: {
                    show: false,
                    message: ''
                },
                step: this.$store.state.new_application.step,
                loading: {
                    personal_details: false,
                    application: false
                },
                steps: [
                    {name: 'Loan Requirement', desc: 'Understanding and accessing your intentions is the first step, let’s help you communicate your purpose.'},
                    {name: 'Personal Details', desc: 'Let’s get to know you better!'},
                    {name: 'Business Details', desc: 'You’ve worked hard to start this business, tell us about it'},
                    {name: 'Business Finance', desc: 'Your financial status helps us gain insights into how you run and have been running your business operations'},
                    {name: 'Identity Verification', desc: 'Make it easy to get you and your business verified'},
                ],
                application: {
                    application_type: 'LOAN',
                    fund_details: this.$store.state.new_application.fund_details,
                    personal_details: this.$store.state.new_application.personal_details,
                    business_details: this.$store.state.new_application.business_details,
                    business_financials: this.$store.state.new_application.business_financials,
                    validations: this.$store.state.new_application.validations,
                }
            }
        },
        methods:{
            go(step){
                this.step = this.step + step
                //Fix since the scroll to top doesn't always work
                setTimeout(_=>{
                    this.$vuetify.goTo(0)
                }, 100)
            },
            storeFundDetails(){
                if(this.$refs.form.validate()){
                    this.$store.commit('new_application/setFundDetails', {
                        step: this.step + 1,
                        fund_details: this.application.fund_details
                    })
                    this.go(1)
                }
            },
            processApplication(){
                //todo bvn and phone verification
                if (this.$refs.form.validate()) {
                    if(this.application.validations.statement_url){
                        this.loading.application = true
                        let auth = this.$store.getters['user/getAuth']
                        this.$apollo.mutate({
                            mutation: createApplication,
                            variables: {
                                data: {
                                    auth: {connect: {id: auth.id}},
                                    application_type: this.application.application_type,
                                    fund_details: {create: this.application.fund_details},
                                    personal_details: {create: this.application.personal_details},
                                    business_details: {create: this.application.business_details},
                                    business_financials: {create: this.application.business_financials},
                                    validations: {create: this.application.validations},
                                }
                            }
                        }).then(res => {
                            let application_id = res.data.createApplication.id
                            this.$store.commit('new_application/resetApplication')
                            this.$router.push({
                                name: 'selected-application',
                                params: {
                                    id: application_id,
                                    new: true
                                }
                            })
                        }).catch(err => {
                            console.error(err)
                        }).finally(_ => {
                            this.loading.application = false
                        })
                    }else{
                        this.error = {
                            show: true,
                            message: "Financial Statement required"
                        }
                    }
                }
                //Remove this trash
                // setTimeout(()=>{
                //     let application_id = 'iNPdf9D63zFzdsKGCjE5'
                //     this.$store.commit('new_application/resetApplication')
                //     this.$router.push({
                //         name: 'selected-application',
                //         params: {
                //             id: application_id,
                //             new: true
                //         }
                //     })
                // }, 1500)
            },

            storeBusinessFinancials(){
                if (this.$refs.form.validate()) {
                    this.$store.commit('new_application/setBusinessFinance', {
                        step: this.step + 1,
                        financials: this.application.business_financials
                    })
                    this.go(1)
                }
            },
            storeBusinessDetails(step = 0){
                this.$store.commit('new_application/setBusinessDetails', {
                    step: this.step + step,
                    details: this.application.business_details
                })
            },
            storeBusinessDetailsGo(){
                console.log(this.application.business_details)
                if (this.$refs.form.validate()){
                    if(this.application.business_details.cac_file_link){
                        this.storeBusinessDetails(1)
                        this.go(1)
                    }else{
                        this.error.message = "CAC Registration Form Required"
                        this.error.show = true
                    }
                }
            },
            storePersonalDetails(updatedDetails){
                if(this.$refs.form.validate()){
                    this.$store.commit('new_application/setPersonalDetails', {
                        step: this.step + 1,
                        details: updatedDetails
                    })
                    this.application.personal_details = updatedDetails
                    this.go(1)
                }
            },
            updateDetails(updatedDetails){
                this.loading.personal_details = true
                let userAuth = this.$store.getters['user/getAuth']
                this.$apollo.mutate({
                    mutation: updateUserDetailsByAuthID,
                    variables: {
                        id: userAuth.id,
                        details: updatedDetails
                    }
                }).then(res=>{
                    this.$store.commit('user/setAuth', res.data.updateAuth)
                    this.application.personal_details = res.data.updateAuth.details
                })
                .finally(_=>{
                    this.loading.personal_details = false
                })
            }
        }
    }
</script>

