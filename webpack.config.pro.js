/**
 * Build mode config
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".less"]
  },
  devtool: 'source-map',
  mode: "production",
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
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
    new webpack.DllReferencePlugin({// 建立映射关系，在编译的过程中通过json来把那些预编译的资源弄进来
      context: __dirname,
      manifest: require('./static/basic-manifest.json')//名单
    })
  ],
};
