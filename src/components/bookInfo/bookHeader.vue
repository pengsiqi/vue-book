<template>
  <div id="bookHeader">
      <div class="icon-back" @click="back()"></div>
      <span class="top-title">书籍详情</span>
      <router-link to="/home" class="header-home"></router-link>
  </div>
</template>

<script>
export default {
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="stylus" scoped>
#bookHeader
    position relative
    height 44px
    border-bottom 1px solid #ddd
    font 15px/45px
    color rgba(0,0,0,0.7)
    background-color #efeff0
    .icon-back
        float left
        width 42px
        height 44px
    .icon-back:before
        content ''
        display block
        margin 15px 0 0 16px
        width 10px
        height 16px
        background url('http://dushu.xiaomi.com/x0D0GrWs.png') no-repeat
        background-size 10px 16px
    .top-title
        line-height 44px
    .header-home
        float right 
        width 44px
        height 44px
        background url(http://image.read.duokan.com/mfsv2/download/fdsc3/p01eZH42sBV7/QTS90E2ZVritaa.png) no-repeat center
        background-size 16px
</style>
