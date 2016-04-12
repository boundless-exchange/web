import * as _ from 'lodash';
import * as path from 'path';
import * as webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';

import { current as config } from '..';

// https://webpack.github.io/docs/configuration.html#output
export const output = {
  path: config.buildDir,
  filename: 'app.js',
};

// https://webpack.github.io/docs/configuration.html#entry
export const entry = {
  vendor: _.compact([
    config.watch && 'webpack-hot-middleware/client',
    path.join(config.srcDir, 'vendor.js'),
  ]),
  app: [
    path.join(config.srcDir, 'app.js'),
  ],
};

// https://webpack.github.io/docs/configuration.html#module
export const module = {
  loaders: [
    {
      loader: 'babel-loader',
      include: path.join(config.srcDir),
      test: /\.jsx?$/,
    },
    {
      loader: 'url-loader?limit=8192',
      test: /\.(png|jpg)$/,
    },
  ],
};

// https://webpack.github.io/docs/configuration.html#resolve
export const resolve = {
  extensions: ['', '.jsx', '.js'],
};

// https://webpack.github.io/docs/configuration.html#plugins
export const plugins = _.compact([
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new HtmlPlugin({
    inject: false,
    template: path.join(config.srcDir, 'index.html.ejs'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
  }),
  config.watch && new webpack.HotModuleReplacementPlugin(),
  config.optimize && new webpack.optimize.UglifyJsPlugin({
    // https://github.com/mishoo/UglifyJS2#compressor-options
    compress: {
      warnings: false,
    },
  }),
]);

// https://webpack.github.io/docs/configuration.html#bail
export const bail = true;

// https://webpack.github.io/docs/configuration.html#devtool
export const devtool = config.watch ? 'cheap-module-eval-source-map' : 'source-map';
