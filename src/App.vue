<template>
  <div class="app-container">
    <!-- 顶部区域 -->
    <mt-header fixed title="固定在顶部">
      <span slot="left" @click="goBack" v-show="showBack">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- 中间路由区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部切换tab区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item-sb" href="#tabbar">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="member" class="mui-tab-item-sb" href="#tabbar-with-chat">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="shopcar" class="mui-tab-item-sb" href="#tabbar-with-contact">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.totalCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="search" class="mui-tab-item-sb" href="#tabbar-with-map">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBack: false
    };
  },
  created() {
    this.showBack = this.$route.path === "/home" ? false : true;
  },
  watch: {
    "$route.path": function(value) {
      if (value == "/home") {
        this.showBack = false;
      } else {
        this.showBack = true;
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden; //解决横向出现滚动条的问题
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

//改类名解决点击无法执行链接的问题
.mui-bar-tab .mui-tab-item-sb.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-sb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-sb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-sb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mint-header {
  z-index: 99;
}
</style>