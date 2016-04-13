import * as _ from 'lodash';
import * as path from 'path';
import * as webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';

import { current as config } from '..';

// https://webpack.github.io/docs/configuration.html#output
export const output = {
  path: config.buildDir,
  filename: config.watch ? 'app.js' : 'app-[chunkhash].js',
};

// https://webpack.github.io/docs/configuration.html#entry
export const entry = {
  vendor: _.compact([
    config.watch && 'webpack-hot-middleware/client',
    path.join(config.srcDir, 'vendor.js'),
  ]),
  app: _.compact([
    path.join(config.srcDir, 'app.jsx'),
  ]),
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
  // https://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
  new webpack.NoErrorsPlugin(),
  // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
  new webpack.optimize.CommonsChunkPlugin('vendor', config.watch ? 'vendor.js' : 'vendor-[chunkhash].js'),
  // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': config.debug ? 'development' : 'production',
    'process.env.BROWSER':  'true',
  }),
  // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
  new webpack.optimize.OccurrenceOrderPlugin(true),
  // https://github.com/ampedandwired/html-webpack-plugin#configuration
  new HtmlPlugin({
    inject: false,
    template: path.join(config.srcDir, 'index.html.ejs'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
  }),
  // https://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin
  config.watch && new webpack.HotModuleReplacementPlugin(),
  // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
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
