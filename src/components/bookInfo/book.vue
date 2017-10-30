<template>
    <div id="book">
        <book-header></book-header>
        <div class="container-scroll" v-if="this.bookInfo!==''">
            <section class="main-card">
                <div class="book-cover">
                    <img :src="bookInfo.cover" alt="">
                </div>
                <div class="info">
                    <h1 class="title">{{bookInfo.title}}</h1>
                    <p class="author">
                        <span>{{bookInfo.author}}</span>
                    </p>
                    <p class="book-info">
                        <!-- <span class="cat">{{bookInfo.cat}}</span> -->
                        <span class="chaptersCount">{{bookInfo.chaptersCount}} 章节</span>
                        <span class="wordCount">{{bookInfo.wordCount}} 字</span>
                    </p>
                    <p class="rating">
                        <span class="rating-count">{{bookInfo.rating.count}} 人评分</span>
                        <span class="rating-score">{{bookInfo.rating.score}}</span>
                    </p>
                    <div class="tags">
                        <span v-for="item in bookInfo.tags">{{item}}</span>
                        <!-- <span class="read">{{bookInfo.rating.count}} 个评价</span> -->
                    </div>
                </div>
            </section>
            <section class="keep">
                <div class="follower">
                    <span class="keep-type">追人气</span>
                    <span class="keep-value">{{bookInfo.latelyFollower}}</span>
                </div>
                <div class="save">
                    <span class="keep-type">读者留存率</span>
                    <span class="keep-value">{{bookInfo.retentionRatio}}%</span>
                </div>
                <div class="update">
                    <span class="keep-type">日更字数</span>
                    <span class="keep-value">{{bookInfo.serializeWordCount}}</span>
                </div>
            </section>
            <section class="intro" @click="arrow()">
                <p :class="{ellipsis:ellipsisFlag}">{{bookInfo.longIntro}}
                </p>
                <!-- <span class="arrow" v-show="ellipsisFlag"></span> -->
                <i class="iconfont icon-down-trangle-copy"  v-show="ellipsisFlag"></i>
            </section>
            <section class="read">
                <div @click="addShelf()">加入书架</div>
                <div class="reading" @click="readBookClick()">开始阅读</div>
            </section>
        </div>
    </div>
</template>

<script>
import bookHeader from './bookHeader'
import { Indicator } from 'mint-ui'

export default {
    data() {
        return {
            bookId: '',
            bookInfo: '',
            bookChapter: '',
            ellipsisFlag: true
        }
    },
    mounted() {
        if (this.bookInfo.length === 0) {
            Indicator.open({
                spinnerType: 'fading-circle'
            })
        }
        this._getBookId()
        this._getBookInfo(this.bookId)
    },
    components: {
        bookHeader
    },
    methods: {
        _getBookId() {
            this.bookId = this.$route.params.book_id
        },
        _getBookInfo() {
            this.$http.get('/api/getBookInfo/' + this.bookId).then((data) => {
                var bookInfo = data.data
                bookInfo.cover = 'http://statics.zhuishushenqi.com' + bookInfo.cover
                this.bookInfo = bookInfo
                Indicator.close()
            })
        },
        readBookClick() {
            this.$router.push({ name: 'readBook', params: { book_id: this.bookId } })
        },
        arrow() {
            this.ellipsisFlag = !this.ellipsisFlag
        },
        addShelf() {
            var saveShelfBook = localStorage.getItem('ShelfBook')
            var value = JSON.parse(saveShelfBook)
            if (saveShelfBook === null) {
                value = []
                value.push(this.bookId)
                localStorage.setItem('ShelfBook', JSON.stringify(value))
            } else {
                var flag = true
                for (var i = 0; i < value.length; i++) {
                    if (value[i] === this.bookId) {
                        flag = false
                        break
                    }
                }
                if (flag === true) {
                    value.push(this.bookId)
                    localStorage.setItem('ShelfBook', JSON.stringify(value))
                }
            }
            this.$router.push('/shelf')
        }
    }
}
</script>
<style lang="stylus" scoped>

.ellipsis
    height 60px
    display -webkit-box
    -webkit-box-orient vertical
    -webkit-line-clamp 3
    overflow hidden

#book
    position relative
    width 100%
    min-width 300px
    height 100%
    overflow hidden
    .container-scroll
        position absolute
        top 44px
        bottom 0px
        width 100%
        overflow auto
        .main-card
            width 100%
            box-sizing border-box
            overflow hidden
            padding 30px 20px
            position relative
            border-bottom 1px solid #ebebeb
            .book-cover
                position: relative
                width: 95px
                height: 125px
                background-color: #eeece9
                box-shadow: 0px 6px 5px -3px #aaa
                border: 1px solid #f0f0f0
                border-bottom: none
                overflow: hidden
                img
                    width 100%
                    height 100%
            .info
                position absolute
                top 30px
                left 135px
                right 20px
                height: 125px
                .title
                    height 30px
                    line-height 30px
                    font-weight: 400
                    font-size: 16px
                    white-space: nowrap
                    text-overflow: ellipsis
                    overflow: hidden
                .author
                    height 25px
                    line-height 25px
                    font-size 13px
                    color #b93321
                .book-info
                    height 20px
                    line-height 20px
                    font-size 12px
                    color #999
                    span
                        margin-right 10px
                .rating
                    height 20px
                    line-height 30px
                    font-size 12px
                    color #999
                    .rating-score
                        margin-left 20px
                        color red
                        font-size 14px
                .tags
                    height 20px
                    margin-top 10px
                    span
                        display inline-block
                        margin-right 10px
                        padding 3px 6px 2px
                        font-size 10px
                        color #53ac7d
                        border-radius 3px
                        border 1px solid #53ac7d
        .keep
            width 100%
            height 85px
            display flex
            border-bottom 1px solid #ebebeb
            div
                width 33%
                flex 1 1 auto
                text-align center
                span
                    display block
                .keep-type
                    margin-top 20px
                    font-size 13px
                    color #999
                .keep-value
                    margin-top 15px
                    font-size 16px
        .intro
            position relative
            width 100%
            box-sizing border-box
            padding 20px
            font-size 13px
            line-height 20px
            color #222
            font-weight 400
            border-bottom 1px solid #ebebeb
            .icon-down-trangle-copy
                position absolute
                bottom 20px
                right 10px
                width 20px
                height 20px
        .read
            display flex
            justify-content space-around
            width 100%
            padding-top 20px
            div
                width 40%
                height 50px
                text-align center
                line-height 50px
                color #b93321
                font-size 16px
                border 1px solid #b93321
            .reading
                color #fff
                background-color #b93321
</style>
