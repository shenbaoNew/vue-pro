import VueRouter from 'vue-router'
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import NewsList from "./components/news/NewsList.vue"
import NewsContent from "./components/news/NewsContent.vue"
import PhotoList from "./components/photos/PhotoList.vue"
import Photoinfo from "./components/photos/Photoinfo.vue"
import GoodsList from "./components/goods/GoodsList.vue"

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
    },
    {
      path: '/home/newslist/:id', component: NewsContent
    }, {
      path: '/home/photolist', component: PhotoList
    }, {
      path: '/home/photoinfo/:id', component: Photoinfo
    }, {
      path: '/home/goodslist', component: GoodsList
    }
  ],
  linkActiveClass: 'mui-active'
})

export default router