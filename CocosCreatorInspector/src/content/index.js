// 具有操作dom的能力
// 加载其他脚本
// var content = chrome.extension.getURL('js/inject.js')
// var script = document.createElement('script')
// script.setAttribute('type', 'text/javascript')
// script.setAttribute('src', content)
// script.onload = function () {
//   // 注入脚本执行完后移除掉
//   this.parentNode.removeChild(this);
// }
// document.body.appendChild(script)


window.addEventListener('message', function (event) {
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
  chrome.runtime.sendMessage({type: 0, msg: "no creator game!"}, function (data) {
    debugger
    console.log(data)
  });
}
