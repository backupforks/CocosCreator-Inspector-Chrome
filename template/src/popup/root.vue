<template>
    <div>
        666
        <el-button type="primary" @click="tab">test</el-button>
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
            tab() {
                chrome.tabs.create({url: 'pages/app.html'})
            }
        }
    }
</script>
<style lang="scss">
    div {
        color: blue
    }
</style>