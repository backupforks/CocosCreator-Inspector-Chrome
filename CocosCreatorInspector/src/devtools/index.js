const PluginMsg = require("../core/plugin-msg");
// 对应的是Elements面板的边栏
chrome.devtools.panels.elements.createSidebarPane('Cocos', function (sidebar) {
  sidebar.setObject({some_data: "some data to show!"});
});
// 创建devtools-panel
chrome.devtools.panels.create("Cocos", "icon/icon48.png", "pages/devtools_panel.html", function (panel) {
    console.log("[CC-Inspector] Dev Panel Created!");
    let conn = chrome.runtime.connect({name: PluginMsg.Page.DevToolsPanel});
    conn.onMessage.addListener(function (event, sender) {
      // debugger
    });

    panel.onShown.addListener(function (window) {
      console.log("panel show");
      // debugger
      conn.postMessage({msg: PluginMsg.Msg.UrlChange, data: {}})
    });
    panel.onHidden.addListener(function (window) {
      console.log("panel hide");
    });
    panel.onSearch.addListener(function (action, query) {
      console.log("panel search!");
      return false;
    });
  }
);

