<template>
    <div id="homeRecommend">
        <div class="homeRecommend-header">
            <p class="homeRecommend-header-title">
                重磅推荐
                <i>推</i>
            </p>
        </div>
        <div class="loading" v-show="recommendBookData===''"></div>
        <div v-if="recommendBookData!==''">
            <ul class="imgBookList">
                <li @click="bookClick(recommendBookData[0]._id)">
                    <div class="imgBook-img">
                        <img :src="recommendBookData[0].cover" alt="">
                    </div>
                    <div class="imgBook-info">
                        <p class="title">{{recommendBookData[0].title}}</p>
                        <p class="author">{{recommendBookData[0].author}}</p>
                        <p class="summary">{{recommendBookData[0].shortIntro}}</p>
                        <p class="book-hot">
                            <span class="latelyFollower">{{recommendBookData[0].latelyFollower}}</span>
                            人气
                            <span class="split">|</span>
                            <span class="retentionRatio">{{recommendBookData[0].retentionRatio}}</span>
                        </p>
                    </div>
                </li>
            </ul>
            <ul class="noimgBookList">
                <li v-for="(item,index) in recommendBookData" v-if="index>=1&&index<5" @click="bookClick(recommendBookData[index]._id)">
                    <span class="order">{{index+1}}</span>
                    <div class="noimgBook-info">
                        <p class="title">
                            {{item.title}}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <div class="more" @click="more()">查看更多</div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            recommendBookData: ''
        }
    },
    mounted() {
        this._getCommendBook()
    },
    methods: {
        bookClick(id) {
            this.$router.push({ name: 'book', params: { book_id: id } })
        },
        _getCommendBook() {
            this.$http.get('/api/getCommendBook').then((data) => {
                var books = data.data
                for (var i = 0; i < books.length; i++) {
                    books[i].cover = 'http://statics.zhuishushenqi.com' + books[i].cover
                }
                this.recommendBookData = books
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.loading
    width 100%
    height 100px
    background url('../../assets/loading.gif') no-repeat
    background-position center
    background-size 30px

img
    width 100%
    height 100%
    border-radius 1px

#homeRecommend
    background #ffffff
    border-bottom 10px solid #f5f5f5
    position relative
    .homeRecommend-header
        padding 15px 13px 14px 13px
        border-bottom 1px solid #f0f0f0
        position relative
        .homeRecommend-header-title
            position relative
            font-size 13px
            line-height 13px
            color rgba(0,0,0,0.9)
            >i 
                position absolute
                margin -1px 0 0 5px
                padding 3px 5px 0 5px
                font 9px/9px a
                color #fff
                background #53ac7d
                border-radius 1px
    .imgBookList
        padding 0 13px
        li
            position relative
            padding 17px 0
            border-bottom 1px solid #f0f0f0
            .imgBook-img
                position relative
                width 85px
                height 113px
                background-color #eeece9
                border 1px solid #f0f0f0
                border-radius 1px
                .imgBook-img-finish
                    position absolute
                    bottom 0px
                    width 100px
                    color #fff
                    padding 25px 7px 6px
                    font 10px/10px a
            .imgBook-info
                position absolute
                top 17px
                left 100px
                right 13px
                padding-top 6px
                background #fff
                .title
                    margin-bottom 4px
                    font 16px/17px a
                    color rgba(0,0,0,0.9)
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                .author
                    margin-top 8px
                    font 12px/12px a
                    color rgba(0,0,0,0.7)
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                .summary
                    margin 8px 0 0
                    height 2em
                    font 12px/l.4em a
                    color rgba(0,0,0,0.6)
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    overflow: hidden
                .book-hot
                    margin-top 10px
                    font-size: 14px
                    color #555
                    line-height 1.5em
    .noimgBookList
        padding 0 13px
        li
            padding 17px 0
            border-bottom 1px solid #f0f0f0
            .order
                float left
                margin-top 1px
                font 13px/13px a
                color rgba(237px,83px,15px,0.9)
            .noimgBook-info
                margin-left 27px
                .title
                    font 15px/15px a
                    color rgba(0,0,0,0.9)
    .more
        width 100%
        height 50px
        text-align center
        line-height 50px
</style>


