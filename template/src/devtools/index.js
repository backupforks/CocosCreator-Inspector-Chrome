chrome.devtools.panels.create('cc-inspector', 'img/logo.png', 'pages/panel.html', function (panel) {
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
})
