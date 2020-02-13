<template>
  <div>
    <!-- 顶部区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0? 'mui-active':'' ]"
            v-for="item in cates"
            :key="item.id"
            @click="getImages(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link :to="'/home/photoinfo/' + item.id" v-for="item in list" :key="item.id" tag="li">
        <img v-lazy="item.imgUrl" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.memo}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      id: 0,
      cates: [],
      list: [] //图片列表
    };
  },
  created() {
    this.getAllCategory();
    this.getImages();
  },
  methods: {
    getAllCategory() {
      this.$http.get("/api/getimagecagetory").then(r => {
        if (r.body.status === "success") {
          r.body.data.unshift({
            id: 0,
            title: "全部"
          });
          this.cates = r.body.data;
        }
      });
    },
    getImages(id) {
      this.$http.get("/api/getimagelist/" + id).then(r => {
        if (r.body.status === "success") {
          this.list = r.body.data;
        }
      });
    }
  },
  mounted() {
    //这段代码要放在mounted里面，因为它要拿到这个元素 mui-scroll-wrapper
    //操作元素最好在mounted里面
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0px;
  li {
    img {
      width: 100%;
      vertical-align: middle;
    }

    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 6px #999;
    position: relative;

    .info {
      text-align: left;
      color: white;
      position: absolute;
      bottom: 0px;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 80px;

      .info-title {
        font-size: 14px;
      }

      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>