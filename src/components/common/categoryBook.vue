<template>
    <div id="categoryBook">
        <div class="categoryBook-header">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            <div class="title">{{detailCategory.major}}</div>
        </div>
        <div class="content">
            <div class="nav">
                <div class="nav1">
                    <span :class="{nav1Class:nav1Class === index}" v-for="(item,index) in CategoryDetail2" @click="detailNav1(item,index)">{{item}}</span>
                </div>
                <div class="nav2">
                    <span :class="{nav2Class:nav2Class === index}" v-for="(item,index) in CategoryDetail3" @click="detailNav2(index)">{{item}}</span>
                </div>
            </div>
            <mt-loadmore class="loadmore" :bottomDistance="100" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
                <div class="categoryBookList">
                    <imgBook :bookData='bookInfo'></imgBook>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
import imgBook from '@/components/common/imgBook'
import { Indicator } from 'mint-ui'

export default {
    data() {
        return {
            nav1Class: 0,
            nav2Class: 0,
            detailCategory: {
                gender: '',
                type: 'hot',
                major: '',
                minor: '',
                start: 0,
                limit: 5
            },
            CategoryDetail1: ['hot', 'new', 'reputation', 'over', 'monthly'],
            CategoryDetail2: [],
            CategoryDetail3: ['热门', '新书', '好评', '完结', '包月'],
            bookInfo: []
        }
    },
    mounted() {
        if (this.bookInfo.length === 0) {
            Indicator.open({
                spinnerType: 'fading-circle'
            })
        }
        this.detailCategory.gender = this.$route.query.gender
        this.detailCategory.major = this.$route.query.major
        this._getCategoryDetail()
        this._getCategoryBookInfo(true)
    },
    methods: {
        _getCategoryBookInfo(isTab) {
            this.$http.get('/api/getCategoryBookInfo', {
                params: this.detailCategory
            }).then((data) => {
                var books = data.data.books
                for (var i = 0; i < books.length; i++) {
                    books[i].cover = 'http://statics.zhuishushenqi.com' + books[i].cover
                }
                if(!isTab){
                    this.bookInfo = this.bookInfo.concat(books)
                }else{
                    this.bookInfo = books
                }

                Indicator.close()
                this.$refs.loadmore.onTopLoaded()
                this.$refs.loadmore.onBottomLoaded()
            })
        },
        loadTop() {
            this.bookInfo = []
            this.detailCategory.start = 0
            this.detailCategory.limit = 5
            this._getCategoryBookInfo(false)
        },
        loadBottom() {
            this.detailCategory.start += 5
            this.detailCategory.limit += 5
            this._getCategoryBookInfo(false)
        },
        _getCategoryDetail() {
            this.$http.get('/api/getCategoryDetail').then((data) => {
                var data = data.data[this.detailCategory.gender]
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === this.detailCategory.major) {
                        this.CategoryDetail2 = data[i].mins
                        break
                    }
                }
                this.CategoryDetail2.unshift('全部')
            })
        },
        detailNav1(minor, index) {
            if (minor === '全部') {
                this.detailCategory.minor = ''
            } else {
                this.detailCategory.minor = minor
            }
            Indicator.open({
                spinnerType: 'fading-circle'
            })
            this.detailCategory.start = 0
            this.detailCategory.limit = 5
            this._getCategoryBookInfo(true)
            this.nav1Class = index
        },
        detailNav2(type) {
            Indicator.open({
                spinnerType: 'fading-circle'
            })
            this.detailCategory.type = this.CategoryDetail1[type]
            this.detailCategory.start = 0
            this.detailCategory.limit = 5
            this._getCategoryBookInfo(true)
            this.nav2Class = type
        },
        back() {
            this.$router.go(-1)
        }
    },
    components: {
        imgBook
    }
}
</script>

<style lang="stylus" scoped>
.nav1Class
.nav2Class
    color red

#categoryBook
    position relative
    width 100%
    height 100%
    overflow hidden
    .categoryBook-header
        position absolute
        top 0
        z-index 10
        box-sizing border-box
        width 100%
        height 50px
        padding 0 50px
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
        .title
            font-size 16px
            line-height 50px
            color rgba(0,0,0,0.9)
    .content
        width 100%
        position absolute
        top 50px
        bottom 0px
        overflow auto
        .nav
            width 100%
            background #fff
            font-size 13px
            color #666
            line-height 30px
            .nav1
                width 100%
                border-bottom 1px solid #ddd
                span 
                    display inline-block
                    box-sizing border-box
                    padding 10px
            .nav2
                width 100%
                border-bottom 1px solid #ddd
                span 
                    display inline-block
                    box-sizing border-box
                    padding 10px
        // .categoryBookList
        //     position absolute
        //     top 100px
</style>
