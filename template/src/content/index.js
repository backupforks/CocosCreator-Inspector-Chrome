console.log('content-script!')
// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
// })
chrome.runtime.sendMessage({msg: "content msg"})
