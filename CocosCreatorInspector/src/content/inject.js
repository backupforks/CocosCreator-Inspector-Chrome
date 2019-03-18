// eval 注入脚本的代码,变量尽量使用var,后来发现在import之后,let会自动变为var
const PluginMsg = require("../core/plugin-msg");

let cc_inspector = {
  inspectorGameMemoryStorage: {},
  msgType: {
    nodeInfo: 2,//节点信息
    nodeListInfo: 1,// 节点列表信息
    notSupport: 0,// 不支持的游戏
  },
  postData: {
    scene: {
      name: "",
      children: []
    },
  },
  init() {
    setInterval(function () {
      // this.checkIsGamePage(true);
      // if (this.stop) {
      // } else {
      // }
    }.bind(this), 1000);
    // 注册cc_after_render事件
    window.addEventListener('message', function (event) {
      if (event.data.msg === PluginMsg.Msg.UrlChange) {
        this.checkIsGamePage(true);
      }
    }.bind(this));
  },
  updateTreeInfo() {
    let isCocosCreatorGame = this.checkIsGamePage(true);
    if (isCocosCreatorGame) {
      let scene = cc.director.getScene();
      if (scene) {
        this.postData.scene = {
          type: 1,// 标识类型
          uuid: scene.uuid,
          name: scene.name,
          children: [],
        };
        this.inspectorGameMemoryStorage[scene.uuid] = scene;
        let sceneChildren = scene.getChildren();
        for (let i = 0; i < sceneChildren.length; i++) {
          let node = sceneChildren[i];
          this.getNodeChildren(node, this.postData.scene.children);
        }
        // console.log(postData);
        this.sendMsgToDevTools(PluginMsg.Msg.ListInfo, this.postData);
      } else {
        this.postData.scene = null;
        this.sendMsgToDevTools(PluginMsg.Msg.Support, {support: false, msg: "未发现游戏场景,不支持调试游戏!"});
      }
    }
  },
  checkIsGamePage(isLog) {
    // 检测是否包含cc变量
    let isCocosCreatorGame = true;
    let msg = "支持调试游戏!";
    try {
      cc
    } catch (e) {
      isCocosCreatorGame = false;
      msg = "不支持调试游戏!";
    }
    this.sendMsgToDevTools(PluginMsg.Msg.Support, {support: isCocosCreatorGame, msg: msg, log: isLog});
    return isCocosCreatorGame;
  },
  testEval() {
    console.log("hello devtools eval")
  },
  testMsg2() {
    debugger
    chrome.runtime.connect({name: "inject"});
  },
  testMsg3() {
    debugger
    chrome.runtime.sendMessage("ffff");
  },
  // 收集组件信息
  getNodeComponentsInfo(node) {
    let ret = [];
    let nodeComp = node._components;
    for (let i = 0; i < nodeComp.length; i++) {
      let itemComp = nodeComp[i];
      this.inspectorGameMemoryStorage[itemComp.uuid] = itemComp;
      ret.push({
        uuid: itemComp.uuid,
        type: itemComp.constructor.name,
        name: itemComp.name,
      });
    }
    return ret;
  },

  pluginSetNodeColor(uuid, colorHex) {
    let node = this.inspectorGameMemoryStorage[uuid];
    if (node) {
      node.color = cc.hexToColor(colorHex);
    }
  },
  pluginSetNodeRotation(uuid, rotation) {
    let node = this.inspectorGameMemoryStorage[uuid];
    if (node) {
      node.rotation = rotation;
    }
  },
  pluginSetNodePosition(uuid, x, y) {
    let node = this.inspectorGameMemoryStorage[uuid];
    if (node) {
      node.x = x;
      node.y = y;
    }
  },
  pluginSetNodeSize(uuid, width, height) {
    let node = this.inspectorGameMemoryStorage[uuid];
    if (node) {
      node.width = width;
      node.height = height;
    }
  },
  // 设置节点是否可视
  pluginSetNodeActive(uuid, isActive) {
    let node = this.inspectorGameMemoryStorage[uuid];
    if (node) {
      if (isActive === 1) {
        node.active = true;
      } else if (isActive === 0) {
        node.active = false;
      }
    }
  },
  // 获取节点信息
  getNodeInfo(uuid) {
    let node = this.inspectorGameMemoryStorage[uuid];
    if (node) {
      let nodeComp = this.getNodeComponentsInfo(node);
      let nodeData = {
        type: node.constructor.name,
        uuid: node.uuid,
        name: node.name,
        x: node.x,
        y: node.y,
        zIndex: node.zIndex,
        childrenCount: node.childrenCount,
        children: [],
        width: node.width,
        height: node.height,
        color: node.color.toCSS(),
        opacity: node.opacity,
        rotation: node.rotation,
        rotationX: node.rotationX,
        rotationY: node.rotationY,
        anchorX: node.anchorX,
        anchorY: node.anchorY,
        scaleX: node.scaleX,
        scaleY: node.scaleY,
        skewX: node.skewX,
        skewY: node.skewY,
        components: nodeComp
      };
      let nodeType = node.constructor.name;
      if (nodeType === 'cc_Scene') {

      } else {
        nodeData.active = node.active;
      }
      this.sendMsgToDevTools(PluginMsg.Msg.NodeInfo, nodeData);
    } else {
      // 未获取到节点数据
      console.log("未获取到节点数据");
    }
  },

  // 收集节点信息
  getNodeChildren(node, data) {
    // console.log("nodeName: " + node.name);
    let nodeData = {
      uuid: node.uuid,
      name: node.name,
      children: [],
    };
    this.inspectorGameMemoryStorage[node.uuid] = node;
    let nodeChildren = node.getChildren();
    for (let i = 0; i < nodeChildren.length; i++) {
      let childItem = nodeChildren[i];
      // console.log("childName: " + childItem.name);
      this.getNodeChildren(childItem, nodeData.children);
    }
    data.push(nodeData);
  },
  sendMsgToDevTools(msg, data) {
    window.postMessage({msg: msg, data: data}, "*");
  },

  onMemoryInfo() {
    this.sendMsgToDevTools(PluginMsg.Msg.MemoryInfo, {
      performance: {
        jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit,
        totalJSHeapSize: window.performance.memory.totalJSHeapSize,
        usedJSHeapSize: window.performance.memory.usedJSHeapSize,
      },
      console: {
        jsHeapSizeLimit: console.memory.jsHeapSizeLimit,
        totalJSHeapSize: console.memory.totalJSHeapSize,
        usedJSHeapSize: console.memory.usedJSHeapSize,
      },
    });
  }
}
window.ccinspector = window.ccinspector || cc_inspector;
window.ccinspector.init && window.ccinspector.init();// 执行初始化函数




