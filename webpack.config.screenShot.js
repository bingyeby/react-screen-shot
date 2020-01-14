let webpack = require('webpack');
let path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    './src/component/screenShot/screenShot.js'
  ],
  output: {
    filename: 'screenShot.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".less"]
  },
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
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: "style-loader"}, // creates style nodes from JS strings
          {
            loader: "css-loader",
            options: {modules: true, localIdentName: '[local]-[hash:base64:5]'}
          },// translates CSS into CommonJS
          {loader: 'postcss-loader', options: {sourceMap: false}},
          {loader: "less-loader"} // compiles Less to CSS
        ]
      }
    ]
  },
  externals: [nodeExternals()]
}
