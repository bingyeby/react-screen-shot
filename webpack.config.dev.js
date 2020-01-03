/**
 * Dev mode config
 */

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server', // HotModuleReplacementPlugin
    './src/index'
  ],
  output: {
    path: path.resolve(__dirname, "static"),
    // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: 'bundle.js',
    publicPath: '/static/',
    chunkFilename: '[name].[chunkhash:5].chunk.js',
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".less"]
  },
  devtool: 'eval-source-map',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/, use: [
          'style-loader',
          {
            loader: 'css-loader',
            // options: { modules: true, localIdentName: '[path][name]__[local]--[hash:base64:5]' }
            // http://www.ruanyifeng.com/blog/2016/06/css_modules.html
            // https://www.npmjs.com/package/css-loader#modules
            // https://blog.csdn.net/pcaxb/article/details/53896661
            // https://blog.csdn.net/qq_18663357/article/details/54317686
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: "style-loader"}, // creates style nodes from JS strings
          {loader: "css-loader",},// translates CSS into CommonJS
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: "less-loader"} // compiles Less to CSS
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.DllReferencePlugin({// 建立映射关系，在编译的过程中通过json来把那些预编译的资源弄进来
      context: __dirname,
      manifest: require('./static/basic-manifest.json')//名单
    }),
  ],
}
