<template>
    <div class="stores">
      <!-- 商家名称 -->
       <div class="titel">
         <div class="titelTop">
          <div>
            <p> {{getStores.name}}</p>
            <span>
                 <img src="../assets/imgs/staryellow.png" alt="" width="20">
                 <img src="../assets/imgs/staryellow.png" alt="" width="20">
                 <img src="../assets/imgs/staryellow.png" alt="" width="20">
                 <img src="../assets/imgs/staryellow.png" alt="" width="20">
                 <img src="../assets/imgs/starwhite.png" alt="" width="20">
                 <span >(3.9)</span>
                 <span>月售{{getStores.sellCount}}单</span>
            </span>
           </div>
            <label for="">
              <img src="../assets/imgs/heart.svg" alt="" width="30" >
              <p>已收藏</p>
            </label>
         </div>
         <div>
           <div class="titleBotton">
             <div>
                <p>起送价</p>
                <p><span class="fs20">{{getStores.minPrice}}</span>元</p>
             </div>
             <div>
                <p>商家配送</p>
                <p><span class="fs20">{{getStores.deliveryPrice}}</span>元</p>
             </div>
             <div>
                <p>平均配送时间</p>
                <p><span class="fs20">{{getStores.deliveryTime}}</span>分钟</p>
             </div>
           </div>
         </div>
       </div>
       <!-- 公告与活动 -->
      <ul class="ad">
        <li class="adTop">
          <h3>公告与活动</h3>
          <p style="padding-left: 14px; color: red; line-height: 24px;">{{getStores.bulletin}}</p>
        </li>
        <li v-for="value in getStores.supports" :key="value.id" class="adLi">
          <img src="../assets/imgs/icon1.png" alt="" width="22">
          <span style=" vertical-align: top">{{ value.description }}</span>
        </li>
      </ul>
      <!-- 商家实景 -->
      <div class="bReality">
        <h3>商家实景</h3>
        <div class="picture">
        <div v-for="item in getStores.pics" :key="item.id" >
         <img :src="item" alt="" width="90" height="80">
        </div>
        </div>
      </div>
      <!-- 商家信息 -->
        <ul class="bInformation">
          <li><h3>商家信息</h3></li>
          <li v-for="item in getStores.infos" :key="item.id">
            {{ item }}
          </li>
        </ul>
      </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  created() {
    getSeller().then(v => {
      this.$store.commit("changeStores", v.data.data);
    });
  },
  computed: {
    getStores() {
      return this.$store.state.stores;
    }
  }
};
</script>

<style lang="less" scoped>
.stores {
  height: 500px;
  background-color: rgb(243, 246, 246);
  overflow: scroll;
  .titel {
    background-color: #fff;
    padding: 16px 16px 0 16px;
    border-top: 2px solid rgb(232, 232, 232);
    border-bottom: 2px solid rgb(232, 232, 232);
    .titelTop {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgb(232, 232, 232);
      padding-bottom: 10px;
      p:first-child {
        font-size: 18px;
        font-weight: 700;
        color: black;
        line-height: 40px;
      }
      label {
        text-align: center;
      }
    }
    .titleBotton {
      display: flex;
      justify-content: space-around;
      text-align: center;
      padding: 15px;
      div:not(:last-child) {
        border-right: 1px solid rgb(232, 232, 232);
        padding-right: 50px;
      }
    }
  }
  .ad {
    background-color: #fff;
    margin-top: 18px;
    border-top: 2px solid rgb(232, 232, 232);
    border-bottom: 2px solid rgb(232, 232, 232);
    padding: 16px;
    margin-bottom: 18px;
    .adTop {
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(232, 232, 232);
    }
    .adLi {
      padding-top: 10px;
    }
    .adLi:not(:last-child) {
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(232, 232, 232);
    }
  }
  .bReality {
    background-color: #fff;
    border-top: 2px solid rgb(232, 232, 232);
    padding: 16px;
    border-bottom: 2px solid rgb(232, 232, 232);
    margin-bottom: 18px;
    .picture {
      display: flex;
      div {
        margin-right: 10px;
        margin-top: 10px;
      }
    }
  }
  .bInformation {
    background-color: #fff;
    border-top: 2px solid rgb(232, 232, 232);
    padding: 16px;
    li{
      padding:14px 0 14px 0;
      border-bottom: 1px solid rgb(232, 232, 232);
    }
  }
}
.fs20 {
  font-size: 24px;
  color: black;
}
ul {
  list-style-type: none;
}
</style>