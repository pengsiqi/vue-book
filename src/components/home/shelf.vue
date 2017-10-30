<template>
    <div id="shelf">
        <div class="shelf_top">
            <div class="shelf_switch"></div>
            <a href="">
                <div class="shelf-search">输入书名/作者/关键字</div>
            </a>
        </div>
        <div class="book-list">
            <imgBook></imgBook>
        </div>
    </div>
</template>

<script>
import imgBook from '@/components/common/imgBook'

export default {
    components:{
        imgBook
    },
    mounted(){
        this.getShelfInfo()
    },
    methods:{
        getShelfInfo(){
            this.$http.get('/api/shelfInfo',{
                params:{
                    ids : '319207%2C270693%2C302633%2C46509%2C270794%2C323725',
                    owner : '0%2C2'
                }
            }).then((res)=>{
                console.log(res.data)
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
#shelf
    width 375px
    .shelf_top
        padding 10px 20px 0
        .shelf-search
            margin-right 46px
            font-size 12px
            color #ccc
            border 1px solid #eee
            border-radius 4px
            line-height 36px
            padding-left 32px
            background:url(http://image.read.duokan.com/mfsv2/download/fdsc3/p01dSYLeWtSR/tY73MgTfVw7UAS.png) no-repeat 10px center
            background-size 14px
        .shelf_switch
            width 36px
            height 36px
            float right 
            border-radius 4px
            background url(http://image.read.duokan.com/mfsv2/download/fdsc3/p01yLF3fEj8l/b7UfAdlfufQKML.png) no-repeat center
            background-size 16px
            border 1px solid #eee

.book-list
    padding 0px 7px
</style>
