import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            dark: {
                primary: "#2D2275",
                secondary: "#FF154A",
                accent: "#0066ff",

            },
            light:{
                primary: "#2D2275",
                secondary: "#FF154A",
                accent: "#0066ff",
            }
        }
    }
});
