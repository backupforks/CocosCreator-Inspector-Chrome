<template>
  <div style="display: flex;width: 100%; height: 100%;flex-direction: column">
    <div v-show="isShowDebug" style="display: flex;flex: 1; flex-direction: column;">
      <div>
        <el-button type="success" size="mini" @click="onBtnClickTest1">Test1</el-button>
        <el-button type="success" size="mini" @click="onBtnClickTest2">Test2</el-button>
        <el-button type="success" size="mini" @click="onMemoryTest">内存测试</el-button>
      </div>
      <div>
        <span>JS堆栈限制: {{memory.performance.jsHeapSizeLimit}}</span>
        <span>JS堆栈大小: {{memory.performance.totalJSHeapSize}}</span>
        <span>JS堆栈使用: {{memory.performance.usedJSHeapSize}}</span>
      </div>
      <el-row style="display:flex; flex: 1;">
        <el-col :span="8" style="display: flex;flex-direction: column;">
          <div style="display: flex; flex-direction: row; ">
            <el-switch active-text="实时监控" v-model="watchEveryTime" @change="onChangeWatchState"></el-switch>
            <el-button type="success" class="el-icon-refresh" size="mini" @click="onBtnClickUpdateTree">刷新</el-button>
          </div>
          <div class="grid-content treeList" style="flex: 1;">

            <el-tree :data="treeData"
                     :props="defaultProps"
                     :highlight-current="true"
                     :default-expand-all="false"
                     :expand-on-click-node="true"
                     @node-click="handleNodeClick"></el-tree>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light treeInfo">
            <NodeBaseProperty v-bind:itemData="treeItemData"></NodeBaseProperty>
            <SceneProperty v-show=" treeItemData.type === 'cc_Scene'"></SceneProperty>
            <ComponentsProperty v-bind:components="treeItemData.components"></ComponentsProperty>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-show="!isShowDebug" style="display: flex; flex: 1;" class="center-center horizontal">
      <span style="margin-right: 20px;">未发现cocos creator的游戏!</span>
      <el-button type="success" class="el-icon-refresh" size="mini" @click="onBtnClickUpdatePage">刷新</el-button>
    </div>
  </div>
</template>

