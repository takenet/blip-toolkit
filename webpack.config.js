const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cssPlugin = new ExtractTextPlugin("[name].css");

module.exports = {
  entry: [
    "webpack/hot/dev-server",
    "webpack-dev-server/client?http://localhost:8080",
    __dirname + "/src/app.js"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "blip-toolkit.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: cssPlugin.extract({
          fallback: "style-loader",
          use: [{ loader: "css-loader" }, { loader: "resolve-url-loader" }]
        }),
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot|svg)(\?]?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "fonts/[name].[ext]?[hash]"
            }
          }
        ]
      },
      {
        test: /\.ico$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/[name].[ext]"
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: cssPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            { loader: "resolve-url-loader" },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false
              }
            }
          ]
        }),
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              query: { minimize: true }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true
  },
  node: {
    hot: true,
    inline: true,
    progress: true,
    colors: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      pkg: require("./package.json"),
      template: "./src/index.html",
      inject: "body"
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    cssPlugin
  ]
};
