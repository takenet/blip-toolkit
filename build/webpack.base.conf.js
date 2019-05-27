'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/';
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
        test: /\.(woff(2)?|ttf|eot|ico)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '/[has7].[ext]',
              outputPath: 'fonts/'
            },
          },
        ],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|ico)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '/[name].[ext]',
      //         outputPath: 'fonts/'
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
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
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'svg-inline-loader',
          },
        ],
      }
    ],
  },
  node: false,
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, '../src/lib'),
      '@component': path.resolve(__dirname, '../src/components/component.js'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'blip-toolkit.css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      { from: './src/scss/', to: path.resolve(__dirname, '../dist/scss/'), toType: 'dir' }
    ])
  ],
}
