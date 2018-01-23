const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const config = require('./config')

module.exports = function(env) {
  return  {
    entry: {
      main: "./js/index.js",
      home: "./js/components/pages/home.js"
    },
    output: {
      path: path.resolve(__dirname + "/dist"),
      filename: "[name].bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          }
        },
        {
          test: /\.html$/,
          loader: "raw-loader",
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: "sass-loader"
              }
            ]
          }),
          exclude: /node_modules/
        },
        {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
          loader: 'url-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ],
          exclude: /node_modules/
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      compress: true,
      port: 3001,
      https: config.url.indexOf('https') > -1 ? true : false,
      publicPath: config.fullPath,
      proxy: {
        '*': {
          'target': config.url,
          'secure': false
        },
        '/': {
          target: config.url,
          secure: false
        }
      }
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'styles/[name].css',
        allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ie8: false,
          ecma: 8,
          mangle: true,
          output: {
            comments: false,
            beautify: false
          },
          warnings: false
        }
      }),
      new BrowserSyncPlugin({
        proxy: config.url,
        files: [
          '**/*.php'
        ],
        reloadDelay: 0
      })
    ]
  }
}
