import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            user:""
        }

    },
    mutations: {
        userInfo(state,user){
            state.user=user
        }
    }
})
export default store