import * as path from 'path';
import * as webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';

import { current as config } from '..';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.join(config.rootDir, 'src', 'main.jsx'),
  ],
  output: {
    path: path.join(config.rootDir, 'build', 'development'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlPlugin({
      inject: false,
      template: path.join(config.rootDir, 'src', 'index.html.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: path.join(config.rootDir, 'src'),
        test: /\.jsx?$/,
      },
      {
        loader: 'url-loader?limit=8192',
        test: /\.(png|jpg)$/,
      },
    ],
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
  },
};
