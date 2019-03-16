function shortConnectionLink(request, sender, sendResponse) {
  console.log(`%c[短连接|id:${sender.id}|url:${sender.url}]\n${JSON.stringify(request)}`, 'background:#aaa;color:#BD4E19')
  console.log(request);
  sendResponse && sendResponse(request);
}

function longConnectionLink(data, sender) {
  console.log(`%c[长连接:${sender.name}]\n${JSON.stringify(data)}`, 'background:#aaa;color:#bada55')
  sender.postMessage(data);
  // chrome.tabs.executeScript(message.tabId, {code: message.content});
  // port.postMessage(message);
}

// 长连接
chrome.runtime.onConnect.addListener(function (port) {
  console.log(`%c[长连接:${port.name}] 建立链接!`, 'background:#aaa;color:#ff0000');
  port.onMessage.addListener(longConnectionLink);
  port.onDisconnect.addListener(function (port) {
    console.log(`%c[长连接:${port.name}] 断开链接!`, 'background:#aaa;color:#00ff00');
    port.onMessage.removeListener(longConnectionLink);
  });
});

// background.js 更像是一个主进程,负责整个插件的调度,生命周期和chrome保持一致
// [短连接] 监听来自content.js发来的事件
chrome.runtime.onMessage.addListener(shortConnectionLink);
