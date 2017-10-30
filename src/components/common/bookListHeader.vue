<template>
    <div id="bookListHeader">
        <h2 class="title">{{headerType}}</h2>
    </div>
</template>

<script>
export default {
    props:['headerType']
}
</script>

<style lang="stylus" scoped>
#bookListHeader
    position: relative
    padding: 10px 14px
    border-bottom: 1px solid #f0f0f0
    border-left: 6px solid #ffab18
    .title
        text-align: left
        font-size: 16px
        font-weight: normal
        color: #333
</style>
