import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        current_score: 0,
        best_score: 0,
        borderWidth: 15,
        width: 650,
        height: 650,
        columns: 32,
        rows: 32,
        grid_visible: false,
        game_status: 'None',
        snake: {
            orientation: 'right',
            location: []
        }

    },
    getters: {
        board: state => {
            let width = state.width - (2 * state.borderWidth);
            let height = state.height - (2 * state.borderWidth);
            return {
                width: width,
                height: height
            };
        },
        square: (state, getters) => {
            let width = getters.board.width / state.columns;
            let height = getters.board.height / state.rows;
            return {
                width: width,
                height: height
            };
        },
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

        startNewGame({ commit, state }) {
            let columns = state.columns / 2 + 1;
            let row = state.rows / 2;

            let snake_location = [
                [columns, row],
                [columns - 1, row],
                [columns - 2, row],
                [columns - 3, row]
            ];
            commit('SET_GAME_STATUS', 'running');
            commit('SET_SNAKE_LOCATION', snake_location);
        }
    },
    mutations: {
        SET_CURRENT_SCORE(state, current_score) {
            Vue.set(state, 'current_score', current_score);
        },
        SET_GRID_VISIBLE(state, grid_visible) {
            Vue.set(state, 'grid_visible', grid_visible);
        },
        SET_SNAKE_LOCATION(state, snake_location) {
            Vue.set(state.snake, 'location', snake_location);
        },
        SET_GAME_STATUS(state, game_status) {
            Vue.set(state, 'game_status', game_status);
        },
    },
});