//入口文件
import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router"
import VueResource from "vue-resource"
import Moment from "moment"

Vue.use(VueRouter)
Vue.use(VueResource)

//导入样式
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

/* 为了显示懒加载Lazyload的小图标，不能按需导入，因为这样懒加载小图标显示不出来，需要全部导入
//按需导入mint UI 组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import router from "./router.js"
import store from "./store.js"

//定义全局过滤器
Vue.filter('dateFormate', function (datastr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return Moment(datastr).format(pattern);
})

new Vue({
  el: "#app",
  render: c => c(App),
  router,
  store //挂载状态管理对象
})