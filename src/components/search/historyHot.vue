<template>
    <div id="historyHot">
        <div class="search-content">
            <div class="search-history">
                <div class="history-top">
                    <h1 class="title">历史搜索</h1>
                    <div class="icon-clear" @click="clearHistory()">
                        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk4MzY2NDg2NTEyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0MDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTYxNC40IDc5Ny44NjdjLTE4Ljg3NiAwLTM0LjEzMy0xNS4yNTgtMzQuMTMzLTM0LjEzM3YtMzc1LjQ2N2MwLTE4Ljg3NiAxNS4yNTgtMzQuMTMzIDM0LjEzMy0zNC4xMzNzMzQuMTMzIDE1LjI1OCAzNC4xMzMgMzQuMTMzdjM3NS40NjdjMCAxOC44NzYtMTUuMjU4IDM0LjEzMy0zNC4xMzMgMzQuMTMzek00MDkuNiA3OTcuODY3Yy0xOC44NzYgMC0zNC4xMzMtMTUuMjU4LTM0LjEzMy0zNC4xMzN2LTM3NS40NjdjMC0xOC44NzYgMTUuMjU4LTM0LjEzMyAzNC4xMzMtMzQuMTMzczM0LjEzMyAxNS4yNTggMzQuMTMzIDM0LjEzM3YzNzUuNDY3YzAgMTguODc2LTE1LjI1OCAzNC4xMzMtMzQuMTMzIDM0LjEzM3pNOTU1LjczMyAyMTcuNmgtMTcwLjY2N3YtNjguMjY3YzAtNTYuNDU3LTQ1LjU2OC0xMDIuNC0xMDEuNjE1LTEwMi40aC0zNDIuMTE4Yy01Ni40NTcgMC0xMDIuNCA0NS45NDMtMTAyLjQgMTAyLjR2NjguMjY3aC0xNzAuNjY3Yy0xOC44NzYgMC0zNC4xMzMgMTUuMjU4LTM0LjEzMyAzNC4xMzNzMTUuMjU4IDM0LjEzMyAzNC4xMzMgMzQuMTMzaDg4Ny40NjdjMTguODc2IDAgMzQuMTMzLTE1LjI1OCAzNC4xMzMtMzQuMTMzcy0xNS4yNTgtMzQuMTMzLTM0LjEzMy0zNC4xMzN6TTMwNy4yIDE0OS4zMzNjMC0xOC44MDcgMTUuMzI2LTM0LjEzMyAzNC4xMzMtMzQuMTMzaDM0Mi4xMThjMTguNzA1IDAgMzMuMzQ4IDE0Ljk4NSAzMy4zNDggMzQuMTMzdjY4LjI2N2gtNDA5LjZ2LTY4LjI2N3pNNzUxLjA3MCAxMDAyLjY2N2gtNDc3LjkzNWMtNTYuNDU3IDAtMTAyLjQtNDUuOTQzLTEwMi40LTEwMi40di01MTIuNTEyYzAtMTguODQyIDE1LjI5Mi0zNC4xMzMgMzQuMTMzLTM0LjEzM3MzNC4xMzMgMTUuMjkyIDM0LjEzMyAzNC4xMzN2NTEyLjUxMmMwIDE4Ljg0MiAxNS4zMjYgMzQuMTMzIDM0LjEzMyAzNC4xMzNoNDc3LjkzNWMxOC44NDIgMCAzNC4xMzMtMTUuMjkyIDM0LjEzMy0zNC4xMzN2LTUxMS4xMTNjMC0xOC44NDIgMTUuMjU4LTM0LjEzMyAzNC4xMzMtMzQuMTMzczM0LjEzMyAxNS4yOTIgMzQuMTMzIDM0LjEzM3Y1MTEuMTEzYzAgNTYuNDU3LTQ1Ljk0MyAxMDIuNC0xMDIuNCAxMDIuNHoiIHAtaWQ9IjI0MDIiIGZpbGw9IiM1MTUxNTEiPjwvcGF0aD48L3N2Zz4=" alt="">
                    </div>
                </div>
                <div class="history-content" v-if="historyContent.length !== 0">
                    <span v-for="item in historyContent" @click="getSearchBook(item)">{{item}}</span>
                </div>
                <div class="nohistory" v-if="historyContent.length === 0">
                    <span>无历史搜索</span>
                </div>
            </div>
            <div class="search-hot">
                <div class="hot-top">
                    <h1 class="title">热门搜索</h1>
                </div>
                <div class="hot-content">
                    <div v-for="(item,index) in searchHotWords" v-if="index<10"  @click="getSearchBook(item.word)">
                        <span>{{index + 1}}</span>{{item.word}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            historyContent: [],
            searchHotWords: [
                {
                    "word": "系统",
                    "times": 1620,
                    "isNew": 0,
                    "soaring": 0
                },
                {
                    "word": "重生",
                    "times": 1539,
                    "isNew": 0,
                    "soaring": 0
                },
                {
                    "word": "都市",
                    "times": 993,
                    "isNew": 0,
                    "soaring": 0
                },
                {
                    "word": "火影",
                    "times": 946,
                    "isNew": 0,
                    "soaring": 0
                },
                {
                    "word": "三国",
                    "times": 852,
                    "isNew": 0,
                    "soaring": 0
                },
                {
                    "word": "空间",
                    "times": 824,
                    "isNew": 0,
                    "soaring": 2
                },
                {
                    "word": "洪荒",
                    "times": 813,
                    "isNew": 0,
                    "soaring": 0
                },
                {
                    "word": "快穿",
                    "times": 760,
                    "isNew": 0,
                    "soaring": 2
                },
                {
                    "word": "穿越",
                    "times": 741,
                    "isNew": 0,
                    "soaring": 0
                },
                {
                    "word": "末世",
                    "times": 705,
                    "isNew": 0,
                    "soaring": -4
                },
                {
                    "word": "重生之",
                    "times": 696,
                    "isNew": 0,
                    "soaring": 0
                },
                {
                    "word": "元尊",
                    "times": 621,
                    "isNew": 0,
                    "soaring": 10
                },
                {
                    "word": "网游",
                    "times": 607,
                    "isNew": 0,
                    "soaring": -1
                },
                {
                    "word": "无限",
                    "times": 594,
                    "isNew": 0,
                    "soaring": 1
                },
                {
                    "word": "最强",
                    "times": 549,
                    "isNew": 0,
                    "soaring": 15
                },
                {
                    "word": "农",
                    "times": 524,
                    "isNew": 0,
                    "soaring": 28
                },
                {
                    "word": "乡村",
                    "times": 510,
                    "isNew": 0,
                    "soaring": -1
                },
                {
                    "word": "总裁",
                    "times": 509,
                    "isNew": 0,
                    "soaring": -1
                },
                {
                    "word": "超级",
                    "times": 498,
                    "isNew": 0,
                    "soaring": 0
                },
                {
                    "word": "海贼",
                    "times": 497,
                    "isNew": 0,
                    "soaring": -2
                },
                {
                    "word": "海贼王",
                    "times": 487,
                    "isNew": 0,
                    "soaring": -8
                }
            ]
        }
    },
    mounted() {
        var searchHistory = localStorage.getItem('searchHistory')
        if (searchHistory !== null) {
            this.historyContent = JSON.parse(searchHistory)
        } else {
            localStorage.setItem('searchHistory', '[]')
        }
    },
    methods: {
        ...mapMutations(['getSearchWord','setBookListFlag']),
        clearHistory() {
            this.historyContent = []
            localStorage.setItem('searchHistory', JSON.stringify(this.historyContent))
        },
        getSearchBook(value) {
            this.getSearchWord(value)
            this.setBookListFlag(false)
            this.$router.push('/search/searchBookList')
        }
    }
}
</script>

