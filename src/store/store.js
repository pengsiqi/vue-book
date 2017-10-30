import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    test: 1,
    searchWord: '',
    searchConfim:'',
    bookListFlag : true
}

const mutations = {
    searchWord(state, value) {
        state.searchWord = value
    },
    getSearchWord(state, value) {
        state.searchConfim = value
    },
    setBookListFlag(state,value){
        state.bookListFlag = value
    }
}

export default new Vuex.Store({
    state,
    mutations
})