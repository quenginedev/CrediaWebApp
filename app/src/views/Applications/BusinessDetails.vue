<template>
    <v-col cols="12">
        <v-text-field
                v-model="details.name"
                label="Company Name"
                outlined
                required
                :rules="[v=> !!v || 'Company name required']"
        ></v-text-field>
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field
                        v-model="details.business_type"
                        label="Type of business"
                        outlined
                        required
                        :rules="[v=> !!v || 'Business type required']"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                        v-model="details.registation_id"
                        label="Business Registration Number"
                        outlined
                        type="number"
                        required
                        :rules="[v=> !!v || 'Registration number required']"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-left mt-n9 mb-5">
                <input style="display: none" ref="cac_reg_input" @change="uploadPic" type="file" placeholder="asdasd"/>
                <p class="subtitle-1">CAC Registration Form </p>
                <v-btn @click="$refs.cac_reg_input.click()" :loading="uploading" depressed large class="secondary">
                    <v-icon left>mdi-plus</v-icon>
                    {{details.cac_file_link ? 'Change form' : 'Upload form'}}
                    <template v-slot:loader>
                        <span>{{ Math.floor(uploadProgress)}}%</span>
                    </template>
                </v-btn>
            </v-col>
        </v-row>
        <v-text-field
                v-model="details.industry_type"
                label="Nature of business"
                outlined
                required
                :rules="[v=> !!v || 'Business nature required']"
        ></v-text-field>
        <v-text-field
                type="number"
                v-model.number="details.business_start_year"
                label="Year of operations"
                outlined
                required
                :rules="[v=> !!v || 'Business start year required']"
        ></v-text-field>
        <v-text-field
                v-model="details.street_address"
                label="Street Address"
                outlined
                required
                :rules="[v=> !!v || 'Business street address required']"
        ></v-text-field>
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field
                        v-model="details.state"
                        label="State"
                        outlined
                        required
                        :rules="[v=> !!v || 'State required']"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                        v-model="details.local_goverment_area"
                        label="Local Government Area"
                        outlined
                        required
                        :rules="[v=> !!v || 'Local government required']"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-text-field
                v-model="details.website_url"
                label="Input your website URL"
                outlined

        ></v-text-field>
        <v-text-field
                v-model="details.social_media_url"
                label="Input your business social media handle"
                outlined
        ></v-text-field>
        <slot></slot>
    </v-col>
</template>
<script>
    export default {
        name: 'BusinessDetails',
        props: {
            details: {
                type: Object
            }
        },
        data(){
            return {
                uploadProgress: 0,
                uploading: false
            }
        },
        methods: {
            uploadPic(e){
                let file = this.$refs.cac_reg_input.files[0]
                if(file){
                    this.uploading = true
                    let auth = this.$store.getters['user/getAuth']
                    let uploadTask = this.$firebase.storage().ref(`${auth.id}/cac_${Date.now()}`).put(file)
                    uploadTask.on('state_changed', snapshot=>{
                        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, err=>{
                        console.log({err})
                    }, ()=>{
                        uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                            this.$emit('cac_change')
                            this.details.cac_file_link = url
                        }).finally(_=>{
                            this.uploading = false
                        })
                    })
                }
            }
        },
        mounted() {
            if (!this.details.business_start_year){
                this.details.business_start_year = new Date().getFullYear()
            }
        }
    }
</script>