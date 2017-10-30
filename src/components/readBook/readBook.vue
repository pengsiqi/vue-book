<template>
    <div id="readBook">

        <div class="click-section">

            <!-- <div class="click" @click="setClick()"></div> -->

            <div class="top-nav" v-show="setFlag">
                <i class="iconfont icon-fanhui" @click="readBookBack()"></i>
                <div class="book-name">{{chapterContent.title}}</div>
            </div>

            <div class="bottom-nav" v-show="setFlag">
                <div class="chapter-list" @click="setListFlag()">
                    <i class="iconfont icon-mulu"></i>
                    <span>目录</span>
                </div>
                <div class="sun-moon" v-show="sunFlag" @click="changeSun()">
                    <i class="iconfont icon-icon"></i>
                    <span>夜间</span>
                </div>
                <div class="sun-moon" v-show="!sunFlag" @click="changeSun()">
                    <i class="iconfont icon-rijian"></i>
                    <span>日间</span>
                </div>
                <div class="set" @click="setSizeFlag()">
                    <i class="iconfont icon-shezhi"></i>
                    <span>设置</span>
                </div>
            </div>

            <div class="bottom-set" v-show="sizeFlag">
                <div class="font-size">
                    <span class="setName">字体大小 :</span>
                    <span class="reduce-size" @click="reduceSize()">A-</span>
                    <span class="value">{{fontSize}}</span>
                    <span class="add-size" @click="addSize()">A+</span>
                </div>
                <div class="bg-color">
                    <div class="setName">背景颜色 :</div>
                    <div class="setColor" :class="{isSelected:item.isSelected}" v-for="(item,index) in bgColor" @click="setBorder(index)">
                        <div :style="{backgroundColor:item.color}"></div>
                    </div>
                </div>
            </div>

            <div class="list" v-show="listFlag">
                <div class="chapter-list">
                    <ul>
                        <li v-for="(item,index) in bookChapter" :class="{chapterListItem:chapter_id === index}" @click="clickChapterId(index)">{{item.title}}</li>
                    </ul>
                </div>
            </div>

        </div>

        <div class="book-content" ref="bookContent">
            <div class="fiction_container" @click="setClick()">
                <h4 class="title">{{chapterContent.title}}</h4>
                <div v-html="chapterContent.cpContent" class="content" ref="content"></div>
            </div>

            <div class="m-button-bar" v-if="chapterContent!==''">
                <ul class="u-tab">
                    <li class="prev_button" @click="prevChapter()">上一章</li>
                    <li class="next_button" @click="nextChapter()">下一章</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            book_id: '',
            book_source: '',
            book_source_id: '',
            bookChapter: '',
            chapter_id: 0,
            chapterContent: '',
            setFlag: false,
            listFlag: false,
            sizeFlag: false,
            sunFlag: true,
            fontSize: 16,
            bgColor: [
                {
                    color: "#F5F4F0",
                    isSelected: false
                },
                {
                    color: "#D4C1A1",
                    isSelected: false
                },
                {
                    color: "#393230",
                    isSelected: false
                },
                {
                    color: "#CBE7CE",
                    isSelected: false
                },
                {
                    color: "#001B28",
                    isSelected: false
                }
            ]
        }
    },
    mounted() {
        this.book_id = this.$route.params.book_id
        if (localStorage.getItem(this.book_id + '_chapter_id') !== null) {
            this.chapter_id = localStorage.getItem(this.book_id + '_chapter_id')
        }
        this._getBookSource()
    },
    methods: {
        _getBookSource() {
            this.$http.get('/api/getBookSource/' + this.book_id).then((data) => {
                this.book_source = data.data
                this.book_source_id = this.book_source[0]._id
                this._getChapter(this.book_source_id)
            })
        },
        _getChapter(book_source_id) {
            this.$http.get('/api/getChapter/' + book_source_id).then((data) => {
                this.bookChapter = data.data
                this.getChapterContent(this.chapter_id)
            })
        },
        getChapterContent(chapter_id) {
            var chapterContentLink = this.bookChapter[chapter_id].link
            this.$http.get('/api/getChapterContent', {
                params: {
                    link: chapterContentLink
                }
            }).then((data) => {
                var chapterContent = data.data.chapter
                chapterContent.cpContent = data.data.chapter.cpContent.replace(/\n/g, '<br/>')
                this.chapterContent = chapterContent
            })
        },
        nextChapter() {
            this.chapter_id++
            this.getChapterContent(this.chapter_id)
            localStorage.setItem(this.book_id + '_chapter_id', this.chapter_id)
        },
        prevChapter() {
            if (this.chapter_id <= 0) {
                return
            } else {
                this.chapter_id--
                this.getChapterContent(this.chapter_id)
                localStorage.setItem(this.book_id + '_chapter_id', this.chapter_id)
            }
        },
        changeSource() {

        },
        setClick() {
            if (this.listFlag === false) {
                this.setFlag = !this.setFlag
            }
            this.listFlag = false
            this.sizeFlag = false
        },
        setListFlag() {
            this.listFlag = true
        },
        setSizeFlag() {
            this.sizeFlag = !this.sizeFlag
        },
        clickChapterId(value) {
            this.chapter_id = value
            this.getChapterContent(value)
            localStorage.setItem(this.book_id + '_chapter_id', value)
        },
        readBookBack() {
            this.$router.go(-1)
        },
        reduceSize() {
            if (this.fontSize <= 10) {
                return
            }
            this.fontSize -= 1
            this.$refs.content.style.fontSize = this.fontSize + 'px'
        },
        addSize() {
            this.fontSize += 1
            this.$refs.content.style.fontSize = this.fontSize + 'px'
        },
        setBorder(index) {
            for (var i = 0; i < this.bgColor.length; i++) {
                this.bgColor[i].isSelected = false
            }
            this.bgColor[index].isSelected = true
            this.$refs.bookContent.style.backgroundColor = this.bgColor[index].color
        },
        changeSun() {
            this.sunFlag = !this.sunFlag
            if (!this.sunFlag) {
                this.$refs.bookContent.style.backgroundColor = '#393230'
            } else {
                this.$refs.bookContent.style.backgroundColor = '#e9dfc7'
            }
        }
    },
    watch: {
        chapterContent() {
            this.$refs.bookContent.scrollTop = 0
        }
    }
}
</script>

