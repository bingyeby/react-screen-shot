var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    basic: ['react', 'react-dom', 'react-router-dom', 'lodash', './src/common.js']
  },
  output: {
    path: path.resolve(__dirname, 'static'),// string
    filename: '[name].dll.js',//生成文件名字 在html中引用
    library: '[name]_library'// 生成文件中的一些映射关系，与下面DllPlugin中配置对应
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".less"]
  },
  plugins: [
    // 使用DllPlugin插件编译上面配置的npm包
    new webpack.DllPlugin({
      path: path.join(__dirname, 'static', '[name]-manifest.json'),// 生成名单，映射关系
      name: '[name]_library'// 与output中配置对应
    })
  ],
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {
        test: /\.less$/,
        use: [
          {loader: "style-loader"}, // creates style nodes from JS strings
          {loader: "css-loader"},// translates CSS into CommonJS
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: "less-loader"} // compiles Less to CSS
        ]
      }
    ]
  }
}
