const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')

module.exports = merge(baseConfig, devConfig)
