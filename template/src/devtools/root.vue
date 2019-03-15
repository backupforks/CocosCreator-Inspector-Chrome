<template lang="html">
    <div>
        <el-button size="mini" @click="onClickTest"> 检测</el-button>

    </div>
</template>
<script>
    export default {
        data: () => ({}),
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {
            onClickTest() {
                console.log("onClickTest")
            }
        }
    }
</script>
<style lang="scss">
    div {
        color: blue
    }
</style>