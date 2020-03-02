import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/* 
// 使用
// 创建一个vuex的数据仓库，用来存放数据工具
// store：每个vuex最核心的部分，数据仓库
var store=new Vuex.Store({
    // 存放所有交互数据
    state:{
        name:'东东',
        
    },
    // mutation:改变。用来修改state的唯一方式
    mutations:{
        // 只有mutation里的小函数才可以直接改变state数据
        // 每一个motation都接收一个形参state,就指向上面的state
       changeName(state,i){
         state.name=i;
       }
    }
});
// mutation函数必须手动触发
// 参数1：要触发的mutation的名字，参数2：要传入的参数
store.commit("changeName","雅雅");  //触发一个mutation
// 取值：仓库实例.state.名字
console.log(store.state.name);
// 暴露
export default store;
 */




export default new Vuex.Store({
    // 存放所有交互数据
    state:{
        name:'东东',
        goodList:[],
        evlutate:[],
        stores:[],
    },
    // mutation:改变。用来修改state的唯一方式
    mutations:{
        // 只有mutation里的小函数才可以直接改变state数据
        // 每一个motation都接收一个形参state,就指向上面的state
       changeName(state,i){
         state.name=i;
       },
       changeGood(state,data){
           state.goodList=data;
       },
       changeEvlutate(state,data){
        state.evlutate=data;
       },
       changeStores(state,data){
        state.stores=data;
       },
    },

// mutation函数必须手动触发
// 参数1：要触发的mutation的名字，参数2：要传入的参数
// store.commit("changeName","雅雅");  //触发一个mutation
// 取值：仓库实例.state.名字
// console.log(store.state.name);

// vuex版的计算属性（和computed原理一样）getter是属于vuex,computed属于vue
    // 点击+

getters:{
    // 购物车列表
    shopList(state){
      var arr=[];
      for (let i of state.goodList) {
          i.foods.map((v)=>{
              if(v.num>0 && v.num!=0){
                  arr.push({name:v.name, count:v.num, price:v.price})
              }
          })
          return arr;
      }
   }
}
});