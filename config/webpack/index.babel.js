import * as path from 'path';
import * as webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';

import { current as config } from '..';

export const devtool = 'cheap-module-eval-source-map';

export const entry = {
  vendor: [
    'webpack-hot-middleware/client',
    path.join(config.srcDir, 'vendor.js'),
  ],
  app: [
    path.join(config.srcDir, 'app.js'),
  ],
};

export const output = {
  path: path.join(config.buildDir, config.variant),
  filename: 'app.js',
};

export const plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new HtmlPlugin({
    inject: false,
    template: path.join(config.srcDir, 'index.html.ejs'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
  }),
];

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

export const resolve = {
  extensions: ['', '.jsx', '.js'],
};
