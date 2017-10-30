<template>
    <div class="imgBook">
        <ul class="imgBookList">
            <li v-for="(item,index) in bookData" @click="bookClick(bookData[index]._id)">
                <div class="imgBook-img">
                    <img v-lazy="bookData[index].cover" alt="">
                </div>
                <div class="imgBook-info">
                    <p class="title">{{bookData[index].title}}</p>
                    <p class="author">{{bookData[index].author}}</p>
                    <p class="summary">{{bookData[index].shortIntro}}</p>
                    <p class="book-hot">
                        <span class="latelyFollower">{{bookData[index].latelyFollower}}</span>
                        人气
                        <span class="split">|</span>
                        <span class="retentionRatio">{{bookData[index].retentionRatio}}</span>
                    </p> 
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['bookData'],
    methods:{
        bookClick(id) {
            this.$router.push({ name: 'book', params: { book_id: id } })
        }
    }
}
</script>

<style lang="stylus" scoped>
img
    width 100%
    height 100%
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
                    word-break break-all
                    text-overflow ellipsis
                    overflow hidden
                .book-hot
                    margin-top 10px
                    font-size: 14px
                    color #555
                    line-height 1.5em
</style>
