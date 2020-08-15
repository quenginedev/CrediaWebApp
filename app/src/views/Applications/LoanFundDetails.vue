<template>
    <v-col>
        <v-text-field
                v-model.number="fund_details.amount"
                type="number"
                min="1"
                autofocus
                prefix="₦"
                label="How much do you want to collect?"
                outlined
                required
                :rules="[v=> !!v || 'Amount required']"
        >

        </v-text-field>
        <v-text-field
                v-model.number="fund_details.spread"
                min="1"
                type="number"
                label="How long do you want to spread the loan?"
                hint="Months"
                outlined
                required
                :rules="[v=> !!v || 'Months required']"
        ></v-text-field>
        <v-menu
            v-model="picker"
            :close-on-click="false"
            :close-on-content-click="false"
        >
            <template v-slot:activator="{on, attrs}">
                <v-text-field
                    v-model="fund_details.dispense_date"
                    label="When do you need the loan?"
                    outlined
                    readonly
                    v-on="on"
                    v-bind="attrs"
                    required
                    :rules="[v=> !!v || 'Date Required']"
                ></v-text-field>
            </template>
            <v-date-picker
                    @change="counter++"
                    type="month"
                    color="secondary"
                    v-model="fund_details.dispense_date"
            >
                <v-btn block color="secondary" @click="picker = false">continue</v-btn>
            </v-date-picker>
        </v-menu>
        <v-textarea
                rows="1"
                auto-grow
                v-model="fund_details.reason"
                label="Reasons for the loan"
                outlined
                required
                :rules="[v=> !!v || 'Reason Required']"
        ></v-textarea>
        <slot v-bind:complete="complete"></slot>
    </v-col>
</template>
<script>
    export default {
        name: 'FinanceInfo',
        props: {
            fund_details: {
                type: Object
            }
        },
        data(){
          return {
              counter: 0,
              picker: false
          }
        },
        computed:{
            complete(){
                this.counter++
                let {amount, dispense_date, spread, reason} = this.fund_details
                return !!amount && !!dispense_date && !!spread && !!reason
            }
        }
    }
</script>
