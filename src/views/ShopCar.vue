<template>
  <div>
    <div class="shopcar">
      <p>购物车</p>
      <p @click="del()">清空购物车</p>
    </div>
    <div class="carbox">
      <div class="goodscar">
        <div v-for="(item,index) in goodList" :key="index">
          <div class="goodscar1" v-for="(obj,i) in item.foods" :key="i" v-show="obj.num!==0">
            <div class="left">
              <p>{{obj.name}}</p>
              <p>{{obj.description}}</p>
            </div>
            <div class="rigth">
              <p>￥{{obj.num*obj.price}}</p>
              <button @click="subtract(index,i,-1)">-</button>
              <span>{{obj.num}}</span>
              <button @click="subtract(index,i,1)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 加减
    subtract(index, i, val) {
      this.$store.state.goodList[index].foods[i].num += val;
    },
    del() {
      this.$store.state.goodList.map(v => v.foods.map(a => (a.num = 0)));
    }
  },
  computed: {
    goodList() {
      return this.$store.state.goodList;
    }
  }
};
</script>

<style lang="less" scoped>
.shopcar {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f4f4f4;
}
.carbox {
  height: 260px;
  padding: 0 20px;
  overflow: scroll;
  .goodscar {
    .goodscar1 {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e7e7e7;
      padding: 10px 0;
      .left {
        p:nth-child(1) {
          font-size: 16px;
        }
        p:nth-child(2) {
          font-size: 12px;
        }
      }
      .rigth {
        display: flex;
        align-items: center;
        p {
          margin-right: 10px;
          color: #fc6f67;
          font-size: 16px;
        }
        button {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 0;
          outline: none;
          background: #00a0dc;
          color: #fff;
          font-size: 22px;
          text-align: center;
          line-height: 24px;
        }
        span {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>