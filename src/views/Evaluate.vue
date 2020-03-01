<template>
    <div class="evalutate">
      <!-- 综合评论 -->
        <div class="top">
           <div class="left">
             <p style="color:rgb(249,182,091); font-size:28px">3.9{{getEvlutate.score}}</p>
             <p style="font-size:14px;   line-height: 26px;font-weight: 700" >综合评分</p>
             <p style="font-size:12px;">高于周边商家67.5%</p>
           </div>
           <div class="right">
             <p>服务态度
               <span>
                 <img src="../assets/imgs/staryellow.png" alt="">
                 <img src="../assets/imgs/staryellow.png" alt="">
                 <img src="../assets/imgs/staryellow.png" alt="">
                 <img src="../assets/imgs/staryellow.png" alt="">
                 <img src="../assets/imgs/starwhite.png" alt="">
                 <span style="color:rgb(249,182,091);">3.9</span>
               </span>
             </p>
             <p>服务态度
                <span>
                 <img src="../assets/imgs/staryellow.png" alt="">
                 <img src="../assets/imgs/staryellow.png" alt="">
                 <img src="../assets/imgs/staryellow.png" alt="">
                 <img src="../assets/imgs/staryellow.png" alt="">
                 <img src="../assets/imgs/starwhite.png" alt="">
                 <span style="color:rgb(249,182,091);">4.0</span>
               </span>
             </p>
             <p>送达时间 <span style="font-weight:normal">44分钟</span></p>
           </div>
        </div>
        <!-- 中间数据 -->
        <div class="center">
          <!-- 评价按钮 -->
          <div class="buttonAll">
             <Button type="primary">全部57</Button>
             <Button type="info">满意47</Button>
             <Button  style="background:rgb(233,236,236)">不满意10</Button>
          </div>
          <p class="check">
            <img src="../assets/imgs/checkTrue.svg" alt="" width="24" >
            <span>只看内容的评价</span>
          </p>
        </div>
        <!-- 底部评论 -->
        <div class="botton">
          <div v-for="item in getEvlutate" :key="item.id" class="bottonEvaluate">
           <div class="topData">
               <div class="subData">
                <img :src="item.avatar" alt="" width=36 >
                    <span class="uaername">{{item.username}}</span>
                    <span class="Span">  
                      <span>
                        <img src="../assets/imgs/staryellow.png" alt="" width="18">
                        <img src="../assets/imgs/staryellow.png" alt="" width="18">
                        <img src="../assets/imgs/staryellow.png" alt="" width="18">
                        <img src="../assets/imgs/staryellow.png" alt="" width="18">
                        <img src="../assets/imgs/starwhite.png" alt="" width="18"> 
                        <span style="color:rgb(249,182,091);">3.9</span>
                      </span>
                      <span>{{item.deliveryTime}}送达</span>
                   </span> 
            </div>
            <div class="date">{{ item.rateTime| formatDate}}</div>
           </div>
            <p class="text">{{item.text}}</p>
            <p>
              <Icon type="ios-thumbs-up-outline" size="26"/>
              <span v-for="value in item.recommend" :key="value.id" class="special">
                  {{value}}
              </span>
            </p>
          </div>
        </div>
    </div>
</template>

<script>
import { getRatings } from "../api/apis.js";
import { formatDate } from "../utils/formatDate.js";
export default {
  created() {
    // 每个组件this.$store都指向的是main.js中注入的store
    getRatings().then(v => {
      this.$store.commit("changeEvlutate", v.data.data);
    });
  },
  // 获取vuex的值，统一使用计算属性
  // 不要把vuex的值保存在自己的data内!因为他是一个独立的数据存在
  computed: {
    getEvlutate() {
      console.log(this.$store.state.evlutate);
      return this.$store.state.evlutate;
    }
  },
  // 过滤
  filters: {
    //方法一: yyyy-MM-dd hh:mm
    formatDate(time) {
      time = time * 1000;
      let date = new Date(time);
      // console.log(new Date(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style lang="less" scoped>
.evalutate {
  background-color: rgb(243, 246, 246);
  .top {
    height: 110px;
    width: 100%;
    display: flex;
    padding: 10px;
    border-top: 2px solid rgb(239, 239, 239);
    border-bottom: 2px solid rgb(239, 239, 239);
    background-color: #fff;
    margin-bottom: 12px;
    .left {
      flex: 3;
      text-align: center;
    }
    .right {
      flex: 5;
      padding-left: 20px;
      border-left: 1px solid rgb(239, 239, 239);
      p {
        font-size: 16px;
        line-height: 32px;
        font-weight: 700;
        span {
          margin-left: 10px;
          img {
            width: 15px;
          }
        }
      }
    }
  }
  .center {
    height: 110px;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    border-top: 2px solid rgb(239, 239, 239);
    border-bottom: 2px solid rgb(239, 239, 239);
    .buttonAll {
      padding-bottom: 14px;
      border-bottom: 1px solid rgb(239, 239, 239);
      button {
        margin-right: 10px;
        height: 32px;
      }
    }
    .check {
      margin-top: 10px;
      color: rgb(169, 172, 174);
      font-size: 16px;
      span {
        vertical-align: top;
      }
    }
  }
  .botton {
    background-color: #fff;
    height: 280px;
    width: 100%;
    overflow: scroll;
    padding:0 20px 20px 20px;
    .bottonEvaluate {
      border-bottom: 1px solid rgb(239, 239, 239);
      padding-bottom: 10px;
      padding-top: 10px;
      .topData {
        display: flex;
        img {
          border-radius: 20px;
        }
        .uaername {
          vertical-align: top;
          font-size: 16px;
        }
        .Span {
          vertical-align: bottom;
          height: 20px;
          display: inline-block;
        }
      }
    }
    .text {
      line-height: 26px;
      padding-left: 30px;
      font-weight: 700;
    }
    .special {
      display:inline-block ;
      width: 60px;
      border: 1px solid rgb(243, 246, 246);
      padding: 2px;
      margin-right: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      text-align: center;
      color: rgb(190,197,197);
      margin-top: 8px;
    }
  }
}
</style>