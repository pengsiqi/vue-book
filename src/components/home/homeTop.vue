<template>
  <div id="homeTop">
      <router-link to="/search">
        <div class="home-top-search">输入书名/作者/关键字</div>
      </router-link>
      <div class="slider-banner">
          <div>
              <a href=""><img src="http://image.read.duokan.com/mfsv2/download/fdsc3/p01V1KHze11Q/lb3QSrqV6N2qpI.jpg" 
              class="cover"></a>
          </div>
      </div>
      <ul class="home-top-btn">
          <li>
              <router-link to="/male">
                  <img src="http://image.read.duokan.com/mfsv2/download/s010/p015iBxwdkmU/5wc5uzYhLZ7iVa.png" alt="" class="falseImg">
                  <p class="home-top-des">男生</p>
              </router-link>
          </li>
          <li>
              <router-link to="/female">
                  <img src="http://image.read.duokan.com/mfsv2/download/s010/p01LWZmXGCpy/aSrSq6Llgt9PqE.png" alt="" class="falseImg">
                  <p class="home-top-des">女生</p>
              </router-link>
          </li>
          <li>
              <router-link to="/publishing">
                  <img src="http://image.read.duokan.com/mfsv2/download/s010/p010kK7M5VyH/8kPz9nKvRXyu1k.png" alt="" class="falseImg">
                  <p class="home-top-des">出版</p>
              </router-link>
          </li>
          <li>
              <router-link to="/category">
                  <img src="http://image.read.duokan.com/mfsv2/download/s010/p01pz5NtyRI0/2ENONnvOg23NXM.png" alt="" class="falseImg">
                  <p class="home-top-des">分类</p>
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.cover
    width 100%

#homeTop
    background #ffffff
    border-bottom 10px solid #f5f5f5
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

.home-top-btn
    margin 14px 0 4px
    display flex
    width 100%
    li
        line-height 2.4em
        font-size 12px
        text-align center
        flex 1
        .falseImg
            display block
            margin 0 auto
            width 22px
            height 22px
</style>


