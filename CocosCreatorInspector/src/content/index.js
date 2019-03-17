// 具有操作dom的能力
// 加载其他脚本
// content.js 和原始界面共享DOM,但是不共享js,要想访问页面js,只能通过注入的方式
function injectScriptToPage(url) {
  let content = chrome.extension.getURL(url)
  console.log(`[cc-inspector]注入脚本:${content}`);
  let script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', content)
  script.onload = function () {
    // 注入脚本执行完后移除掉
    this.parentNode.removeChild(this);
  }
  document.body.appendChild(script)
}

injectScriptToPage("js/inject.js");

// 和background.js保持长连接通讯
let conn = chrome.runtime.connect({name: "connect.js"})
// conn.postMessage('test');
let EventMgr=require("../core/event-mgr");
debugger
EventMgr.id="inject-id";
conn.onMessage.addListener(function (port) {
  debugger
})
// 接受来自inject.js的消息数据
window.addEventListener('message', function (event) {
  debugger
  let data = event.data;
  // console.log("[contentScripts] " + JSON.stringify(data));
  chrome.runtime.sendMessage(data);
}, false);


let gameCanvas = document.querySelector("#GameCanvas");
if (gameCanvas) {
  // console.log('find GameCanvas element');
  // gameCanvas.addEventListener('click', function () {
  //   console.log("click canvas");
  // });
  // gameCanvas.style.display = 'none';
} else {
  // console.log("can't find GameCanvas element");
  // 和background.js保持短连接通讯
  chrome.runtime.sendMessage({type: 0, msg: "no creator game!"}, function (data) {
    console.log(data)
  });
}
