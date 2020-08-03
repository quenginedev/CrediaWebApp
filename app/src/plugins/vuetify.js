import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            dark: {
                primary: "#191769",
                secondary: "#FE4C00",
                accent: "#0066ff",
                bg: "#E5E5E5",

            },
            light:{
                primary: "#0066ff",
                secondary: "#FE4C00",
                accent: "#191769"
            }
        }
    }
});
