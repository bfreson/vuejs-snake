import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        current_score: 0,
        best_score: 0,
        board: {
            width: 650,
            height: 650,
            columns: 16,
            rows: 16,
            grid_visible: true
        },

    },
    getters: {
        current_score: state => {
            return ("00" + state.current_score).slice(-3);
        },
        best_score: state => {
            return ("00" + state.best_score).slice(-3);
        },
        grid_visible: state => {
            return state.grid_visible;
        },
    },

    actions: {

    },
    mutations: {
        SET_CURRENT_SCORE(state, current_score) {
            Vue.set(state, 'current_score', current_score);
        },
        SET_GRID_VISIBLE(state, grid_visible) {
            Vue.set(state, 'board.grid_visible', grid_visible);
        },
    },
});