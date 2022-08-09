const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash:16].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: {
          loader: 'ts-loader',
        },
        include: path.resolve(__dirname, '../src'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TypeScript In Action',
      filename: 'index.html',
      template: './public/index.html',
    }),
  ],
}
