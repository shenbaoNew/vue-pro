<template>
  <div class="goods-list">
    <div class="goods-item">
      <img src="http://n.sinaimg.cn/news/518/w311h207/20200103/87fa-imrkkfx1541172.jpg" alt />
      <h1 class="title">古典美女</h1>
      <div class="info">
        <p class="price">
          <span class="new">999</span>
          <span class="old">1099</span>
        </p>
        <p class="sales">
          <span>热卖中</span>
          <span>剩余20件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img src="http://n.sinaimg.cn/news/518/w311h207/20200103/87fa-imrkkfx1541172.jpg" alt />
      <h1 class="title">古典美女古典美女古典美女古典美女古典美女</h1>
      <div class="info">
        <p class="price">
          <span class="new">999</span>
          <span class="old">1099</span>
        </p>
        <p class="sales">
          <span>热卖中</span>
          <span>剩余20件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img src="http://n.sinaimg.cn/news/518/w311h207/20200103/87fa-imrkkfx1541172.jpg" alt />
      <h1 class="title">古典美女</h1>
      <div class="info">
        <p class="price">
          <span class="new">999</span>
          <span class="old">1099</span>
        </p>
        <p class="sales">
          <span>热卖中</span>
          <span>剩余20件</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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