import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css'
import store from "./store/index.js"

Vue.config.productionTip = false
// 全局注册ViewUi内所有组件，让所有主键都可以直接使用此UI框架的组件
Vue.use(ViewUI);

// 把store注入到vue实例中
// 注入的所有key不能修改，大小写也不能修改，有特殊的意义
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
