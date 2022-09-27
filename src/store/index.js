import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            user: localStorage.getItem("user"),
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem("user", user);
        },
        removeUser(state) {
            state.user = "";
            localStorage.clear();
        }
    }
})
export default store