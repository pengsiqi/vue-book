<template>
    <div id="searchResult">
        <div class="search-result">
            <ul>
                <li v-for="item in searchContentList" @click="getSearchBook(item)">{{item}}</li>
                <li v-if="searchContentList.length===0">无搜索结果</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from "@/store/store"

export default {
    data() {
        return {
            searchContentList: []
        }
    },
    computed: {
        ...mapState({
            searchWord: state => state.searchWord
        })
    },
    mounted() {
        this._getSearchData(this.searchWord)
    },
    watch: {
        searchWord(newValue) {
            this._getSearchData(newValue)
        }
    },
    methods: {
        ...mapMutations(['getSearchWord', 'setBookListFlag']),
        _getSearchData(word) {
            this.$http.get('/api/getSearchData', {
                params: {
                    query: word
                }
            }).then((data) => {
                this.searchContentList = data.data.keywords
            })
        },
        getSearchBook(value) {
            this.getSearchWord(value)
            this.setBookListFlag(false)
            this.$router.push('/search/searchBookList')
        },
        searchBookList(value) {

        }
    }
}
</script>

<style lang="stylus" scoped>
#searchResult
    width 100%
    height 100%
    overflow auto
    .search-result
        width 100%
        background #fff
        ul
            padding 0 15px
            li
                padding 10px 0
                color rgba(0,0,0,0.6)
                border-bottom 1px solid #f0f0f0
</style>
