import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { VueHammer } from 'vue2-hammer'

Vue.use(BootstrapVue);
Vue.use(VueHammer)

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');