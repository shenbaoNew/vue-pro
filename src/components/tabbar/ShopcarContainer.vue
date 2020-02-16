<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="(item,i) in shopCars" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.totalCarObjectSelect[item.id]"
              @change="selectChanged(item.id,$store.getters.totalCarObjectSelect[item.id])"
            ></mt-switch>
            <img :src="item.imgUrl" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">{{item.price}}</span>
                <number-box :initCount="$store.getters.totalCarObject[item.id]" :id="item.id"></number-box>
                <a @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner pay">
            <div class="left">
              <p>总结(不含运费)</p>
              <p>
                已购买商品
                <span class="price">{{$store.getters.selectCarCountAndAmount.count}}</span> 件, 总价
                <span class="money">{{$store.getters.selectCarCountAndAmount.amount}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopCarNumberBox from "../subcomponents/ShopCarNumberBox.vue";
export default {
  data() {
    return {
      shopCars: []
    };
  },
  created() {
    this.getShapCarList();
  },
  methods: {
    getShapCarList() {
      var ids = [];
      this.$store.state.cars.forEach(item => ids.push(item.id));
      if (ids.length <= 0) {
        return;
      }

      this.$http.get("/api/getshopcarlist/" + ids.join(",")).then(r => {
        if (r.body.status === "success") {
          this.shopCars = r.body.data;
        }
      });
    },
    remove(id, i) {
      this.shopCars.splice(i, 1);
      this.$store.commit("removeCar", id);
    },
    selectChanged(id, select) {
      this.$store.commit("updateCarStatus", { id, select });
    }
  },
  components: {
    "number-box": ShopCarNumberBox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background: #eee;
  overflow: hidden;

  .goods-list {
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }

    .info {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .price {
        color: red;
        font-weight: bold;
      }
    }

    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }

    .pay {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price,
      .money {
        color: red;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>