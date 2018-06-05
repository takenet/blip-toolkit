'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'blip-toolkit.js',
    library: 'BLiPToolkit',
    libraryTarget: 'umd',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot|svg)(\?]?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'fonts/[name].[ext]?[hash]',
            },
          },
        ],
      },
      {
        test: /\.ico$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/[name].[ext]',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              query: { minimize: true },
            },
          },
        ],
      },
    ],
  },
  node: false,
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, '../src/lib'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'blip-toolkit.css',
      chunkFilename: '[id].css',
    }),
  ],
}
