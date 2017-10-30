<template>
    <div id="searchBookList">
        <div class="search-book-list">
            <img-book :bookData='searchBookList' v-if="searchBookList.length!==0"></img-book>
        </div>
    </div>
</template>

<script>
import imgBook from '@/components/common/imgBook'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            searchBookList: []
        }
    },
    computed: {
        ...mapState({
            searchWord: state => state.searchWord
        })
    },
    mounted() {
        this._getSearchBookList(this.searchWord)
        this._isAddHistory()
    },
    methods: {
        _getSearchBookList(value) {
            this.flag = true
            this.$http.get('/api/getSearchBookList', {
                params: {
                    query: value
                }
            }).then((data) => {
                var books = data.data.books
                for (var i = 0; i < books.length; i++) {
                    books[i].cover = 'http://statics.zhuishushenqi.com' + books[i].cover
                }
                this.searchBookList = books
            })
        },
        _isAddHistory() {
            var searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
            var flag = true
            for (var i = 0; i < searchHistory.length; i++) {
                if (searchHistory[i] === this.searchWord) {
                    flag = false
                    break
                }
            }
            if (flag === true) {
                searchHistory.push(this.searchWord)
                if(searchHistory.length >7){
                    searchHistory.shift()
                }
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
            }
        }
    },
    components: {
        imgBook
    }
}
</script>

<style lang="stylus" scoped>
#searchBookList
    width 100%
    height 100%
    overflow auto
    .search-book-list
        width 100%
        background #fff
        ul
            padding 0 15px
            li
                padding 10px 0
                color rgba(0,0,0,0.6)
                border-bottom 1px solid #f0f0f0
</style>
