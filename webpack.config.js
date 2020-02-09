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
    open: true,
    port: 3000,
    contentBase: 'src',
    hot: true
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