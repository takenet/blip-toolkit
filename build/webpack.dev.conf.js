'use strict'
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  bail: true,
  entry: ['./sandbox/main.js'],
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg: require('../package.json'),
      template: './sandbox/index.html',
      inject: 'body',
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running here: http://localhost:8080'],
      },
    }),
  ],
  devServer: {
    compress: true,
    overlay: true,
    inline: true,
    quiet: true, // necessary for FriendlyErrorsPlugin
  }
})