<style lang="stylus" scoped>
#historyHot
    width 100%
    height 100%
    overflow auto
    .search-content
                width 100%
                .search-history
                    box-sizing border-box
                    width 100%
                    padding 20px
                    .history-top
                        position relative
                        width 100%
                        height 30px
                        .title
                            font-size 12px
                            color #515151
                        .icon-clear
                            position absolute
                            top 0
                            right 0
                            width 15px
                            height 15px
                            img
                                width 100%
                                height 100%
                    .history-content
                        span
                            display inline-block
                            margin 10px 15px
                            font-size 14px
                    .nohistory
                        span
                            display inline-block
                            margin 10px 15px
                            font-size 14px
                .search-hot
                    box-sizing border-box
                    width 100%
                    padding 20px
                    .hot-top
                        position relative
                        width 100%
                        height 30px
                        .title
                            font-size 12px
                            color #515151
                    .hot-content
                        display flex
                        flex-wrap wrap
                        justify-content space-around
                        div
                            flex 1 1 auto
                            width 45%
                            padding 10px
                            box-sizing border-box
                            font-size 14px
                            span
                                display inline-block
                                width 11px
                                height 11px
                                padding 3px
                                margin-right 10px
                                font-size 12px
                                color #fff
                                background-color #DADADA
                                text-align center
</style>
