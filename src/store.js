import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function isValidOrientation(currentOrientation, newOrientation) {
    switch (currentOrientation) {
        case "Top":
            return newOrientation !== "Bottom";
        case "Bottom":
            return newOrientation !== "Top";
        case "Left":
            return newOrientation !== "Right";
        case "Right":
            return newOrientation !== "Left";
        default:
            return false;
    }
}

function isValidLocation(columns, rows, snakeLocations, location) {
    if (location[0] <= 0 || location[0] > columns ||
        location[1] <= 0 || location[1] > rows)
        return false;

    if (snakeLocations.length === 0) return true;

    return !snakeLocations.includes(loc => loc[0] === location[0] && loc[1] === location[1]);



}

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
            orientation: 'Right',
            location: [],
            growing: false
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
            commit('SET_GAME_STATUS', 'Running');
            commit('SET_SNAKE_LOCATION', snake_location);
        },
        moveSnake({ commit, state }) {
            if (state.snake.location.length === 0) return;

            var nextHeadLocation = {...state.snake.location[0] };
            switch (state.snake.orientation) {
                case "Top":
                    nextHeadLocation[1] = nextHeadLocation[1] - 1;
                    break;
                case "Bottom":
                    nextHeadLocation[1] = nextHeadLocation[1] + 1;
                    break;
                case "Right":
                    nextHeadLocation[0] = nextHeadLocation[0] + 1;
                    break;
                case "Left":
                    nextHeadLocation[0] = nextHeadLocation[0] - 1;
                    break;
            }
            if (!isValidLocation(state.columns, state.rows, state.snake.location, nextHeadLocation)) {
                commit('SET_GAME_STATUS', 'GameOver');
                return;
            }

            let snake_location = state.snake.location;
            snake_location.unshift(nextHeadLocation);

            if (state.snake.growing) {
                commit('SET_SNAKE_GROWING', false);
            } else {
                snake_location.pop();
            }

            commit('SET_SNAKE_LOCATION', snake_location);

        },
        snakeGrows({ commit, state }) {
            commit('SET_SNAKE_GROWING', true);
            commit('SET_CURRENT_SCORE', state.current_score + 1);
        }
    },
    mutations: {
        SET_CURRENT_SCORE(state, current_score) {
            Vue.set(state, 'current_score', current_score);
        },
        SET_GRID_VISIBLE(state, grid_visible) {
            Vue.set(state, 'grid_visible', grid_visible);
        },
        SET_SNAKE_ORIENTATION(state, snake_orientation) {
            if (!isValidOrientation(state.snake.orientation, snake_orientation)) return;

            Vue.set(state.snake, 'orientation', snake_orientation);
        },
        SET_SNAKE_LOCATION(state, snake_location) {
            Vue.set(state.snake, 'location', snake_location);
        },
        SET_SNAKE_GROWING(state, snake_growing) {
            Vue.set(state.snake, 'growing', snake_growing);
        },
        SET_GAME_STATUS(state, game_status) {
            Vue.set(state, 'game_status', game_status);
        },

    },
});