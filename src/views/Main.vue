<template>
    <div class="main">
        <!-- 容器页面 -->
        <div class="header"></div>
       <!-- 设置导航入口 -->
       <div class="Router">
           <router-link to="/goods">商品</router-link>
           <router-link to="/evaluate">评价</router-link>
           <router-link to="/stores">商家</router-link>
       </div>
       <router-view></router-view>

       <!--购物车  -->
       <div class="shopCar">
            
       </div>
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  data() {
    return {

    };
  },
  created() {
    // 发送初始化请求
    getSeller().then(() => {
    });
  }
};
</script>

<style lang="less" scoped>
.main {
    .header{
        height: 80px;
    }
  .Router {
    display: flex;
    justify-content: space-around;
  }
  .shopCar {
    height: 60px;
    width: 100%;
    position: fixed; //脱离浏览器相当于绝对定位
    bottom: 0; //紧贴底边，相当于bottm为0；
    background-color: black;
  }
}
</style>