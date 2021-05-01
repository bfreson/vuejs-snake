import Vue from 'vue';
import Vuex from 'vuex';
import mapSort from 'mapsort';

Vue.use(Vuex);

function isValidOrientation(lastOrientation, newOrientation) {
    switch (lastOrientation) {
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

function isSnakeIsAtLocation(snakeLocations, location) {
    return snakeLocations.filter(loc => loc[0] == location[0] && loc[1] == location[1]).length > 0;
}

function isValidLocation(columns, rows, snakeLocations, location) {
    if (location[0] <= 0 || location[0] > columns ||
        location[1] <= 0 || location[1] > rows)
        return false;

    if (snakeLocations.length === 0) return true;

    return !isSnakeIsAtLocation(snakeLocations, location);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getNewRandomEggLocation(columns, rows, snakeLocations) {
    if (snakeLocations.length >= (columns * rows) - 2)
        return null;

    let column = 0;
    let row = 0;

    let ok;
    do {
        column = randomIntFromInterval(1, columns);
        row = randomIntFromInterval(1, rows);

        ok = !isSnakeIsAtLocation(snakeLocations, [column, row]);
    } while (!ok);

    return [column, row];
}

function saveScoreToLocalStorage(scores) {
    window.localStorage.setItem('scores', scores);
}

function getScoresFromLocalStorage() {
    let scores = JSON.parse(window.localStorage.getItem('scores'));
    if (scores === null) return null;

    let sortedScores = mapSort(
        scores,
        element => {
            return element;
        },
        (a, b) => {
            if (a.score > b.score)
                return -1;
            if (b.score > a.score)
                return 1;

            if (a.time < b.score)
                return -1;
            if (b.score < a.score)
                return 1;

            if (a.date < b.date)
                return -1;
            if (b.date < a.date)
                return 1;

            return 0;
        }
    );
    return sortedScores;
}

export default new Vuex.Store({
    state: {
        current_score: 0,
        scores: [],
        best_score: 0,
        borderWidth: 15,
        width: 650,
        height: 650,
        columns: 30,
        rows: 30,
        grid_visible: false,
        game_status: 'None',
        game_speed: 1,
        elapsed_time: 0,
        snake: {
            orientation: 'Right',
            lastOrientation: 'Right',
            location: [],
            growing: false
        },
        egg: {
            location: null
        },
        scores: null
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
        elapsed_time: state => {
            return new Date(state.elapsed_time * 1000).toISOString().substr(14, 5);
        }
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

            commit('SET_CURRENT_SCORE', 0);
            commit('RESET_SNAKE_ORIENTATION');
            commit('SET_SNAKE_LOCATION', snake_location);
            commit('SET_EGG_LOCATION', getNewRandomEggLocation(state.columns, state.rows, state.snake.location));
            commit('SET_GAME_STATUS', 'Running');
            commit('RESET_GAME_SPEED');
            commit('RESET_ELAPSED_TIME');

        },
        pause({ commit, state }) {
            if (state.game_status !== "Running") return;
            commit('SET_GAME_STATUS', 'Pause');
        },
        continue ({ commit, state }) {
            if (state.game_status !== "Pause") return;

            commit('SET_GAME_STATUS', 'Running');
        },
        moveSnake({ commit, state, dispatch }) {
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

            if (state.snake.growing)
                commit('SET_SNAKE_GROWING', false);
            else
                snake_location.pop();

            commit('SET_SNAKE_LOCATION', snake_location);
            commit('SET_SNAKE_LAST_ORIENTATION', state.snake.orientation);

            if (state.egg.location != null && nextHeadLocation[0] == state.egg.location[0] && nextHeadLocation[1] == state.egg.location[1]) {
                dispatch('snakeGrows');
            }
        },
        snakeGrows({ commit, state }) {
            commit('SET_SNAKE_GROWING', true);
            commit('SET_CURRENT_SCORE', state.current_score + 1);
            commit('SET_EGG_LOCATION', getNewRandomEggLocation(state.columns, state.rows, state.snake.location));
            if (state.game_speed < 20 && (state.current_score % 10) === 0) {
                commit('SET_GAME_SPEED', state.game_speed + 1);
            }
        },
        getScores({ commit }) {
            let scores = getScoresFromLocalStorage();
            commit('SET_SCORES', scores);
            if (scores != null)
                commit('SET_BEST_SCORE', scores[0].score);
        },

        saveScore({ state, dispatch }, nickname) {
            let score = {
                nickname: nickname,
                score: state.current_score,
                time: state.elapsed_time,
                date: new Date()
            };
            let scores = [];
            if (state.scores != null)
                scores = [...state.scores];
            scores.push(score);

            let data = JSON.stringify(scores);
            saveScoreToLocalStorage(data);
            dispatch('getScores');
        }
    },
    mutations: {
        SET_SCORES(state, scores) {
            Vue.set(state, 'scores', scores);
        },
        SET_BEST_SCORE(state, best_score) {
            Vue.set(state, 'best_score', best_score);
        },
        SET_CURRENT_SCORE(state, current_score) {
            Vue.set(state, 'current_score', current_score);
        },
        SET_GRID_VISIBLE(state, grid_visible) {
            Vue.set(state, 'grid_visible', grid_visible);
        },
        RESET_SNAKE_ORIENTATION(state) {
            Vue.set(state.snake, 'orientation', "Right");
        },
        SET_SNAKE_ORIENTATION(state, snake_orientation) {
            if (!isValidOrientation(state.snake.lastOrientation, snake_orientation)) return;

            Vue.set(state.snake, 'orientation', snake_orientation);
        },
        SET_SNAKE_LAST_ORIENTATION(state, snake_lastOrientation) {
            Vue.set(state.snake, 'lastOrientation', snake_lastOrientation);
        },
        SET_SNAKE_LOCATION(state, snake_location) {
            Vue.set(state.snake, 'location', snake_location);
        },
        SET_SNAKE_GROWING(state, snake_growing) {
            Vue.set(state.snake, 'growing', snake_growing);
        },
        SET_EGG_LOCATION(state, egg_location) {
            Vue.set(state.egg, 'location', egg_location);
        },
        SET_GAME_STATUS(state, game_status) {
            Vue.set(state, 'game_status', game_status);
        },
        SET_GAME_SPEED(state, game_speed) {
            Vue.set(state, 'game_speed', game_speed);
        },
        RESET_GAME_SPEED(state) {
            Vue.set(state, 'game_speed', 1);
        },
        RESET_ELAPSED_TIME(state) {
            Vue.set(state, 'elapsed_time', 0);
        },
        SET_ELAPSED_TIME(state, elapsed_time) {
            Vue.set(state, 'elapsed_time', elapsed_time);
        },
        SET_WIDTH(state, width) {
            Vue.set(state, 'width', width);
        },
        SET_HEIGHT(state, height) {
            Vue.set(state, 'height', height);
        },
    },
});