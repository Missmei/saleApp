import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false
// 全局注册ViewUi内所有组件，让所有主键都可以直接使用此UI框架的组件
Vue.use(ViewUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
