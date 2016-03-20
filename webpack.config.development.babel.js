import * as path from 'path';
import * as webpack from 'webpack';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/main.jsx',
  ],
  output: {
    path: path.join(__dirname, 'build', 'development'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
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
