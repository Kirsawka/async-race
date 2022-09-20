const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESlingPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: true,
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new ESlingPlugin({
      extensions: 'ts'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: './src/assets', to: 'assets'
      }],
    }),
  ],
  devServer: {
    open: true,
    port: 8080,
    hot: true,
  },
};