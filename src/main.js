//入口文件
import Vue from "vue"
import App from "./App.vue"

//导入样式
import "./lib/mui/css/mui.min.css"

//按需导入mint UI 组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header);

new Vue({
  el: "#app",
  render: c => c(App)
})