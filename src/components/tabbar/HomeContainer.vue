<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>
    <h3>HomeContainer</h3>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      //http://www.liulongbin.top:3005/api/getlunbo
      this.$http.get("/api/getlunbo").then(r => {
        if (r.body.status === 0) {
          this.lunbotuList = r.body.message;
        } else {
          Toast("获取轮播图失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    img{
      height:100%;
      width:100%
    }
  }
}
</style>