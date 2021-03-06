// require('babel-polyfill')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HardsourceWebpackPlugin = require('hard-source-webpack-plugin')
const AsyncAwaitPlugin = require('webpack-async-await')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('./config')

module.exports = function(env) {
  return  {
    entry: {
      main: ["whatwg-fetch", "./js/index.js"],
      home: "./js/components/pages/home/index.js",
      explore: "./js/components/pages/explore/index.js",
      purpose: "./js/components/pages/explore/purpose.js",
      story: "./js/components/pages/explore/story.js",
      spiritualLineage: "./js/components/pages/explore/spiritualLineage.js",
      teachings: "./js/components/pages/explore/teachings.js",
      spiritualPaths: "./js/components/pages/explore/spiritualPaths.js",
      twoGifts: "./js/components/pages/twoGifts/index.js",
      participate: "./js/components/pages/participate/index.js",
      introductions: "./js/components/pages/participate/introductions.js",
      meditation: "./js/components/pages/participate/meditation.js",
      seminars: "./js/components/pages/participate/seminars.js",
      otherOpportunities: "./js/components/pages/participate/otherOpportunities.js",
      calendar: "./js/components/pages/participate/calendar.js",
      store: "./js/components/pages/store/index.js",   
      connect: "./js/components/pages/connect/index.js",
      userAgreement: "./js/components/pages/userAgreement/index.js"
    },
    output: {
      path: path.resolve(__dirname + "/dist"),
      filename: "[name].bundle.js"
    },
    module: {
      noParse: "/node_modules/json-schema/lib/validate.js",
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // include: /node_modules\/moment/,
          use: [
            {
              loader: "cache-loader"
            },
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "env", {
                      "targets": {
                        // "node": "current",
                        "browsers": [
                          "> 1%",
                          "last 2 versions",
                          "IE > 11"
                        ]
                      },
                      "debug": true
                      // "modules": false
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "cache-loader"
            },
            {
              loader: "raw-loader"
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "cache-loader"
              },
              {
                loader: "css-loader", options: {
                  sourceMap: true
                }
              },
              {
                loader: "resolve-url-loader"
              },
              {
                loader: "postcss-loader"
              },
              {
                loader: "sass-loader", options: {
                  sourceMap: true
                }
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
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
          loader: 'url-loader',
          exclude: /node_modules/,
          options: {
            limit: 5000,
            name: 'fonts/[name].[ext]'
            // publicPath: function(url) {
            //   return url.replace('/dist/styles/', '..')
            // }
          }
        },
        // {
        //   test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
        //   loader: 'file-loader',
        //   exclude: /node_modules/,
        //   options: {
        //     name: '[name].[ext]',
        //     outputPath: 'fonts/'
        //   }
        // },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ],
          exclude: /node_modules/
        }
      ]
    },
    devtool: 'true',
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
      // new CleanWebpackPlugin(['dist']),
      // new HardsourceWebpackPlugin(),
      new AsyncAwaitPlugin(),
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
        reloadDelay: 0,
        online: true
      })
    ]
  }
}
