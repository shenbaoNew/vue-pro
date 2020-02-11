import VueRouter from 'vue-router'
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import NewsList from "./components/news/NewsList.vue"

let router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home', component: HomeContainer,
    }, {
      path: '/search', component: SearchContainer
    }, {
      path: '/member', component: MemberContainer
    }, {
      path: '/shopcar', component: ShopcarContainer
    },
    {
      path: '/home/newslist', component: NewsList
    }
  ],
  linkActiveClass: 'mui-active'
})

export default router