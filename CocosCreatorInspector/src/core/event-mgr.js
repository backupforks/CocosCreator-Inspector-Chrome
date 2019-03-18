const PluginMsg = require("./plugin-msg");
module.exports = {
  id: "event-mgr",
  testInit(name) {
    chrome.runtime.connect({name: name})
  }
}
