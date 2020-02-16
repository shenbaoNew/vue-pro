<template>
  <div class = "goodsdesc-container">
    <div>
      <h3>{{goodsInfo.title}}</h3>
    </div>
    <hr>
    <div class="content" v-html = "goodsInfo.memo">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsInfo:{}
    };
  },
  created(){
    this.getGoodsInfo();
  },
  methods: {
    getGoodsInfo(){
      this.$http.get("/api/getdoosinfo/"+this.$route.params.id).then(r=>{
        if(r.body.status==="success"){
          this.goodsInfo = r.body.data;
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.goodsdesc-container{
  padding:4px;
  h3{
    font-size:16px;
    color:#226aff;
    text-align:center;
    margin:15px 0;
  }
}
</style>