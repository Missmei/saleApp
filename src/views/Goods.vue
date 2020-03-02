<template>
    <div class="good">
        <!-- 左侧div -->
        <div class="leftGood">
            <ul class="content">
                <div  v-for="(item,index) in goodList" :key="item.name"
                 @click="clicktitle(index)"
                 :class="{leftList:true, active:index==curActive }"
                >
                 <img style="width:12px" v-show='item.type==1' src="../assets/imgs/icon2.png" >
                 <img style="width:12px" v-show='item.type==2' src="../assets/imgs/icon1.png" >
                <span>{{ item.name }}</span>
                </div>
            </ul>
        </div>
        <!-- 右侧div -->
        <div class="rightGood">
            <ul class="content">
              <div :id='index' v-for="(item,index) in goodList" :key="item.name">
                <p style="font-size:18px;line-height:40px; margin-left:10px; ">{{item.name}}</p>
                <div v-for="(child,i) in item.foods" :key="i">
                 <div class="shop">
                  <div>
                   <img :src="child.icon" alt="" width="100">
                  </div>
                  <div class="right">
                      <p class="nameRight">{{child.name}}</p>
                      <p>{{child.description}}</p>
                      <p>月销量{{child.sellCount}}份 好评率100%</p>
                      <p><span class="colorRed">￥{{child.price}}</span> <span class="line" v-show="child.oldPrice ? child.oldPrice: false">￥{{child.oldPrice}}</span>
                      </p>
                      <div class="btnRight">
                        <span v-show="child.num>0 ? child.num: false" @click="clickDec(child.name)">-</span>
                        <span v-show="child.num>0 ? child.num: false" >{{child.num}}</span>
                        <span @click="clickAdd(child.name)">+</span>
                      </div>
                  </div>
                </div>
                </div>
             </div>
            </ul>
        </div>
    </div>
</template>

<script>
import { getGoods } from "../api/apis.js";
import BScroll from "better-scroll"; //引入BetterScroll滚动插件
export default {
  data() {
    return {
      curActive: 0 //设置当前选项卡中的索引
    };
  },
  created() {
    getGoods().then(v => {
      this.$store.commit("changeGood", v.data.data);
    });
  },
  mounted() {
    //   左侧滚动条
    new BScroll(document.querySelector(".leftGood"), {
      click: true //允许容器进行点击
    });

    // 右边滚动条
    this.rightDiv = new BScroll(document.querySelector(".rightGood"), {
      click: true, //允许容器进行点击
      probeType: 3 //
    });
    // 参数右边滚动，左边选中对应的数据
    this.rightDiv.on("scroll", ({ y }) => {
      for (let obj of this.getClick) {
        if (y >= obj.min && y < obj.max) {
          this.curActive = obj.index;
          return; //结束剩下的所有循环
        }
      }
    });
  },
  methods: {
    // 左右联动
    clicktitle(index) {
      //index:当前点击的索引
      this.curActive = index;
      //让右侧滚动起来 querySelector不支持数字字符串ID
      //   this.rightDiv.scrollToElement(document.querySelector('#4'))  //用实例对象.要调用的函数
      // 左侧索引index，对应右侧DIV id
      this.rightDiv.scrollToElement(document.getElementById(index), 600); //用实例对象.要调用的函数
    },
    /*     for(循环大的数组){
  for(循环每一个child数组){
  if(商品.name == 传入的name){
  商品.num += 1 || -1
  }
  }
  } */
    // 商品数量—
    clickDec(name) {
      for (let i of this.goodList) {
        for (let j of i.foods) {
          if (j.name == name) {
            j.num -= 1;
          }
        }
      }
    },
    // 商品数量+
    clickAdd(name) {
      for (let i of this.goodList) {
        for (let j of i.foods) {
          if (j.name == name) {
            j.num += 1;
          }
        }
      }
    }
  },
  // 计算属性：会进行运算结果缓存。他都是读取第一次运算玩的缓存结果
  // 计算属性是属性，所以没办法传值，计算属性必须有return返回
  computed: {
    // 计算
    getClick() {
      var total = 0;
      var arr = [];
      for (let i = 0; i < this.goodList.length; i++) {
        var clickHeight = document.getElementById(i).offsetHeight;
        // 把想要的数据放进去
        arr.push({ min: total, max: total + clickHeight, index: i });
        total += clickHeight; //循环一次加一次高度
      }
      // console.log(arr);
      return arr;
    },
    goodList() {
      return this.$store.state.goodList;
    }
  }
};
</script>

<style lang="less" scoped>
.good {
  display: flex;
  height: 500px;
  .leftGood {
    width: 80px;
    background-color: rgba(244, 247, 245);
    overflow: scroll;
    height: 400px;
    .leftList {
      margin: 0 8px;
      align-items: center;
      border-bottom: 1px solid #ccc;
      height: 60px;
    }
  }
  .rightGood {
    background-color: rgb(243, 246, 246);
    flex: 1;
    overflow: scroll;
    .shop {
      display: flex;
      background-color: rgb(255, 255, 255);
      padding: 10px;
      position: relative;
      img {
        margin-top: 10px;
      }
      .right {
        margin-left: 10px;
        .nameRight {
          font-size: 18px;
          font-weight: bold;
          color: black;
        }
        .btnRight {
          position: absolute;
          right: 12px;
          bottom: 10px;
          span:nth-child(2n + 1) {
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 18px;
            border: 1px solid rgb(000,161,220);
            text-align: center;
            line-height: 16px;
          }
          span:nth-child(2) {
            width: 40px;
            display: inline-block;
            text-align: center;
          }
           span:nth-child(3) {
            background-color: rgb(000,161,220);
            color: #fff;
          }
        }
      }
    }
  }
}
.colorRed {
  color: rgb(250, 071, 077);
  font-size: 18px;
  font-weight: bold;
}
.line {
  text-decoration: line-through;
}
html,
body,
#app,
.main,
.good,
.leftGood,
.rightGood {
  height: 600px;
}
</style>