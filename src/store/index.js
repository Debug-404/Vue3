import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            user: localStorage.getItem("user")
        }
    },
    mutations: {
        setUser(state, user) {
            localStorage.setItem("user", user)
        },
        removeUser() {
            localStorage.clear()
        }

    }
})
export default store