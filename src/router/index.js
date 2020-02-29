import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'Main', component: Main,
    children: [{
      // 评价二级页面
      path: '/evaluate', name: 'evaluate', component: () => import('../views/Evaluate.vue')
    },
    {
      // 商品二级页面
      path: '/goods', name: 'goods',component: () => import('../views/Goods.vue')
    }, {
      // 商家二级页面
      path: '/stores',   name: 'stores',   component: () => import('../views/Stores.vue')
    }]
  },

]

const router = new VueRouter({
  routes
})

export default router
