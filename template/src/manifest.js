module.exports = {
    name: 'CC-Inspector',
    version: '1.0.0',
    description: 'cocos creator inspector',
    author: 'xu_yanfeng',
    manifest_version: 2,
    icons: {'16': 'icons/16.png', '128': 'icons/128.png'},
    // 权限申请
    permissions: [
        '<all_urls>',
        '*://*/*',
        'activeTab',
        'tabs',// 标签
        'cookies',
        'background',
        'contextMenus',// 右键菜单
        'unlimitedStorage',
        'storage',// 本地存储
        'notifications',// 通知
        'identity',
        'identity.email',
        "http://*/*",
        "https://*/*",
        "*://*/*",
        "system.cpu",
        "nativeMessaging"
    ],
    browser_action: {
        default_title: 'title',
        default_popup: 'pages/popup.html'
    },
    background: {
        persistent: false,
        page: 'pages/background.html'
    },
    devtools_page: 'pages/devtools.html',
    options_page: 'pages/options.html',
    // 需要直接注入页面的js
    content_scripts: [{
        js: ['js/inject.js'],
        run_at: 'document_end',// 代码注入时间: "document_start", "document_end", or "document_idle"，
        matches: ['<all_urls>'],// 匹配所有地址
        all_frames: true
    }],
    content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self' allow-modals ",
    web_accessible_resources: ['panel.html', 'js/content.js']
}
