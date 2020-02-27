'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: []
});
