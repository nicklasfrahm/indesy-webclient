const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const dotenv = require('dotenv')

dotenv.config()

const apiUrl = process.env.API_URL || 'http://localhost:8000'

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URL: JSON.stringify(apiUrl)
      }
    })
  ]
})
