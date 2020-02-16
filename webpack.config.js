// 配置
var conf = {
  // 前端测试模式下的端口
  dev_port: 1010,

  // 本地后台1011 打包后/测试时 被代理的端口
  api_port: 1011,
};


// 需求：
var one = {

  // ****约定：该模块下，dev引用和build的输出 目录名称：
  // 入口HTML JS ：index;

  imgs_dir: 'imgs',
  fonts_dir: 'fonts',
  // 约定：异步引入的第三方JS文件的标识 
  third: "third",
};


// 配置项
var opts = {
  // dev模式下，源文件夹名称；
  src: "src_webapp",

  // 依赖文件的目录名称，需要复制，这个功能还没有做
  copy: "scripts",

  // 打包的目录名称
  dist: 'webapp',
};



// --------------------------------------------------------------------
var path = require('path');
var webpack = require('webpack');
//  寻找HTML模板
var HtmlWebpackPlugin = require('html-webpack-plugin');
//  清除目录下的
var CleanPlugin = require('clean-webpack-plugin');
// 分离公共CSS
var ExtractTextPlugin = require('extract-text-webpack-plugin');


// ------------------------------------------用于复制文件，无论是什么模式
var fs = require('fs-extra');

// 页面引入的文件的复制
fs.copy(
    path.resolve(__dirname, opts.src, opts.copy),
    path.resolve(__dirname, opts.dist, opts.copy))
  .then(function() {
    console.log(`\n`);
    console.log(`\n ${opts.src}/${opts.copy} 所有文件复制成功`);
    console.log(`\n`);
  });





var dev = {
  // JS 源文件地址
  entry: path.resolve(__dirname, opts.src, 'index.js'),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, opts.src, "index.html"), // 模版文件
    }),
  ],
  devServer: {
    port: conf.dev_port,
    contentBase: path.resolve(__dirname, opts.src), // 静态资源 图片等
    historyApiFallback: true, // 静态资源目录
    hot: false,
    inline: true, // cli 模式，内联模式
    noInfo: true,
    proxy: {
      "/api": 'http://localhost:' + conf.api_port,
    }
  },
  module: {
    rules: [
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|async)/,
        query: {
          babelrc: false,
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      //
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      // fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
      },
      // img
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      }
    ]
  },
  devtool: '#source-map',
};



var build = {
  // mode: "production",
  // JS 源文件地址
  entry: {
    // 公共文件？
    // vue: ['vue'],
    // vueRouter: ['vue-router'],
    // axios: ['axios'],
    // vuex: ['vuex'],
    vender: ['vue', 'vue-router', 'axios', 'vuex', 'element-ui'],

    // 主入口JS
    index: path.resolve(__dirname, opts.src, "index.js"),
  },
  // 输出
  output: {
    // 页面模块 打包输出的根目录
    path: path.resolve(__dirname, opts.dist),

    // index.js 输出名称 这里只能写name，因为上面有多入口了；
    filename: '[name].[chunkhash:6].js',

    // 给require.ensure异步加载文件 输出名称
    chunkFilename: 'async_[name].[chunkhash:4].js',

    // 4. HTML内引用 的前缀设置，慎用！
    // publicPath: '/dist/', 
  },
  plugins: [
    // ------------------------------------公共代码
    // 公共JS代码：
    new webpack.optimize.CommonsChunkPlugin({
      // 寻找数组中每个入口的公共名字进行提取
      // name: ['vue', "vueRouter", "axios", "vuex", "ele_ui"],
      name: ["vender"],
      // 控制输出地址和名字设置 ，这里不需要配置；上面配置就行了。
      // filename: '[name].[chunkhash:7].js',
      minChunks: Infinity,
    }),
    // 公共CSS代码 分离
    new ExtractTextPlugin('[name].[chunkhash:6].css'),

    // ------------------------------------HTML
    new HtmlWebpackPlugin({
      // HTML 源文件地址
      template: path.resolve(__dirname, opts.src, "index.html"),
      // HTML 输出名字，
      filename: 'index.html',
      // 
    }),


    // -------------------------------------JS 压缩
    // uglifyJsPlugin 用来对js文件进行压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      // 压缩的JS文件，不开启sourceMap
      sourceMap: false,
      // node_modules、第三方JS插件 不混淆
      // exclude: /(node_modules|async_third)/,
      exclude: /(node_modules)/,
    }),


    // -------------------------------------清除
    // 清除 文件和文件夹
    new CleanPlugin(["**/*"], {
      // 输出 目录下
      root: path.resolve(__dirname, opts.dist),
      verbose: true,
      dry: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

  ],
  module: {
    rules: [
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          },
          // 关闭这个，可以使用es5的异步引入方式；
          esModule: false,
        }
      },
      // js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // node_modules、第三方JS插件 不编译
        // exclude: /(node_modules|async_third)/,
        exclude: /(node_modules)/,
        query: {
          babelrc: false,
          presets: ["es2015"],
          plugins: [
            // 
            [
              "component", [{
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
              }]
            ]
          ]
        },
      },
      // 第三方样式
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader'
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader"]
        })
      },
      // 自己写的样式
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // ------------------------------------
      // fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          limit: 32 * 1024,
          // 一样这个。
          name: `${one.fonts_dir}/[name].[hash:7].[ext]`
        }
      },
      // img
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 32 * 1024,
          // 一样这个。
          name: `${one.imgs_dir}/[name].[hash:7].[ext]`
        }
      }
    ]
  },
  // 所有文件不开启 sourceMap
  // devtool: '#source-map',  
};


// build
if (process.env.NODE_ENV == 'production') {
  module.exports = build;
}
// dev
else {
  module.exports = dev;
}