<template>
    <v-col cols="12">
        <v-text-field
                v-model="validations.bvn"
                :error-messages="err.bvn"
                label="Bank Verification Number"
                outlined
                required
                type="number"
                :rules="[v=> !!v || 'Bank verification required']"
        ></v-text-field>
        <v-select
                v-model="validations.person_id_type"
                :error-messages="err.person_id_type"
                :items="[
                    {text: 'Passport', value: 'passport'},
                    {text: `Driver's Licence`, value: 'driver_licence'},
                    {text: `National ID`, value: 'national_id'},
                ]"
                label="Means of Identification"
                outlined
                required
                :rules="[v=> !!v || 'Identification type name required']"
        ></v-select>
        <v-text-field
                v-model="validations.person_id_number"
                :error-messages="err.person_id_number"
                label="Identification Number"
                outlined
                required
                :rules="[v=> !!v || 'Identification number required']"
        ></v-text-field>
        <v-row>
            <v-col cols="12" class="text-left mt-n5 mb-5">
                <input style="display: none" ref="fin_statement" @change="uploadFile" type="file" placeholder="asdasd"/>
                <p class="subtitle-1">Financial Statement (6 months at least)</p>
                <v-btn @click="$refs.fin_statement.click()" :loading="uploading" depressed large class="secondary">
                    <v-icon left>mdi-plus</v-icon>
                    {{validations.statement_url ? 'Change Statement' : 'Upload Statement'}}
                    <template v-slot:loader>
                        <span>{{Math.floor(uploadProgress)}}%</span>
                    </template>
                </v-btn>
            </v-col>
        </v-row>
        <slot :valid="validator"></slot>
    </v-col>
</template>
<script>
    export default {
        name: 'ApplicationValidation',
        props:{
           validations: {
               type: Object
           }
        },
        computed:{
            validator(){
                let {bvn, person_id_type, person_id_number, statement_url} = this.validations
                return !!bvn && !!person_id_number && !!person_id_type && !!statement_url
            },
        },
        data(){
            return {
                uploading: false,
                uploadProgress: 0,
                err: {}
            }
        },
        methods: {
            uploadFile(){
                let file = this.$refs.fin_statement.files[0]
                if(file){
                    this.uploading = true
                    let auth = this.$store.getters['user/getAuth']
                    let uploadTask = this.$firebase.storage().ref(`${auth.id}/statement_${Date.now()}`).put(file)
                    uploadTask.on('state_changed', snapshot=>{
                        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, err=>{
                        console.log({err})
                    }, ()=>{
                        uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                            this.$emit('cac_change')
                            this.validations.statement_url = url
                        }).finally(_=>{
                            this.uploading = false
                        })
                    })
                }
            }
        }
    }
</script>