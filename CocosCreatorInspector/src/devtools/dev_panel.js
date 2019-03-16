import Vue from 'vue';
import dev_panel from './dev_panel.vue';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);


new Vue({
  el: '#app',
  render: h => h(dev_panel)
});
