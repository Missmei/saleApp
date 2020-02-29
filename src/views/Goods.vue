<template>
    <div class="good">
        <!-- 左侧div -->
        <div class="leftGood">
            <ul class="content">
                <div  v-for="(item,index) in list" :key="item.name"
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
              <div :id='index' v-for="(item,index) in list" :key="item.name">
                <p style="font-size:18px;line-height:60px; margin-left:10px; margin-top:10px">{{item.name}}</p>
                <div v-for="child in item.foods" :key="child.id">
                 <div class="shop">
                  <div>
                   <img :src="child.icon" alt="" width="100">
                  </div>
                  <div>
                      <p>{{child.name}}</p>
                      <p>{{child.description}}</p>
                      <p>月销量{{child.sellCount}}份 好评率100%</p>
                      <p><span>￥{{child.price}}</span> <span>￥{{child.oldPrice}}</span>
                      </p>
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
      list: [], //数组
      curActive: 0 //设置当前选项卡中的索引
    };
  },
  created() {
    getGoods().then(v => {
      this.list = v.data.data;
    });
  },
  mounted() {
    //   左侧滚动条
    new BScroll(document.querySelector(".leftGood"), {
      click: true //允许容器进行点击
    });

    // 右边滚动条
    this.rightDiv = new BScroll(document.querySelector(".rightGood"));
  },
  methods: {
    clicktitle(index) {
      // 点击选项卡，把新的索引保存起来
      this.curActive = index;
      // 左侧索引index，对应右侧DIV id
      this.rightDiv.scrollToElement(document.getElementById(index), 600); //用实例对象.要调用的函数
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
    flex: 1;
    overflow: scroll;
    .shop {
      display: flex;
      height: 100px;
      background-color: rgb(255, 255, 255);
      img {
        margin-top: 10px;
      }
    }
  }
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