const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')
const apiUrl = process.env.API_URL || 'http://localhost:8000'

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './source/static'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_URL: JSON.stringify(apiUrl)
      }
    })
  ]
})
