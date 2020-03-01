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
                <div v-for="child in item.foods" :key="child.id">
                 <div class="shop">
                  <div>
                   <img :src="child.icon" alt="" width="100">
                  </div>
                  <div class="right">
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
      curActive: 0 //设置当前选项卡中的索引
    };
  },
  created() {
    getGoods().then(v => {
      this.$store.commit('changeGood',v.data.data)
    });
  },
  mounted() {
    //   左侧滚动条
    new BScroll(document.querySelector(".leftGood"), {
      click: true //允许容器进行点击
    });

    // 右边滚动条
    this.rightDiv = new BScroll(document.querySelector(".rightGood"), {
      probeType: 3 //
    });
    // 参数右边滚动，左边选中对应的数据
    this.rightDiv.on('scroll', ({y})=>{
         for (let obj of this.getClick) {
           if(y>=obj.min && y<obj.max){
             this.curActive=obj.index
           }
         }
       
    }
    )
  },
  methods: {
    clicktitle(index) {
      // 点击选项卡，把新的索引保存起来
      this.curActive = index;
      // 左侧索引index，对应右侧DIV id
      this.rightDiv.scrollToElement(document.getElementById(index), 600); //用实例对象.要调用的函数
    }
  },
  // 计算属性：会进行运算结果缓存。他都是读取第一次运算玩的缓存结果
  // 计算属性是属性，所以没办法传值，计算属性必须有return返回
  computed: {
    // 计算
    getClick(){
      var total=0;
      var arr=[];
      for(let i=0;i<this.goodList.length;i++){
        var clickHeight=document.getElementById(i).offsetHeight
        // 把想要的数据放进去
        arr.push({min:total,max:total+clickHeight,index:i})
        total+=clickHeight; //循环一次加一次高度
      }
      console.log(arr);
       return arr
    },
    goodList(){
        return this.$store.state.goodList
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
    height: 400px;
    .shop {
      display: flex;
      height: 100px;
      background-color: rgb(255, 255, 255);
      img {
        margin-top: 10px;
      }
      .right {
        margin-left: 10px;
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