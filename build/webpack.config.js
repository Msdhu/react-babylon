const webpack = require('webpack');
const path = require('path');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
// css 压缩
const cssnano = require('cssnano');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { NODE_ENV } = process.env;
const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const ENTRY_PATH = path.resolve(SRC_PATH, 'app.js');
const HOT_LOAD_PATH = path.resolve(SRC_PATH, 'hotload.js');
const HTML_PATH = path.resolve(SRC_PATH, 'index.html');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

const extractCSSOption = {
  filename: 'style.css',
  disable: false,
  allChunks: true,
};
const HtmlOption = {
  filename: 'index.html',
  template: HTML_PATH,
};
const babelPlugin = ['transform-runtime', 'transform-decorators-legacy'];
const postcssPlugin = [postcssImport(), autoprefixer()];

const config = {
  entry: {
    app: ENTRY_PATH,
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }], 'stage-2', 'react'],
            plugins: NODE_ENV === 'production' ? babelPlugin : [...babelPlugin, 'react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: NODE_ENV === 'production' ? [...postcssPlugin, cssnano()] : postcssPlugin,
              },
            },
          ],
        })
      },
    ],
  },
  plugins: []
};

if (NODE_ENV === 'production') {
  config.plugins.push(
    new CleanWebpackPlugin([
      'dist/app.*.js',
      'dist/*.css',
    ], {
      root: ROOT_PATH,
    })
  );
  config.output.filename = '[name].[chunkhash].js';
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  );
  extractCSSOption.filename = 'style.[contenthash].css';
  config.plugins.push(new ExtractTextWebpackPlugin(extractCSSOption));
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      warnings: false,
    })
  );
  config.plugins.push(
    new webpack.DllReferencePlugin({
      context: ROOT_PATH,
      manifest: path.resolve(BUILD_PATH, 'manifest.json'),
    })
  );
  HtmlOption.minify = {
    removeComments: true,
    collapseWhitespace: true,
  };
  config.plugins.push(new HtmlWebpackPlugin(HtmlOption));
  config.plugins.push(
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(BUILD_PATH, 'vendors.*.dll.js'),
      // 去除需要默认添加 source-map
      includeSourcemap: false,
    })
  );
} else {
  config.entry.app = ['react-hot-loader/patch', HOT_LOAD_PATH];
  config.output.publicPath = '/';
  config.plugins.push(new HtmlWebpackPlugin(HtmlOption));
  // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
  config.plugins.push(new webpack.NamedModulesPlugin());
  config.plugins.push(new ExtractTextWebpackPlugin(extractCSSOption));
  config.devServer = {
    historyApiFallback: true,
    inline: true,
    hot: true,
    progress: true,
  };
  config.devtool = 'eval-source-map';
}

module.exports = config;
