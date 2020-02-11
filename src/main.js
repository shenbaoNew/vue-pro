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

//按需导入mint UI 组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

import router from "./router.js"

//定义全局过滤器
Vue.filter('dateFormate', function (datastr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return Moment(datastr).format(pattern);
})

new Vue({
  el: "#app",
  render: c => c(App),
  router
})