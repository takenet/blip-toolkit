"use strict";
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");

// add hot-reload related code to entry chunks
baseWebpackConfig.entry.unshift(
  "webpack/hot/dev-server",
  "webpack-dev-server/client?http://localhost:8888"
);

module.exports = merge(baseWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: "#cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    watchContentBase: true
  },
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      pkg: require("../package.json"),
      template: "./src/index.html",
      inject: "body"
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
});
