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

            },
            light:{
                primary: "#191769",
                secondary: "#FE4C00",
                accent: "#0066ff",

            }
        }
    }
});
