var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
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
}).listen(8080, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('http://localhost:8080/#/');
});

