<template>
    <div>
        <div style="display: flex;flex-direction: row;align-items: center;">
            <h3>{{title}}</h3>
            <div style="flex: 1"></div>
            <el-button size="mini" @click="tab">设置</el-button>
        </div>
        <div style="text-align: center;width: 100%; color: #6d6d6d;">
            <span>支持作者</span>
        </div>
        <br/>
        <div style="margin:0 auto;width:100%;">
            <div style="width: 200px; margin: 0 auto;" v-show="isShowMoneyPng">
                <img style="width: 100%;height: auto;" src="./popup/money.jpg">
            </div>
        </div>
        <br/>
        <div id="foot" style="height: 30px;">
            <span style="font-size: 14px;float: left;text-align: center;line-height: 30px;color: #6d6d6d;">联系方式:</span>
            <div style="height: 100%;float: right;margin-right: 10px;">
                <a href="https://github.com/tidys/CocosCreatorPlugins/tree/master/CocosCreatorInspector"
                   target="_blank">
                    <img src="./popup/github.png" style="height: 100%;">
                </a>
            </div>
            <div style="height: 100%;float: right;margin-right: 10px;">
                <a href="https://jq.qq.com/?_wv=1027&k=5SdPdy2" target="_blank">
                    <img src="./popup/qq.png" style="height: 100%;">
                </a>
            </div>
            <div style="height: 100%;float: right;margin-right: 10px;">
                <a href="http://forum.cocos.com/t/chrome-creator/55669" target="_blank">
                    <img src="./popup/tiezi.png" style="height: 100%;">
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: () => ({
            title: "cc-inspector",
            isShowMoneyPng: true,
        }),
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {
            tab() {
                chrome.tabs.create({url: 'pages/tap.html'})
            }
        }
    }
</script>
<style lang="scss">
    div {
        color: blue
    }
</style>