<template>
    <div id="category">
        <div class="category-top">
            <i class="iconfont icon-fanhui" @click="back()"></i>
            <div class="title">分类</div>
        </div>
        <div class="tab">
            <div class="tab-nav">
                <ul>
                    <li v-for="(item,index) in tabNavContent" :class="{nav:flag===index}" @click="changeContent(index)">{{item}}</li>
                </ul>
            </div>
            <div class="content">
                <div class="content-all" v-show="flag === 0">
                    <div v-for="item in category.male" @click="categoryDetail(item.name)">
                        <span class="name">{{item.name}}</span>
                        <span class="count">{{item.bookCount}}</span>
                    </div>
                </div>
                <div class="content-all" v-show="flag === 1">
                    <div v-for="item in category.female" @click="categoryDetail(item.name)">
                        <span class="name">{{item.name}}</span>
                        <span class="count">{{item.bookCount}}</span>
                    </div>
                </div>
                <div class="content-all" v-show="flag === 2">
                    <div v-for="item in category.press" @click="categoryDetail(item.name)">
                        <span class="name">{{item.name}}</span>
                        <span class="count">{{item.bookCount}}</span>
                    </div>
                </div>
            </div>
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
            tabNavContent: ['男生', '女生', '出版'],
            flagQuery: ['male', 'female', 'press'],
            flag: 0,
            category: {}
        }
    },
    mounted() {
        this._getCategory()
    },
    methods: {
        changeContent(index) {
            this.flag = index
        },
        _getCategory() {
            this.$http.get('/api/getCategory').then((data) => {
                this.category = data.data
            })
        },
        categoryDetail(major) {
            this.$router.push({ name: 'categoryBook', query: { gender: this.flagQuery[this.flag], major: major } })
        },
        back() {
            this.$router.go(-1)
        },
    },
    components: {
        bottomNav
    }
}
</script>

<style lang="stylus" scoped>
.nav
    background #fff
    border-left 2px solid red

.content-all
    width 100%
    height 100%
    display flex
    flex-flow row wrap
    justify-content space-around
    align-content flex-start
    div
        width 45%
        height 50px
        margin-bottom 30px
        background #fff
        .name
            display block
            text-align center
            font-size 15px
            font-weight 700
            color #333
        .count
            display block
            margin-top 10px
            text-align center
            font-size 12px
            color #ccc

#category
    position relative
    width 100%
    height 100%
    .category-top
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
        .title
            font-size 16px
            font-weight 700
            line-height 50px
            color rgba(0,0,0,0.9)
    .tab
        position absolute
        top 50px
        bottom 50px
        width 100%
        overflow hidden
        display flex
        .tab-nav
            flex 1 1 auto
            width 20%
            height 100%
            overflow hidden
            background #f2f2f2
            ul
                li
                    box-sizing border-box
                    width 100%
                    height 80px
                    text-align center
                    line-height 80px
        .content
            flex 1 1 auto
            box-sizing border-box
            width 80%
            height 100%
            padding 20px 20px 0px
            overflow auto

.footer
  position absolute
  bottom 0px
  width 100%
  height 50px
</style>
