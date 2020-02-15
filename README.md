# Vue测试项目
  ## 第一个项目
  ### 用到了MUI

  ## 首页APP组件
  ### 1.Header区域使用Mint-UI
  ### 2.底部的tab用到了MUI
  + 使用第三方页面时，我们可以根据源代码中的link，找到使用的css样式的路径，从而正确引用（例如MUI中的购物车的小图标）

  ## 改造底部连接为router-link
  + 同时调整点击时的高亮显示

  ## 新建tab对应的路由组件
  ### 首页组件
  + 制作轮播图 涉及到了scss语句 （比如交集选择器）
  + 轮播图获取aip数据
  + Content区域六宫格改造
  + tab切换时添加动画效果
  + 改造首页新闻智讯链接
  #### 首页新闻资讯
  + 使用MUI的media-list.html功能
  + 新闻内容页面
  + 完成新闻资讯评论加载功能
  + 完成新闻资讯发表评论的功能
  #### 首页图片分享
  + 改造图片分享链接
  1. 制作顶部滑动块 借助mui的tab-top-webview-main.html
  1.1 （去掉顶部的 mui-fullscreen样式取消全屏）
  1.2 这是个js组件需要引用mui的js文件，作初始化
  、、、
  mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  、、、
  要用这段代码需要取消严格模式
  步骤：
  a:cnpm i babel-plugin-transform-remove-strict-mode -D
  b:babel配置plugins节点增加："transform-remove-strict-mode"
  1.3 页面刚进来时滑块无法滑动
    a.需要将前面初始化的代码写在mounted里面
    b.还需要将app.vue中下面tabbar中mui-tab-item的样式拷贝处理到.vue文件中，并修改类的名称，并将router-link中的样式该成这个名字
  2. 获取图片分类
  3. 制作图片列表
    a.制作图片列表链接时，需要tag属性
  4. 制作图表详情页面
    a.制作缩略图功能 使用vue-preview插件
    这里遇到了小图显示异常的问题 ，需要添加一段样式 
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
    并且要把scoped去掉
  #### 首页商品列表
    1. 绘制商品列表页面
  ### 会员组件
  ### 购物车组件
  ### 搜索组件