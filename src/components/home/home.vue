<template>
    <div id="home">
        <div class="homeHeader">
            <home-header></home-header>
        </div>
        <div class="wrapper">
            <div class="bookCity">
                <home-top></home-top>
                <!-- <home-hot></home-hot> -->
                <home-recommend></home-recommend>
                <home-male></home-male>
                <home-female></home-female>
                <!-- 
                        <home-free></home-free>
                        <home-bottom></home-bottom> -->
            </div>
        </div>
        <div class="footer">
            <bottom-nav></bottom-nav>
        </div>
    </div>
</template>

<script>
import homeHeader from '@/components/home/homeHeader'
import homeTop from '@/components/home/homeTop'
import homeRecommend from '@/components/home/homeRecommend'
import homeMale from '@/components/home/homeMale'
import homeFemale from '@/components/home/homeFemale'
import bottomNav from '@/components/common/bottomNav'

export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    },
    components: {
        homeHeader,
        homeTop,
        homeRecommend,
        homeMale,
        homeFemale,
        bottomNav
    }
}
</script>

<style lang="stylus" scoped>
#home
    position relative
    width 100%
    min-width 300px
    height 100%
    overflow hidden
    .homeHeader
        position absolute
        top 0
        left 0
        width 100%
    .wrapper
        position absolute
        top 45px
        bottom 50px
        width 100%
        overflow auto
        .bookCity
            width 100%

.footer
  position absolute
  bottom 0px
  width 100%
  height 50px
</style>


