const path = require('path');
const webpack = require('webpack')
//导入在内存中生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    host: '192.168.17.150',
    open: true,
    port: 3000,
    contentBase: 'src',
    hot: true,
    //添加代理设置
    proxy: {
      //匹配代理的url
      '/api': {
        // 目标服务器地址
        //不可用：http://vue.studyit.io
        //可用：http://www.liulongbin.top:3005
        //自己搭建的node：http://localhost:3080/api/getlunbo
        //自己搭建额asp.net.core web api: http://localhost:5000/api/getlunbo
        target: 'http://localhost:5000',
        //路径重写
        //如果请求路径为 api/art/1 ,就会转换成 http://localhost/art/1
        //pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({//传递一个配置对象
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new VueLoaderPlugin()
  ],
  module: {//所有的第三方模块
    rules: [  //匹配规则
      {
        test: /\.css$/,  //正则表达式匹配文件
        use: ['style-loader', 'css-loader']   //匹配成功之后用哪个加载器来处理
      },
      {
        test: /\.less$/,  //正则表达式匹配文件
        use: ['style-loader', 'css-loader', 'less-loader']   //匹配成功之后用哪个加载器来处理
      },
      {
        test: /\.scss$/,  //正则表达式匹配文件
        use: ['style-loader', 'css-loader', 'sass-loader']   //匹配成功之后用哪个加载器来处理
      },
      {
        test: /\.(jpg|png|bmp|gif|jpeg)$/,  //正则表达式匹配文件
        use: 'url-loader?limit=36347'  //匹配成功之后用哪个加载器来处理
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,  //正则表达式匹配文件
        use: 'url-loader'  //匹配成功之后用哪个加载器来处理
      }, {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }, {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  resolve: {
    alias: {
      // "vue$": "vue/dist/vue.esm.js"
    }
  }
}