<template>
    <div>
       <h1>这是商家页面{{getStores}}</h1>
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
      console.log(this.$store.state.stores);
      return this.$store.state.stores;
    }
  }
};
</script>

<style lang="less" scoped>
</style>