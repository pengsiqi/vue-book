<template>
    <div id="shelf">
        <router-link to="/search">
            <div class="home-top-search">输入书名/作者/关键字</div>
        </router-link>
        <div class="content" v-if="shelfBook.length!==0">
            <div v-for="item in shelfBook" class="book">
                <div class="img" @click="readBook(item.id)">
                    <img :src="item.cover" :alt="item.title">
                </div>
            </div>
        </div>
        <div class="addShelfBook" v-show="addFlag" @click="addShelfBook()">
            <span>添加书籍</span>
        </div>
        <div class="footer">
            <bottom-nav></bottom-nav>
        </div>
    </div>
</template>

<script>
import bottomNav from '@/components/common/bottomNav'

export default {
    data() {
        return {
            shelfBookId: [],
            shelfBook: [],
            addFlag: false
        }
    },
    mounted() {
        var getShelfBook = localStorage.getItem('ShelfBook')
        if (getShelfBook !== null) {
            this.shelfBookId = JSON.parse(getShelfBook)
        }
        if (this.shelfBookId.length === 0) {
            this.addFlag = true
        }
        this.handleShelf()
    },
    methods: {
        handleShelf() {
            for (var i = 0; i < this.shelfBookId.length; i++) {
                this._getBookInfo(this.shelfBookId[i])
            }
        },
        _getBookInfo(id) {
            this.$http.get('/api/getBookInfo/' + id).then((data) => {
                var bookInfo = data.data
                bookInfo.cover = 'http://statics.zhuishushenqi.com' + bookInfo.cover
                this.shelfBook.push({
                    id: bookInfo._id,
                    title: bookInfo.title,
                    cover: bookInfo.cover
                })
                // Indicator.close()
            })
        },
        readBook(id) {
            this.$router.push({ name: 'readBook', params: { book_id: id } })
        },
        addShelfBook(){
            this.$router.push('/category')
        }
    },
    components: {
        bottomNav
    }
}
</script>

<style lang="stylus" scoped>
#shelf
    position relative
    width 100%
    height 100%
    overflow hidden
    .home-top-search
        margin 10px 13px
        padding 1px 0 0 30px
        font 11px
        line-height 33px
        color rgba(0,0,0,0.4)
        background url(http://image.read.duokan.com/mfsv2/download/fdsc3/p01dSYLeWtSR/tY73MgTfVw7UAS.png) no-repeat 8px center
        background-size 14px
        border 1px solid #f5f5f5
        border-radius 2px
    .content
        position absolute
        top 60px
        bottom 50px
        width 100%
        box-sizing border-box
        padding 20px
        overflow auto
        background #fff
        display flex
        flex-flow row wrap
        justify-content flex-start
        align-content flex-start
        .book
            position: relative
            width: 95px
            height: 125px
            margin 3px 4px 20px
            background-color: #eeece9
            box-shadow: 6px 6px 5px -3px #aaa
            border: 1px solid #f0f0f0
            border-bottom: none
            overflow: hidden
            img
                width 95px
                height 125px
    .addShelfBook
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        margin auto
        width 100px
        height 40px
        background #26A2FF
        color #fff
        font-size 18px
        text-align center
        line-height 40px
        border-radius 10px

.footer
  position absolute
  bottom 0px
  width 100%
  height 50px
</style>