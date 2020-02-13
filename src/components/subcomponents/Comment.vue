<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入评论内容" v-model="comment"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in commentList" :key="item.id">
        <div
          class="cmt-title"
        >第{{i}}楼 &nbsp;&nbsp;用户:{{item.userName}}&nbsp;&nbsp;发表时间:{{item.postTime|dateFormate}}</div>
        <div class="cmt-body">{{item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      comment: ""
    };
  },
  props: ["id"],
  created() {
    this.getComments();
  },

  methods: {
    getComments() {
      this.$http
        .get("/api/getcommentlist/" + this.id + "?index=" + this.pageIndex)
        .then(r => {
          if (r.body.status === "success") {
            this.commentList = this.commentList.concat(r.body.data);
          } else {
            Toast("获取评论失败");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      if (this.comment.trim() == "") {
        Toast("请输入评论内容");
        return;
      }

      let commentObj = {
        content: this.comment,
        userName: "testuser",
        emulateJSON: true
      };
      this.$http.post(`/api/postcomment/${this.id}`, commentObj).then(r => {
        if (r.body.status === "success") {
          this.commentList.unshift(commentObj);
          console.log(this.commentList);
        } else {
          Toast("发表评论失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }

  textarea {
    font-size: 14px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;

    .cmt-item {
      font-size: 13px;
      .cmt-title {
        background-color: #cccccc;
        line-height: 30px;
      }

      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>