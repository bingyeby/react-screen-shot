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
  devServer: {},
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
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: "style-loader"}, // creates style nodes from JS strings
          {loader: "css-loader", options: {modules: true, localIdentName: '[local]-[hash:base64:5]'}},// translates CSS into CommonJS
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
