<template>
    <v-row>
        <v-col cols="12">
            <v-btn depressed class="mb-5">Back</v-btn>
            <v-card flat>
                <v-card-text>
                    <v-row justify="space-between" align="center">
                        <v-col cols="12" sm="6" md="4" lg="3">
                            <v-card ripple color="blue-grey lighten-5" class="text-center" flat>
                                <v-card-title class="justify-center">
                                    <v-progress-circular color="primary" value="30" size="124" width="15" rotate="270"></v-progress-circular>
                                </v-card-title>
                                <v-card-text>
                                    View Application
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-chip>Pending</v-chip>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "AllApplications",
        data(){
            return {
                applications: []
            }
        },
        created(){
            // this.$apollo.query({
            //     query:
            // })
        }
    }
</script>

<style scoped>

</style>