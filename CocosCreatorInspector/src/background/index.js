function shortConnectionLink(request, sender, sendResponse) {
  console.log(`%c[短连接|id:${sender.id}|url:${sender.url}]\n${JSON.stringify(request)}`, 'background:#aaa;color:#BD4E19')
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
  port.postMessage("ok");
  port.onDisconnect.addListener(function (port) {
    console.log(`%c[长连接:${port.name}] 断开链接!`, 'background:#aaa;color:#00ff00');
    port.onMessage.removeListener(longConnectionLink);
  });
});

// background.js 更像是一个主进程,负责整个插件的调度,生命周期和chrome保持一致
// [短连接] 监听来自content.js发来的事件
chrome.runtime.onMessage.addListener(shortConnectionLink);


function createPluginMenus() {
  // 右键菜单
  let parent = chrome.contextMenus.create({id: "parent", title: "CC-Inspector"});
  chrome.contextMenus.create({
    id: "test",
    title: "测试右键菜单",
    parentId: parent,
    // 上下文环境，可选：["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]，默认page
    contexts: ['page'],
  });
  chrome.contextMenus.create({
    id: "notify",
    parentId: parent,
    title: "通知"
  })

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "test") {
      alert('您点击了右键菜单！');
    } else if (info.menuItemId === "notify") {
      chrome.notifications.create(null, {
        type: "basic",
        iconUrl: "icon/icon48.png",
        title: "通知",
        message: "测试通知",
      })
    }
  })
}

chrome.contextMenus.removeAll(function () {
  createPluginMenus();
});

