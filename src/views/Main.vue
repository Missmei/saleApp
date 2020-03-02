<template>
    <div class="main">
        <!-- 容器页面 -->
        <div class="header" :style="{backgroundImage:'url('+list.avatar+')'}">
          <img :src="list.avatar" alt="" width="80">
            <div class="translucent"></div>
          <div class="right">
            <p>
              <img src="../assets/imgs/brand.png" alt="" width='30'>
             {{list.name}}
            </p>
            <p><span>{{list.description}}</span><span>{{list.deliveryTime}}分钟送达</span></p>
            <p><img src="../assets/imgs/icon1.png" alt="" width="20">在线支付满28减5，满50减10</p>
          </div>
        </div>
       <!-- 设置导航入口 -->
       <div class="Router nav">
           <router-link to="/goods">商品</router-link>
           <router-link to="/evaluate">评价</router-link>
           <router-link to="/stores">商家</router-link>
       </div>
       <router-view></router-view>

       <!-- 购物车蒙版 -->
       <div class="shopBorder" v-show="shopCarshow">
         <div class="content">
           <ShopCar/>
         </div>
       </div>
       <!--购物车  -->
       <div class="shopCar" @click="shopCarshow=!shopCarshow">
            <div >
              <div >
                  <div class="icon">
                  <Icon type="ios-cart-outline" custom="i-icon" size="30" />
                  </div>
                  <span>￥0</span>
              </div>
            </div>
            <div >
               <p>另需配送费￥4元</p>
            </div>
            <div class="bg042 right">
              <span>￥20起送</span>
            </div>
       </div>
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
import ShopCar from "./ShopCar";
export default {
  components: {
    ShopCar: ShopCar
  },
  data() {
    return {
      list: [],
      shopCarshow: false //是否显示购物车板子
    };
  },
  created() {
    // 发送初始化请求
    getSeller().then(v => {
      this.list = v.data.data;
    });
  },
  computed: {
    goodList() {
      return this.$store.state.goodList;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  .header {
    height: 120px;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding: 20px;
    // filter: blur(3px);
    display: flex;
    color: black;
    position: relative;
    img {
      z-index: 100;
      margin-left: 20px;
    }
    .right {
      margin-left: 20px;
      margin-top: 10px;
      z-index: 100;
    }
    .translucent {
      background-color: rgba(255, 255, 255, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 120px;
    }
  }
  .Router {
    display: flex;
    justify-content: space-around;
  }
  .nav {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
  }
  .shopBorder {
    position: fixed;
    bottom: 60px;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(042, 053, 058, 0.5);
    z-index: 200;
    .content {
      height: 200px;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 15px;
      overflow: scroll;
    }
  }
  .shopCar {
    height: 60px;
    width: 100%;
    position: fixed; //脱离浏览器相当于绝对定位
    bottom: 0; //紧贴底边，相当于bottm为0；
    background-color: black;
    display: flex;
    color: #fff;
    justify-content: space-around;
    text-align: center;
    line-height: 60px;
    .icon {
      width: 50px;
      height: 50px;
      background-color: black;
      text-align: center;
      position: absolute;
      bottom: 22px;
      left: 26px;
      border-radius: 50%;
    }
    span {
      padding-left: 80px;
    }
    .right {
      padding-right: 30px;
    }
  }
}
.bg042 {
  background-color: rgb(042, 053, 058);
}
</style>