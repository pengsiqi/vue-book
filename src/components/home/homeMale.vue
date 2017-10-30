<template>
    <div id="homeMale">
        <list-header :headerType='headerType'></list-header>
        <imgBook :bookData='maleBookInfo.books' v-if="maleBookInfo!==''"></imgBook>
        <div class="more" v-if="maleBookInfo!==''">
            <div>
                <router-link to="/male">
                    <span>查看更多</span>
                    <div class="icon"></div>
                </router-link>
            </div>
        </div>
        <div class="loading" v-show="maleBookInfo===''"></div>
    </div>
</template>

<script>
import imgBook from '@/components/common/imgBook'
import listHeader from '@/components/common/bookListHeader'

export default {
    data() {
        return {
            maleBookInfo: '',
            headerType: '男生频道'
        }
    },
    components: {
        imgBook,
        listHeader
    },
    mounted() {
        this._getCategoryBookInfo()
    },
    methods: {
        _getCategoryBookInfo() {
            this.$http.get('/api/getCategoryBookInfo', {
                params: {
                    gender: 'male',
                    major: '奇幻',
                    minor: '',
                    start: 0,
                    limit: 5
                }
            }).then((data) => {
                var books = data.data.books
                for (var i = 0; i < books.length; i++) {
                    books[i].cover = 'http://statics.zhuishushenqi.com' + books[i].cover
                }
                this.maleBookInfo = data.data
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
#homeMale
    border-bottom: 10px solid #f5f5f5

.more
    width 100%
    height 40px
    div
        position relative
        margin 0 auto
        width 80px
        height 100%
        span
            display block
            position absolute
            top 0px
            height 100%
            line-height 40px
            color #b93321
            font-size 12px
        .icon
            position absolute
            right 0px
            width 40px
            height 40px
            display block
            background url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEJklEQVR4Xu3dy1XbQBSA4ZlUQDpQB7HdADt8skpSQUIHpALogBJCB2FpZxPSALgDqwRY58TKEY8DGEnWY0aee+/PGizN/J8eHotj7/gxPQPe9OgZvAOAcQTJAfg9yQ7+evfh6Cb/Y7zNKMNPCsBylp0750/uR14Ut75w349W+cUoM2F0I8kAWM6yM+f86XYHvymOQRBPZzoAptmV8/6waqggMA6gHD4I4iBI5gywmGUn3vnzpmGCIDyCZACUQ1tOswvn/VcQhA9d94pJAQDBeOGftpQcABCMiyBJACAYD0GyAEAwDoKkAYAgPoLkAYAgLgIRAEAQD4EYACCIg0AUABCERyAOAAjCIhAJAAThEIgFAIIwCEQDAMFwBOIBgGAYAhUAQNAfgRoAIOiHQBUAEHRHoA4ACLohUAkABO0RqAUAgnYIVAMAwW4E6gGAoBmBCQAgqEdgBgAIqhGYAgCCtwjMAQDBawQmAYDgGYFZACB4QGAaAAgAcH8UWP6vZPNngKeroVUEAHhxU2wRAQC23hpbQwCAigUySwgAULNMbgUBABo+LLOAAAA7PjLXjgAAu5+ZUL1OAIAWADQvFgGgJQCtCADQAYBGBADoCEAbAgD0AKAJAQB6AtCCAAADAGhAAICBAKQjAEAAAJIRACAQAKkIABAQgEQEAAgMQBoCAEQAIAkBACIBkIIAABEBtEXgNsWX+Sq/jLwrlS8PgBFmfedDJUVxO7/J34+wK282AYCRZn0xzdbe+6xuc/Pr9V5a7GWjI815MptZzLIf3vlvDTt0N79eH+xjhwEQedZbxN/r1+ICICKA1OOXQwdAJAAS4gPAeHwARAAg5ch/GjqXgIAIpMXnDGA8PgACAZB45HMJIP79DHAPMACC5COfM8CA8OWfaojPGaAnAi3xAdADgKb4AOgIQFt8AHQAoDE+AFoC0BofAC0AaI4PgB0AtMcHQAMAC/EBUAPASnwAVACwFB8AWwCsxQfACwAW4wPgEYDV+ABQ9KleiyWNyl8x/TyA5SPf/PMAxH8gYPIMQPznq4E5AMR/fStgCgDx394HmgFA/Or3CSYAEL/+TaJ6AMRvXiFQDYD4u5eH1AIg/u74atcBiN8uvkoAxG8fXx0A4neLrwoA8bvHVwOA+P3iqwBA/P7xxQMg/rD4ogEQf3h8sQCIHya+SADEDxdfHADih40vCgDxw8cXA4D4ceKLAED8ePGTB0D8uPGTBkD8+PGTBUD8ceInCYD448VPDgDxx42fFIDlJPvs3vmfTVPgN8Xx0Sq/GH+a9G4xmYdCl9Psynl/WDfVxI+DUAQA4seJn9YlYJadOedPt4dK/HjxkwJQ7sximl167z89DvnOb4oTrvmGAJRD/TXJJv+cK79HN/+4yvO4w+fVk7kHIMV+ZgAA+5n3ZLb6H7/RWK5gVA+UAAAAAElFTkSuQmCC") no-repeat
            background-position center
            background-size 30%

.loading
    width 100%
    height 100px
    background url('../../assets/loading.gif') no-repeat
    background-position center
    background-size 30px
</style>
