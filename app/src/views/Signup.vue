<template>
    <v-main class="blue-grey lighten-5 auth-bg">
        <v-row justify="end" class="fill-height">
            <v-col class="pa-0" v-if="$vuetify.breakpoint.smAndUp" sm="2" md="5" lg="6">
                <v-img height="100vh" src="../assets/img/auth_bg.png"></v-img>
            </v-col>
            <v-col class="pa-0 fill-height" sm="10" md="7" lg="6">
                <v-card style="overflow-y: scroll; height: 100vh" flat tile class="px-8 px-sm-16 fill-height" :class="{ 'pt-12': !alert.show }">
                    <v-alert dense v-if="alert.show" :type="alert.type || 'info'">
                        {{alert.message}}
                        <v-btn @click="alert.show = false" absolute right small icon><v-icon size="18">mdi-close</v-icon></v-btn>
                    </v-alert>
                    <v-form
                            class="text-center"
                            ref="form"
                            v-model="validators.valid"
                            lazy-validation
                    >
                        <v-card-title class="grey--text justify-center mb-7">
                            <img height="46px" src="../assets/img/credia-logo.svg"/>
                        </v-card-title>
                        <v-btn-toggle
                            active-class="accent white--text"
                            v-model="user.account_type"
                            mandatory
                        >
                            <v-btn :outlined="user.account_type !== 'sme'" value="SME" min-width="120">
                                SME
                            </v-btn>
                            <v-btn :outlined="user.account_type !== 'lender'" value="LENDER" min-width="120">
                                Lender
                            </v-btn>
                        </v-btn-toggle>
                        <v-card-subtitle class="text-center">
                            <h3 class="headline mt-7 primary--text">Welcome to Credia</h3>
                            <p class="mb-7">The digital financial marketplace where you can apply for the funds you need conveniently anytime, anywhere from your device.</p>
                            <p class="">Already signed up? <router-link :to="{name: 'login'}" class="font-weight-bold secondary--text">Log in</router-link></p>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-text-field
                                    v-model="user.first_name"
                                    @keypress.enter="signUpUser"
                                    name="signup_first_name"
                                    type="text"
                                    :rules="validators.first_name"
                                    required
                                    dense
                                    outlined
                                    placeholder="First Name"></v-text-field>
                            <v-text-field
                                    v-model="user.last_name"
                                    @keypress.enter="signUpUser"
                                    name="signup_last_name"
                                    type="text"
                                    :rules="validators.last_name"
                                    required
                                    dense
                                    outlined
                                    placeholder="Last Name"></v-text-field>
                            <v-text-field
                                    v-model="user.email"
                                    @keypress.enter="signUpUser"
                                    name="signup_email"
                                    type="email"
                                    required
                                    :rules="validators.email"
                                    dense
                                    outlined
                                    placeholder="Email Address"></v-text-field>
                            <v-text-field
                                    v-model="user.password"
                                    @keypress.enter="signUpUser"
                                    name="signup_password"
                                    :type="show_password ? 'text' : 'password'"
                                    required
                                    :rules="validators.password"
                                    dense
                                    outlined
                                    placeholder="Create a password">
                                <v-icon
                                        @click="show_password = !show_password"
                                        slot="append"
                                >{{show_password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'}}</v-icon>
                            </v-text-field>
                            <v-btn @click="signUpUser" :loading="create_btn_loading" block color="secondary" dark>
                                <v-icon left>mdi-account-plus-outline</v-icon>
                                Sign Up
                            </v-btn>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <p class="text-center">
                                Or sign up with
                                <v-btn dark text color="red darken-1"><v-icon left>mdi-google-plus</v-icon>Google</v-btn>
                            </p>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-main>
</template>

<script>
    export default {
        name: "SignUp",
        data(){
            return {
                show_password: false,
                create_btn_loading: false,
                alert: {
                    type: '',
                    show: false,
                    message: ''
                },
                validators:{
                    valid: true,
                    email: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ],
                    first_name: [v => !!v || 'First name is required'],
                    last_name: [v => !!v || 'First name is required'],
                    password: [
                        v => !!v || 'Password is required',
                        v => (v && v.length > 6) || 'Password must not be less than 6 characters'
                    ]
                },
                user: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    account_type: 'sme'
                }
            }
        },
        methods: {
            async signUpUser(){
                this.alert.show = false
                if(this.$refs.form.validate()){
                    this.create_btn_loading = true
                    try {
                        await this.$creadia.createUser(this.user)
                        await this.$firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
                        await this.$router.push({name: 'home'})
                    }catch (e) {
                        console.log(e)
                        this.alert = {
                            show: true,
                            type: 'warning',
                            message: e.message
                        }
                    }finally {
                        this.create_btn_loading = false
                    }
                }
            }
        },
        created() {
            this.$firebase.functions().httpsCallable('creadia').then

        }
    }
</script>

<style scoped>

</style>