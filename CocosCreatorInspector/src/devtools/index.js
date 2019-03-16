// 对应的是Elements面板的边栏
chrome.devtools.panels.elements.createSidebarPane('Cocos', function (sidebar) {
  sidebar.setObject({some_data: "some data to show!"});
});
// 创建devtools-panel
chrome.devtools.panels.create("Cocos", "icon/icon48.png", "pages/devtools_panel.html", function (panel) {
    console.log("[CC-Inspector] Dev Panel Created!");
    panel.onShown.addListener(function (window) {
      console.log("panel show");
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

// (function () {
//   var t = window.setInterval(function () {
//      egret && egret.devtool &&
//       egret.devtool.start &&
//       (window.clearInterval(t) || egret.devtool.start());
//     console.log("waiting")
//   }, 100);
//   egret && egret.devtool && egret.devtool.start && (window.clearInterval(t) || egret.devtool.start());
// })();
