module.exports = {
  name: "Cocos Creator Inspector",
  version: "1.0.1",
  description: "Cocos Creator Inspector",
  browser_action: {
    default_title: "CC-Inspector",
    default_icon: "static/images/icon48.png",
    default_popup: "pages/popup.html"
  },
  icons: {
    48: "static/images/icon48.png"
  },
  devtools_page: "pages/devtools.html",
  content_scripts: [
    {
      matches: [
        "<all_urls>"
      ],
      js: [
        "js/content.js"
      ],
      run_at: "document_end"
    }
  ],
  background: {
    scripts: [
      "js/background.js"
    ]
  },
  options_page: "pages/options.html",
  manifest_version: 2,
  permissions: [
    "tabs",
    "http://*/*",
    "https://*/*",
    "*://*/*",
    "system.cpu",
    "tabs",
    "storage",
    "nativeMessaging"
  ],
  web_accessible_resources: ["*/*", "*"],
  content_security_policy: "script-src 'self' 'unsafe-eval';  object-src 'self'"
}
