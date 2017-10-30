<template>
    <div id="bookFooter">
        <mt-loadmore class="loadmore" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
            <div style="width:100%;height:700px;background:#000"></div>
        </mt-loadmore>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        }
    },
    methods: {
        loadTop() {

        },
        loadBottom() {
        }
    },
}
</script>


<style lang="stylus" scoped>

</style>
