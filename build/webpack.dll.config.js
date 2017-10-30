const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const vendors = [
  'prop-types',
  'react',
  'redux',
  'react-dom',
  'react-redux',
  'redux-saga',
  'react-router-dom',
];

module.exports = {
  entry: {
    vendors,
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new CleanWebpackPlugin([
      'dist/vendors.*.dll.js',
      'dist/manifest.json',
    ], {
      root: ROOT_PATH,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.DllPlugin({
      context: ROOT_PATH,
      name: '[name]_library',
      path: path.join(BUILD_PATH, 'manifest.json'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      warnings: false,
    }),
  ],
};
