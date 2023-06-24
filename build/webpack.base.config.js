const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash:16].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    environment: {
      arrowFunction: false,
      const: false,
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs: '3',
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TypeScript In Action',
      filename: 'index.html',
      // template: './public/index.html', // 通用模板
      template: './src/snake-game/index.html', // 贪吃蛇游戏
    }),
  ],
  stats: 'errors-only',
}
