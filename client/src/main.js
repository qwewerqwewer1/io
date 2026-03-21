// src/main.js
import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"; // Vuetify 2 стили

Vue.use(Vuetify);

const vuetify = new Vuetify({});

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
