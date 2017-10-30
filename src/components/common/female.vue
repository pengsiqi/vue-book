<template>
    <div id="female">
        <div class="female-top">
            <div class="icon-back" @click="back()"></div>
            <div class="title">女生最爱</div>
        </div>
        <div class="content">
            <mt-loadmore class="loadmore" :bottomDistance="100" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
                <imgBook :bookData="bookData" v-if="bookData.length!==0"></imgBook>
                <div style="width:100%;height:1000px;background:#fff" v-show="bookData.length===0"></div>
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
            bookData: [],
            start: 0,
            limit: 9
        }
    },
    mounted() {
        if (this.bookData.length === 0) {
            Indicator.open({
                spinnerType: 'fading-circle'
            })
        }
        this._getCategoryBookInfo(this.start, this.limit)
    },
    methods: {
        _getCategoryBookInfo(start, limit) {
            this.$http.get('/api/getCategoryBookInfo', {
                params: {
                    gender: 'female',
                    type: 'hot',
                    major: '现代言情',
                    minor: '',
                    start: start,
                    limit: limit
                }
            }).then((data) => {
                var books = data.data.books
                for (var i = 0; i < books.length; i++) {
                    books[i].cover = 'http://statics.zhuishushenqi.com' + books[i].cover
                }
                this.bookData = this.bookData.concat(books)

                this.$refs.loadmore.onTopLoaded()
                this.$refs.loadmore.onBottomLoaded()
                Indicator.close()
            })
        },
        back(){
            this.$router.go(-1)
        },
        loadTop() {
            this.bookData = []
            this._getCategoryBookInfo(0, 9)
        },
        loadBottom() {
            this._getCategoryBookInfo(this.start + 10, this.limit + 10)
        }
    },
    components: {
        imgBook
    }
}
</script>

<style lang="stylus" scoped>
#female
    position relative
    width 100%
    height 100%
    .female-top
        position relative
        width 100%
        height 50px
        color #fff
        background-color red
        .icon-back
            position absolute
            top 0
            left 0
            width 50px
            height 50px
            background url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAD7ElEQVR4Xu3d63XbMAxAYXKyppukmySTtN2o3aQbuMeJfeI4lgiSEAkCN39DypLuZ8mm88iJryFn4HQ6PaeUvuWcfwx5QOGDZOE4hnWcgUv8n5dN/LKEAAAdYSVT7+Jfp5hBAABJxcYxG/FNIQBAY9zStEJ8MwgAUCrZ8H1hfBMIANAQeG9KZfzpCACgCKAx/lQEAFAC0Bl/GgIAKABQin/dk9ec84vCbok2AQDRadoepBz/b0rpKef8r3O3xNMBID5VXweuHv98RABoBOAhPgCCxwdAAwAvz/zroXMLqEDgLT5XgODxASAE4PGZzy2A+G9ngNcAOxA8P/O5AhSuABHicwXYQBAlPgAeAIgUHwB3AKLFB8ANgIjxAXABEDU+AFJKkeOHBxA9fmgAxH+//4VcCST+x6vfcACI//m9bygAxP+68hUGAPEfr3uHAED87U++3AMg/v7Hnq4BEL/8Uy9uARC/HN/tOgDxZfFdAiC+PL47AMSvi+8KAPHr47sBQPy2+C4AEL89/vIAiN8Xf2kAxO+PvywA4uvEXxIA8fXiLweA+LrxlwJAfP34ywAg/jHxlwBA/OPimwdA/GPjmwZA/OPjmwVA/DHxTQIg/rj45gAQf2x8UwCIPz6+GQDEnxPfBADiz4s/HQDx58afCoD48+NPA0B8G/GnACC+nfjDARDfVvzVAfxJKX0f+R+27OXr36PhvxyqfBUAQaeB4QDO+wuCzmqK06cAAIFiwc5NTQMAgs5yStOnAgCBUsWOzUwHAIKOegpTTQAAgULJxk2YAQCCxoKd00wBAEFnzYbp5gCAoKFixxSTAEDQUbRyqlkAIKgs2TjcNAAQNFatmGYeAAgqajYMXQIACBrKCqcsAwAEwqKVw5YCAILKuoLhywEAgaBqxZAlAYCgonBh6LIAQKCDYGkAIOhHsDwAEPQhcAEABO0I3AAAQRsCVwBAUI/AHQAQ1CFwCQAEcgRuAYBAhsA1ABCUEbgHAIJ9BCEAgGAbQRgAIHiMIBQAEHxFEA4ACD4jCAkABB8IwgIAwTuC0ABAAIC3Z0Hkv1kU/gpwvRtGRQCAmxfFEREA4O6tcTQEAHiwQBYJAQA2lsmjIADAzodlERAAoPCRuXcEACj/zITrdQIACAB4XiwCgBCAVwQAqADgEQEAKgF4QwCABgCeEACgEYAXBADoAOABAQA6ARyA4DXn/KKwW6JNAEB0msqDlFYMf+ecn8uPpjcCAHrnsnfFcHj886EDQBFAx+1gSnwAKMe/bq7ydjAtPgAOAlBxJZgaHwAHAhAgmB4fAAcD2EFgIj4ABgB4gMBMfAAMAnCD4Gn0+/zSIf4HnJnqn1/5JcgAAAAASUVORK5CYII=") no-repeat
            background-position center
            background-size 20px
        .title
            width 200px
            height 50px
            line-height 50px
            margin 0 auto
            text-align center
    .content
        position absolute
        top 50px
        bottom 0px
        width 100%
        overflow auto
</style>
