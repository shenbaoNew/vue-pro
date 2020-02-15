<template>
  <div class="photoinfo-container">
    <h1>{{photoInfo.title}}</h1>
    <p class="subtitle">
      <span>发表时间:{{photoInfo.postTime|dateFormate}}</span>
      <span>点击:{{photoInfo.click}}次</span>
    </p>

    <hr />

    <!-- 缩略图 -->
    <div class="thumbs">
      <vue-preview :slides="list" class="imgPrev"></vue-preview>
    </div>

    <!-- 图片内容 -->
    <div class="content" v-html="photoInfo.memo"></div>

    <!-- 评论区域 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import Comment from "../subcomponents/Comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: { title: "" },
      list: [] //缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getSuoLueTuList();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("/api/getimageinfo/" + this.id).then(r => {
        if (r.body.status === "success") {
          this.photoInfo = r.body.data;
        }
      });
    },
    getSuoLueTuList() {
      this.$http.get("/api/getsuoluetulist/" + this.id).then(r => {
        if (r.body.status === "success") {
          r.body.data.forEach(c => {
            (c.w = 600), (c.h = 400);
          });
          this.list = r.body.data;
        }
      });
    },
    handleClose() {}
  },
  components: {
    "comment-box": Comment
  }
};
</script>

<style lang="scss">
.photoinfo-container {
  padding: 3px;
  h1 {
    color: #26f;
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
  }

  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    .imgPrev {
      .my-gallery {
        figure {
          display: inline-block;
          margin: 6px;
        }
        img {
          width: 80px;
          height: 60px;
        }
      }
    }
  }
}
</style>