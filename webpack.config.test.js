/** Used in .babelrc for 'test' environment */

require('babel-register');
const validate = require('webpack-validator');
const devConfig = require('./webpack.config.development');

module.exports = validate({
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: devConfig.module.loaders.slice(1)
  }
});