<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe-box :lunbotuList="lunbotuList" :widthfull="false"></swipe-box>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>{{goodsInfo.price}}</del>&nbsp;&nbsp;销售价:
            <span class="nowprice">{{goodsInfo.oldPrice}}</span>
          </p>
          <p>
            购买数量：
            <number-box></number-box>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goodsno}}</p>
          <p>库存情况：{{goodsInfo.stockQty}}个</p>
          <p>上架时间：{{goodsInfo.postTime|dateFormate}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc()">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment()">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Lunbotu from "../subcomponents/Lunbotu.vue";
import GoodsInfoNumberBox from "../subcomponents/GoodsInfoNumberBox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [],
      goodsInfo: {},
      ballFlag:false
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      //http://www.liulongbin.top:3005/api/getlunbo
      this.$http.get("/api/getsuoluetulist/" + this.id).then(r => {
        if (r.body.status === "success") {
          r.body.data.forEach(c => (c.img = c.src));
          this.lunbotuList = r.body.data;
        } else {
          Toast("获取轮播图失败");
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("/api/getdoosinfo/" + this.id).then(r => {
        if (r.body.status === "success") {
          this.goodsInfo = r.body.data;
        }
      });
    },
    goDesc() {
      //使用编程式导航
      this.$router.push({ name: "goodsdesc", params: { id: this.id } });
    },
    goComment() {
      //
      this.$router.push({ name: "goodscomment", params: { id: this.id } });
    },
    addToCar(){
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el,){
      el.style.transform = "translate(0,0)"  //位移的起点 (0,0)就是原来初始的位置
    },
    enter(el,done){
      el.offsetWidth;
      //el.style.transform = 'translate(89px, 230px)'  //位移的终点（这个位移最好不要写死，因为不同分辨率可能位置不一样）
      //获取小球在页面中对的位置
      const ball = this.$refs.ball.getBoundingClientRect();  //小球的位置
      const badge = document.getElementById("badge").getBoundingClientRect(); //徽标的位置
      let flexX = badge.left - ball.left;
      let flexY = badge.top - ball.top;
      el.style.transform = `translate(${flexX}px, ${flexY}px)`;
      el.style.transition= "all 0.6s cubic-bezier(.4,-0.3,1,.68)";
      done();
    } ,
    afterEnter(el){
      this.ballFlag = !this.ballFlag;
    }
  },
  components: {
    "swipe-box": Lunbotu,
    "number-box": GoodsInfoNumberBox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .nowprice {
    color: red;
    font-size: 15px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 150px;
  }
}
</style>