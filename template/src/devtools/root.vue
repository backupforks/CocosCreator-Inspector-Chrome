<template lang="html">
    <div>
        <span>{{tips}}</span>
        <el-button size="mini" @click="onClickTest"> 检测</el-button>

    </div>
</template>
<script>
    export default {
        data: () => ({
            tips: "",
        }),
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {
            onClickTest() {
                this.tips = "";
                console.log("onClickTest")
                let views = chrome.extension.getViews({type: 'popup'});
                if (views.length > 0) {
                    this.tips = "找到popup";
                    console.log(views[0].location.href);
                } else {
                    this.tips = "未找到popup";

                }
            }
        }
    }
</script>
<style lang="scss">
    div {
        color: blue
    }
</style>