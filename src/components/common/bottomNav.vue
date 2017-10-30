<template>
    <div id="bottomNav">
        <ul>
            <li>
                <router-link to="/shelf">
                    <i class="iconfont icon-shucheng"></i>
                    <span>书架</span>
                </router-link>
            </li>
            <li>
                <router-link to="/home">
                    <i class="iconfont icon-shujia"></i>
                    <span>书城</span>
                </router-link>
            </li>
            <li>
                <router-link to="/category">
                    <i class="iconfont icon-fenlei1"></i>
                    <span>分类</span>
                </router-link>
            </li>
            <li>
                <router-link to="/search">
                    <i class="iconfont icon-63"></i>
                    <span>搜索</span>
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
#bottomNav
    width 100%
    height 50px
    ul
        width 100%
        height 100%
        overflow hidden
        display flex
        li
            width 25%
            height 100%
            text-align center
            font-size 12px
            span
                display block

.router-link-active
    color red

.iconfont
    display block
    width 30px
    height 30px
    line-height 30px
    font-size 24px
    margin 3px auto 2px
</style>
