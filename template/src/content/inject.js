var content = chrome.extension.getURL('js/content.js')
var script = document.createElement('script')
script.setAttribute('type', 'text/javascript')
script.setAttribute('src', content)
script.onload = function () {
    // 注入脚本执行完后移除掉
    this.parentNode.removeChild(this);
}
document.body.appendChild(script)
