<template>
    <v-col class="fill-height">
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
                <v-spacer></v-spacer>
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
                        <span class="display-1">Logo</span>
                    </v-list-item>

                    <v-list-item class="mb-5" selectable v-ripple v-for="(nav, i) in navs" :key="i">
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
            <v-main>
                <router-view></router-view>
            </v-main>
        </template>
    </v-col>
</template>

<script>
    import { userByFirebaseID } from '../gqlQueries/user'
    export default {
        name: "Main",
        data(){
            return {
                userDetails: this.$store.getters['user/getDetails'],
                loading: true,
                drawer: false,
                navs: [
                    {icon: 'mdi-view-grid-outline', name: 'Home'},
                    {icon: 'mdi-file-outline', name: 'Credit Report'},
                    {icon: 'mdi-file-document-edit-outline', name: 'Application'},
                    {icon: 'mdi-book-outline', name: 'Resources'},
                    {icon: 'mdi-account-multiple-outline', name: 'Lenders'},
                    {icon: 'mdi-cog-outline', name: 'Settings'},
                    {icon: 'mdi-help-circle-outline', name: 'Settings'},

                ]
            }
        },
        mounted() {
            this.$firebase.auth().onAuthStateChanged(user=>{
                if(!user){
                    console.log('no user')
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