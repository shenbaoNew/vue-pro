<template>
  <div class="newsinfo-container">
    <h1 class="title">{{newsInfo.title}}</h1>
    <p class="subtitle">
      <span>发表时间:{{newsInfo.postTime|dateFormate}}</span>
      <span>点击次数:{{newsInfo.click}}次</span>
    </p>
    <hr />

    <div class="content" v-html="newsInfo.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {title:'',postTime:'',click:0,content:''}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("/api/getnewsinfo/" + this.id).then(r => {
        if (r.body.status === "success") {
          this.newsInfo = r.body.data[0];
        } else {
          Toast("获取新闻内容失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    margin: 10px 0px;
    color: red;
    text-align: center;
  }

  .subtitle {
    font-size: 14px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>