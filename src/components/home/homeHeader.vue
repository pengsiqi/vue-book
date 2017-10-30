<template>
  <div id="homeHeader">
      <!-- <div>
          <a href="javascript:;" @click="bookCityClick"></a>
          <a href="javascript:;" @click="shelfClick"></a>
          <i id="indexI" style="width:277px;transform:translateX(0px)"></i>
      </div>
      <em class="header-user"></em>
      <em class="header-checkin"></em> -->
      <h1>MyReader</h1>
  </div>
</template>

<script>
export default {
    methods:{
        // bookCityClick(){
        //     var indexI = document.getElementById('indexI')
        //     var wrapper = document.getElementsByClassName('wrapper')[0]
        //     wrapper.style.transform = 'translateX(0px)'
        //     indexI.style.transform = 'translateX(0px)'
        // },
        // shelfClick(){
        //     var wrapper = document.getElementsByClassName('wrapper')[0]
        //     var indexI = document.getElementById('indexI')
        //     wrapper.style.transform = 'translateX(-375px)'
        //     indexI.style.transform = 'translateX(95px)'
        // }
    }
}
</script>

<style lang="stylus" scoped>
#homeHeader
    padding 0px 90px
    text-align center
    line-height 44px
    background #efeff0
    border-bottom 1px solid #ddd
    position relative
    // div a:before
    //     content '\4e66\67b6'
    //     display inline-block
    //     margin 0 auto
    //     width 2em
    // div a:first-child:before
    //     content '\4e66\57ce'
    // div a
    //     display inline-block
    //     width 48%
    // div i:before
    //     content ''
    //     display block
    //     height 2px
    //     width 34px
    //     margin 0 auto
    //     background #777
    // div i
    //     position absolute
    //     left 0
    //     transition transform .2s ease-out
    // .header-user
    //     position absolute
    //     right 0
    //     top 0
    //     width 44px
    //     height 44px
    //     background url(http://image.read.duokan.com/mfsv2/download/fdsc3/p01j041d5DOT/boUg2EJlVetOMC.png) center no-repeat
    //     background-size 16px
    // .header-checkin
    //     position absolute
    //     left 0
    //     top 0
    //     width 44px
    //     height 44px
    //     background url(http://image.read.duokan.com/mfsv2/download/s010/p01O5K5DzsAZ/2ZODzjwkRQh7l3.png) center no-repeat
    //     background-size 22px
</style>


