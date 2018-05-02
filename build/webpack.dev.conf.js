"use strict";
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  bail: true,
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      pkg: require("../package.json"),
      template: "./src/index.html",
      inject: "body"
    })
  ]
});
