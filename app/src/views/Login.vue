<template>
    <v-main class="blue-grey lighten-5 auth-bg">
        <v-row class="fill-height">
            <v-col class="pa-0" v-if="$vuetify.breakpoint.smAndUp" sm="2" md="5" lg="6">
                <v-img height="100vh" src="../assets/img/auth_bg.png"></v-img>
            </v-col>
            <v-col class="pa-0 fill-height" sm="10" md="7" lg="6">
                <v-card style="overflow-y: scroll; height: 100vh" tile class="px-8 px-sm-16 fill-height" :class="{ 'pt-12': !alert.show }">
                    <v-alert dense v-if="alert.show" :type="alert.type || 'info'">
                        {{alert.message}}
                        <v-btn @click="alert.show = false" absolute right small icon><v-icon size="18">mdi-close</v-icon></v-btn>
                    </v-alert>
                    <v-form
                            @submit="signInByEmail"
                            ref="form"
                            v-model="validators.valid"
                            lazy-validation
                    >
                        <v-card-title class="grey--text justify-center mb-7">
                            <img height="46px" src="../assets/img/credia-logo.svg"></img>
                        </v-card-title>
                        <v-card-subtitle class="text-center">
                            <h3 class="headline mt-10 mb-7 primary--text">Welcome to Credia</h3>
                            <p class="">Don't have an account? <router-link :to="{name: 'signup'}" class="font-weight-bold">Sign Up</router-link></p>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-text-field
                                    v-model="user.email"
                                    name="signup_email"
                                    type="email"
                                    required
                                    :rules="validators.email"
                                    dense
                                    outlined
                                    placeholder="Email Address"></v-text-field>
                            <v-text-field
                                    v-model="user.password"
                                    name="signup_password"
                                    :type="show_password ? 'text' : 'password'"
                                    required
                                    :rules="validators.password"
                                    dense
                                    outlined
                                    placeholder="Password">
                                <v-icon
                                        @click="show_password = !show_password"
                                        slot="append"
                                >{{show_password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'}}</v-icon>
                            </v-text-field>
                            <v-btn type="submit" :loading="create_btn_loading" block color="secondary" dark>
                                <v-icon left>mdi-lock-outline</v-icon>
                                Sign In
                            </v-btn>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <p>Or sign in with
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
        name: "Login",
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
                    email: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ],
                    password: [
                        v => !!v || 'Password is required',
                        v => (v && v.length > 6) || 'Password must not be less than 6 characters'
                    ]
                },
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async signInByEmail(e){
                e.preventDefault()
                this.alert.show = false
                if(this.$refs.form.validate()){
                    this.create_btn_loading = true
                    try {
                        await this.$firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
                        await this.$router.push({name: 'home'})
                    }catch (e) {
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