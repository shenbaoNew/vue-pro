<template>
  <div class="goods-list">
    <router-link
      class="goods-item"
      v-for="item in list"
      :key="item.id"
      :to="'/home/goodsinfo/' + item.id"
      tag="div"
    >
      <img :src="item.imgUrl" />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="new">{{item.price}}</span>
          <span class="old">{{item.oldPrice}}</span>
        </p>
        <p class="sales">
          <span>{{item.memo}}</span>
          <span>剩余{{item.stockQty}}件</span>
        </p>
      </div>
    </router-link>

    <mt-button type="danger" size="large" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1
    };
  },
  created() {
    this.getGoodsInfo();
  },
  methods: {
    getGoodsInfo() {
      this.$http.get("/api/getgoodslist?index=" + this.pageIndex).then(r => {
        if (r.body.status === "success") {
          this.list = this.list.concat(r.body.data);
        }
      });
    },
    loadMore() {
      this.pageIndex++;
      this.getGoodsInfo();
    },
    goDetail(id) {
      //采用js的方式实现跳转（除了通过router-link）
      //this.$router.push("home")
      this.$router.push("/home/goodsinfo/" + id); //使用div标签然后绑定click事件，依然可以这样跳转
      this.$router.push({ name: "goodsinfo", params: { id } });
      //这里要区分开$route(里面有params和query)和$router(实现导航跳转(push,前进，后退))
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    box-shadow: 0 0 8px #ccc;
    border: 1px solid #ccc;
    width: 49%;
    margin: 3px 0;
    padding: 2px;
    display: flex; //按Y方向两端对齐
    flex-direction: column; //按Y方向两端对齐
    justify-content: space-between; //按Y方向两端对齐
    min-height: 196px;

    img {
      width: 100%;
    }

    .title {
      font-size: 14px;
    }

    .info {
      p {
        margin: 0px;
        padding: 2px;
      }
      background-color: #eee;
      .price {
        .new {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .sales {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>