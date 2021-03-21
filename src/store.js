import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        current_score: 0,
        best_score: 0
    },
    getters: {
        current_score: state => {
            return ("00" + state.current_score).slice(-3);
        },
        best_score: state => {
            return ("00" + state.best_score).slice(-3);
        }
    },

    actions: {

    },
    mutations: {
        SET_CURRENT_SCORE(state, current_score) {
            Vue.set(state, 'current_score', current_score);
        },
    },
});