<script>
  // import injectScript from '../injectScript.js'
  // import EvalCode from "./evalCodeString.js";


  const PluginMsg = require("../../core/plugin-msg");

  export default {
    data() {
      return {
        isShowDebug: false,
        treeItemData: {},
        treeData: [],
        treeDataMap: {},
        bgConn: null,// 与background.js的链接

        defaultProps: {
          children: 'children',
          label: 'name'
        },
        watchEveryTime: false,// 实时监控节点树
        memory: {
          performance: {},
          console: {},
        },
      }
    },
    created() {
      // chrome.devtools.inspectedWindow.tabId
      // 接收来自background.js的消息数据
      this.bgConn = chrome.runtime.connect({name: PluginMsg.Page.Devtools});
      this.bgConn.onMessage.addListener(function (data, sender) {
        if (!data) {
          return;
        }
        let eventData = data.data;
        let eventMsg = data.msg;
        if (eventMsg === PluginMsg.Msg.ListInfo) {
          this.isShowDebug = true;
          this._updateTreeView(eventData);
        } else if (eventMsg === PluginMsg.Msg.Support) {
          this.isShowDebug = eventData.support;
        } else if (eventMsg === PluginMsg.Msg.NodeInfo) {
          this.isShowDebug = true;
          this.treeItemData = eventData;
        } else if (eventMsg === PluginMsg.Msg.MemoryInfo) {
          this.memory = eventData;
        }
      }.bind(this));

      window.addEventListener('message', function (event) {
        console.log("on vue:" + JSON.stringify(event.data));
        console.log("on vue:" + JSON.stringify(event));
      }, false);
    },
    methods: {
      onTestData() {
        let testData = {
          "type": "cc_Node",
          "uuid": "5cUWX4Yh1MipGk+ssnZ/fL",
          "name": "Canvas",
          "x": 960,
          "y": 540.4931506849315,
          "zIndex": 0,
          "childrenCount": 6,
          "children": [],
          "width": 1920,
          "height": 1080.986301369863,
          "color": "#fff85f",
          "opacity": 255,
          "rotation": 0,
          "rotationX": 0,
          "rotationY": 0,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "scaleX": 1,
          "scaleY": 1,
          "skewX": 0,
          "skewY": 0,
          "components": [
            {
              "uuid": "Comp.931",
              "type": "cc_Canvas",
              "name": "Canvas<Canvas>"
            },
            {
              "uuid": "Comp.932",
              "type": "HotUpdateScene",
              "name": "Canvas<HotUpdateScene>"
            }],
          "active": true
        };
        this.treeItemData = testData;
      },
      handleNodeClick(data) {
        // todo 去获取节点信息
        // console.log(data);
        let uuid = data.uuid;
        if (uuid !== undefined) {
          this.evalInspectorFunction("getNodeInfo", `"${uuid}"`);
        }
      },
      onChangeWatchState() {
        if (this.watchEveryTime) {
          this.timerID = setInterval(function () {
            this.onBtnClickUpdateTree();
          }.bind(this), 100);
        } else {
          clearInterval(this.timerID);
        }

      },
      _updateTreeView(data) {
        this.treeData = [data.scene];
        return;
        // 构建树形数据
        if (this.treeData.length === 0) {// 第一次赋值


        } else {

        }


        let treeData = [];
        debugger
        let sceneData = data.scene;
        if (sceneData) {
          // scene info
          let dataRoot = {
            type: sceneData.type, uuid: sceneData.uuid,
            label: sceneData.name, children: []
          };
          treeData.push(dataRoot);
          this.handleNodeClick(dataRoot);
          // scene children info
          for (let k in sceneData.children) {
            let itemSceneData = sceneData.children[k];
            // let sceneItem = {uuid: itemSceneData.uuid, label: itemSceneData.name, children: []};
            let sceneItem = {};
            dealChildrenNode(itemSceneData, sceneItem);
            treeData[0].children.push(sceneItem);
          }
        }
        this.treeData = treeData;

        function dealChildrenNode(rootData, obj) {
          obj['data'] = rootData;
          obj['uuid'] = rootData.uuid;
          obj['label'] = rootData.name;
          obj['type'] = rootData.type;
          obj['children'] = [];
          let rootChildren = rootData.children;
          for (let k in rootChildren) {
            let itemData = rootChildren[k];
            let item = {};
            dealChildrenNode(itemData, item);
            obj.children.push(item);
          }
        }
      },
      _getInjectScriptString() {
        let injectScript = "";
        let code = injectScript.toString();
        let array = code.split('\n');
        array.splice(0, 1);// 删除开头
        array.splice(-1, 1);// 删除结尾
        let evalCode = "";
        for (let i = 0; i < array.length; i++) {
          evalCode += array[i] + '\n';
        }
        // console.log(evalCode);
        return evalCode;
      },

      evalInspectorFunction(funcString, parm) {
        if (funcString || funcString.length > 0) {
          let injectCode =
            `if(window.ccinspector){
              let func = window.ccinspector.${funcString};
              if(func){
                console.log("执行${funcString}成功");
                func.apply(window.ccinspector,[${parm}]);
              }else{
                console.log("未发现${funcString}函数");
              }
            }else{
              console.log("可能脚本没有注入");
            }`;
          console.log(injectCode);
          let ret = chrome.devtools.inspectedWindow.eval(injectCode, function (result, info) {
            if (info && info.isException) {
              console.log(info.value)
            }

          });
          console.log(`ret:${ret}`);
        } else {
          console.log("执行失败!");
        }
      },
      onBtnClickUpdateTree() {
        this.evalInspectorFunction("updateTreeInfo");

      },
      onBtnClickUpdatePage() {
        this.evalInspectorFunction("checkIsGamePage", "true");
        // let code = this._getInjectScriptString();
        // chrome.devtools.inspectedWindow.eval(code, function () {
        //   console.log("刷新成功!");
        // });
      },
      onBtnClickTest1() {
        chrome.devtools.inspectedWindow.eval(`window.ccinspector.testMsg1()`)
      },
      _getTime() {
        return new Date().getTime().toString();
      },
      onBtnClickTest2() {
        // chrome.devtools.inspectedWindow.eval(`window.ccinspector.testMsg2()`)


        let newData = [
          {
            name: this._getTime(),
            children: [
              {
                name: this._getTime(),
                children: [
                  {
                    name: this._getTime(),
                  }
                ]
              },
              {
                name: this._getTime(),
              }
            ]
          }

        ]

        // this.treeData = newData;
        this._update37(this.treeData[0], newData[0])
      },
      _update37(oldTreeNode, newTreeNode) {
        debugger
        if (!newTreeNode) {
          return;
        }
        if (!oldTreeNode) {
          oldTreeNode = {name: "", children: []};
        }
        if (oldTreeNode.name !== newTreeNode.name) {
          oldTreeNode.name = newTreeNode.name;
        }

        let oldChildren = oldTreeNode.children;
        let newChildren = newTreeNode.children;

        if (oldChildren.length === 0) {
          oldChildren = newChildren;
        } else {
          // 比较2个数据: treeData, newTreeData
          // 比较该层级的数据
          for (let i = 0; i < newChildren.length; i++) {
            let itemNew = newChildren[i];
            let itemOld = oldChildren[i];
            if (itemOld === undefined) {
              // 老节点中没有
              oldChildren.push(itemNew);
            } else if (itemNew.name !== itemOld.name) {
              // 替换
              oldChildren.splice(i, 1, itemNew);
            } else {
              this._update37(itemOld, itemNew);
            }
          }
          // 多余的删除了
          if (oldChildren.length > newChildren.length) {
            oldChildren.splice(newChildren.length, oldChildren.length - newChildren.length);
          }
        }
      },
      onBtnClickTest3() {
        // chrome.devtools.inspectedWindow.eval(`window.ccinspector.testMsg3()`)
        let f = require("../../core/event-mgr");
        console.log(f.id);
      },
      onMemoryTest() {
        this.evalInspectorFunction("onMemoryInfo");
      }
    }
  }
</script>

<style scoped>
  .treeList {
    height: 100%
  }

  .treeInfo {
    height: 100%
  }

  .bg-purple {
    background: #d3dce6;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 20px;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  body span h1 h2 h3 {
    font-family: BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, 'SourceHanSansCN-Normal', Arial, sans-serif
  }

  .layout {
    display: block;
  }

  .horizontal {
    flex-direction: row;
  }

  .vertical {
    flex-direction: column;
  }

  .center-center {
    align-content: center;
    align-items: center;
    justify-content: center;
  }
</style>
