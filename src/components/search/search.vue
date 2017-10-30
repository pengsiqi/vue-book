<template>
    <div id="search">
        <div class="search-top">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            <input class="input" type="text" v-model="searchContent" placeholder="输入书名或者作者名">
            <i class="iconfont icon-63" @click="getSearchBook()"></i>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="footer">
            <bottom-nav></bottom-nav>
        </div>
    </div>
</template>

<script>
import store from "@/store/store"
import { mapState, mapMutations } from 'vuex'

import bottomNav from '@/components/common/bottomNav'

export default {
    data() {
        return {
            searchContent: ''
        }
    },
    computed: {
        ...mapState({
            test: state => state.test,
            searchConfim: state => state.searchConfim,
            bookListFlag: state => state.bookListFlag
        })
    },
    watch: {
        searchContent(newValue) {
            if (newValue !== '' && this.bookListFlag === true) {
                this.$router.push('/search/searchResult')
            } else if (newValue === '') {
                this.$router.push('/search/')
            }
            this.$store.commit('searchWord', this.searchContent)
            this.$store.commit('setBookListFlag',true)
        },
        searchConfim(newValue){
            this.searchContent = newValue
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        getSearchBook(){
            if(this.searchContent === ''){
                return
            }
            this.$router.push('/search/searchBookList')
        }
    },
    components: {
        bottomNav
    },
    store
}
</script>

<style lang="stylus" scoped>
.footer
  position absolute
  bottom 0px
  width 100%
  height 50px

#search
    position relative
    width 100%
    height 100%
    overflow hidden
    .search-top
        position absolute
        top 0px
        z-index 10
        box-sizing border-box
        width 100%
        height 50px
        padding 0 50px
        background #fff
        border-bottom 1px solid #ddd
        box-shadow 0px 3px 5px -3px #aaa
        .icon-fanhui
            position absolute
            top 0
            left 0
            width 50px
            height 50px
            text-align center
            line-height 50px
            font-size 24px
        .input
            box-sizing border-box
            margin 10px 0
            height 60%
            width 100%
            background #cdcdcd
            outline none
            border-radius 4px
            padding-left 10px
        .icon-63
            position absolute
            top 0
            right 0
            width 50px
            height 50px
            text-align center
            line-height 50px
            font-size 18px
    .content
        position absolute
        top 50px
        bottom 50px
        width 100%
        overflow auto
        background #fff
</style>
