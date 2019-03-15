chrome.runtime.onMessage.addEventListener(function (req, sender, callback) {
    callback("hi ,i am background!")
})
console.log("background inited!");