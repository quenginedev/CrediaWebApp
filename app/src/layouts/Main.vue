<template>
    <div class="fill-height">
        <v-row v-if="loading" justify="center" align="center" class="fill-height">
            <div class="text-center">
                <v-progress-circular size="48" indeterminate color="primary"/>
                <p class="mt-3">Checking Authorization</p>
            </div>
        </v-row>
        <template v-else>
            <v-app-bar
                clipped-right
                app
                flat
                :color="$vuetify.theme.isDark ? 'black' : 'white'"
                class="pr-2 pl-2"
            >
                <v-spacer/>
                <v-col md="5" lg="7">
                    <v-text-field
                            v-if="$vuetify.breakpoint.mdAndUp"
                            filled
                            dense
                            filled
                            background-color="blue-grey lighten-5"
                            hide-details
                            prepend-inner-icon="mdi-magnify"
                            placeholder="Search"
                            class="mr-5 elevation-0"
                            >

                    </v-text-field>
                </v-col>
                <v-btn class="mr-3" icon color="primary">
                    <v-badge dot overlap content="1" bordered>
                        <v-icon>mdi-bell</v-icon>
                    </v-badge>
                </v-btn>
                <p
                    class="mt-5 mr-3 font-weight-bold heading"
                    v-if="$vuetify.breakpoint.mdAndUp">
                        {{userDetails.first_name}} {{userDetails.last_name}}
                </p>
                <v-btn class="mr-3" icon color="accent">
                    <v-avatar size="42">
                        <v-img src="https://randomuser.me/api/portraits/thumb/men/86.jpg"/>
                    </v-avatar>
<!--                    <v-icon>mdi-account-outline</v-icon>-->
                </v-btn>
                <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click="drawer = true">
                </v-app-bar-nav-icon>
            </v-app-bar>
            <v-navigation-drawer
                width="195px"
                app
                v-model="drawer"
                color="primary"
                dark
                :mobile-breakpoint="$vuetify.breakpoint.thresholds.sm"
            >
                <v-list
                        dense
                        nav
                        class="py-0"
                >
                    <v-list-item class="mt-3 mb-12  justify-center">
                        <v-list-item-icon>
                            <v-img contain src="../assets/img/logo_full_white.svg" height="32"></v-img>

                        </v-list-item-icon>
                    </v-list-item>

                    <v-list-item
                            :to="nav.to"
                            class="mb-5"
                            selectable
                            :exact="nav.exact"
                            v-ripple
                            v-for="(nav, i) in navs" :key="i">
                        <v-list-item-icon>
                            <v-icon>{{nav.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            <span class="subtitle-1">{{nav.name}}</span>
                        </v-list-item-title>
                    </v-list-item>
<!--                    <v-list-item-->
<!--                            v-for="item in items"-->
<!--                            :key="item.title"-->
<!--                            link-->
<!--                    >-->
<!--                        <v-list-item-icon>-->
<!--                            <v-icon>{{ item.icon }}</v-icon>-->
<!--                        </v-list-item-icon>-->

<!--                        <v-list-item-content>-->
<!--                            <v-list-item-title>{{ item.title }}</v-list-item-title>-->
<!--                        </v-list-item-content>-->
<!--                    </v-list-item>-->
                </v-list>
            </v-navigation-drawer>
            <v-main class="blue-grey lighten-5 fill-height">
                <v-container>
                    <router-view class="pt-3"></router-view>
                </v-container>
            </v-main>
        </template>
    </div>
</template>

<script>
    import { userByFirebaseID } from '../gqlQueries/user'
    export default {
        name: "Main",
        data(){
            return {
                userDetails: this.$store.getters['user/getDetails'],
                loading: true,
                drawer: !this.$vuetify.breakpoint.smAndDown,
                navs: [
                    {icon: 'mdi-view-grid-outline', name: 'Home', to: { name: 'home'}, exact: true},
                    {icon: 'mdi-file-document-edit-outline', name: 'Applications', to: '/application'},
                    {icon: 'mdi-book-outline', name: 'Resources', to: '#'},
                    {icon: 'mdi-account-multiple-outline', name: 'Lenders', to: '#'},
                    {icon: 'mdi-cog-outline', name: 'Settings', to: '#'},
                    {icon: 'mdi-help-circle-outline', name: 'Settings', to: '#'},
                ]
            }
        },
        mounted() {
            this.$firebase.auth().onAuthStateChanged(user=>{
                if(!user){
                    this.$router.push({name: 'login'})
                }else{
                    this.$apollo.query({
                        query: userByFirebaseID,
                        variables: {
                            where: {
                                firebase_id: user.uid
                            }
                        }
                    }).then(res=>{
                        let auth = res.data.auth
                        console.log(auth)
                        this.$store.commit('user/setAuth', auth)
                        this.userDetails = auth.details
                    }).catch(err=>{
                        console.error({err})
                    }).finally(_=>{
                        this.loading = false
                    })
                }
            })
        }
    }
</script>

<style scoped>

</style>