<style lang="stylus" scoped>
.chapterListItem
    color red !important

.isSelected
    border 2px solid red

#readBook
    position relative
    width 100%
    min-width 300px
    height 100%
    overflow hidden
    background #e9dfc7
    .book-content
        position absolute
        top 0
        bottom 0
        width 100%
        overflow auto
        .fiction_container
            padding 15px
            font-size 16px
            color #555
            line-height 31px
            .title
                font-size 20px
                color #736357
                border-bottom 1px solid #736357
                letter-spacing 2px
            .content
                text-indent 3em
                margin 0.5em 0
                letter-spacing 0px
                line-height 24px
                text-align left 
        .m-button-bar
            width 70%
            max-width 800px
            padding 5px
            margin 0 auto 
            .u-tab
                height 34px
                margin 10px auto
                line-height 34px
                border 1px solid #858382
                font-size 12px
                background #000
                opacity 0.9
                li
                    display inline-block
                    width 49%
                    text-align center
                    color #fff
                li:nth-child(1)
                    border-right 1px solid #858382
    .click-section
        position relative
        width 100%
        height 100%
        overflow hidden
        .top-nav
            position absolute
            top 0
            z-index 10
            width 100%
            height 50px
            box-sizing border-box
            background-color rgba(0,0,0,1)
            padding-left 50px
            .icon-fanhui
                position absolute
                top 0
                left 0
                width 50px
                height 50px
                text-align center
                line-height 50px
                font-size 24px
                color #fff
            .book-name
                width 70%
                height 100%
                margin 0 auto
                line-height 50px
                font-size 14px
                color #fff
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
        .bottom-nav
            display flex
            position absolute
            bottom 0
            z-index 10
            width 100%
            height 55px
            background #000
            div
                width 33%
                height 55px
                text-align center
                color #fff
                .iconfont
                    display block
                    width 30px
                    height 30px
                    line-height 30px
                    font-size 24px
                    margin 3px auto 2px
                span
                    display block
                    height 20px
                    color rgba(255,255,255,.9)
                    font-size 13px
        .bottom-set
            position absolute
            bottom 50px
            z-index 10
            width 100%
            height 150px
            background rgba(44,44,44,.9)
            .font-size
                width 100%
                height 30px
                line-height 30px
                padding-top 10px
                color #fff
                .setName
                    display inline-block
                    width 100px
                    height 100%
                    text-align center
                .reduce-size,.add-size
                    display inline-block
                    width 50px
                    height 30px
                    text-align center
                    box-sizing border-box
                    border-radius 10px
                    border 1px solid #bbb
                .value
                    display inline-block
                    width 30px
                    text-align center
            .bg-color
                position relative
                width 100%
                height 40px
                box-sizing border-box
                padding  10px 0 0 100px
                color #fff
                .setName
                    position absolute
                    top 10px
                    left 0px
                    width 100px
                    height 40px
                    line-height 40px
                    text-align center
                .setColor
                    display inline-block
                    width 40px
                    height 40px
                    margin-right 10px
                    border-radius 50%
                    overflow hidden
                    box-sizing border-box
                    div
                        width 36px
                        height 36px
                        border-radius 50%
        .list
            position relative
            width 70%
            height 100%
            z-index 10
            background #555
            .chapter-list
                width 100%
                position absolute
                top 0
                bottom 0
                overflow auto
                ul
                    padding 0 20px
                    li
                        height 40px
                        line-height 40px
                        font-size 12px
                        color #fff
                        border-bottom 1px dashed #b2b2b2
</style>
