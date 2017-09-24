const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// "__dirname" 是node.js中的一个全局变量,指向当前执行脚本所在的绝对路径
// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const JS_PATH = path.resolve(APP_PATH, 'scripts');
const HTML_PATH = path.resolve(APP_PATH, 'html');
const ENTRY_PATH = path.resolve(JS_PATH, 'index.js');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const DLL_PATH = path.resolve(ROOT_PATH, 'dll');

const extractTPOption = {
    filename: 'style.css',
    disable: false,
    allChunks: true
};
const HtmlWPOption = {
    filename: 'index.html',
    template: path.resolve(HTML_PATH, 'index.html')
};

const config = {
    // 项目的入口文件
    entry: {
        app: ['react-hot-loader/patch', ENTRY_PATH]
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [postcssImport, autoprefixer]
                        }
                    }],
                    publicPath: './'
                })
            }, {
                test: /\.jsx?$/,
                use: { loader: 'babel-loader' },
                exclude: /node_modules/,
                include: JS_PATH,
            },
        ],
    },
    plugins: []
};

if (process.env.NODE_ENV === 'production') {
    config.output.filename = '[name].[chunkhash:8].js';
    config.plugins.push(
        new CleanWebpackPlugin(['dist'], {
            root: __dirname
        })
    );

    extractTPOption.filename = 'style.[contenthash:8].css';
    config.plugins.push(
        new ExtractTextPlugin(extractTPOption)
    );

    HtmlWPOption.minify = {
        removeComments: true, // 删除注释
        collapseWhitespace: true // 删除空格
    };
    config.plugins.push(
        new HtmlWebpackPlugin(HtmlWPOption)
    );

    config.plugins.push(
        new webpack.DllReferencePlugin({
            context: ROOT_PATH,
            manifest: path.resolve(DLL_PATH, 'manifest.json')
        })
    );
    config.plugins.push(
        new AddAssetHtmlPlugin({
            filepath: path.resolve('./dll/vendors.dll.js'),
            // AddAssetHtmlPlugin 加 hash 的方式也是通过 query 的方式,即 xxx.js?hashcode,但是 cdn 会忽视这种方式加的hash
            // 因此比较好的方法就是将 hash 插入到 vendors 的文件名中.
            hash: true
        })
    );
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
} else {
    config.devtool = 'eval-source-map';
    config.plugins.push(
        new HtmlWebpackPlugin(HtmlWPOption)
    );
    config.plugins.push(
        new ExtractTextPlugin(extractTPOption)
    );
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    config.plugins.push(
        new webpack.NamedModulesPlugin()
    );
    config.devServer = {
        historyApiFallback: true,
        inline: true,
        hot: true,
        progress: true,
        // 对于热替换(HMR)是必须的,让webpack知道在哪里载入热更新的模块(chunk)
        publicPath: '/dist/'
    };
}

module.exports = config;

