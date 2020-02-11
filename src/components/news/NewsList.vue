<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newslist/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.imgUrl" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.time | dateFormate}}</span>
              <span>点击次数:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get("/api/getnewslist").then(r => {
        if (r.body.status === "success") {
          this.newsList = r.body.data;
        } else {
          Toast("获取新闻资讯失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }

    .mui-ellipsis {
      font-size: 12px;
      color: #22ff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>