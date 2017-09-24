const webpack = require('webpack');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const DLL_PATH = path.resolve(ROOT_PATH, 'dll');
const vendors = [
    'prop-types',
    'react',
    'react-dom',
    'react-hot-loader',
    // ...其它库
];

module.exports = {
    // 项目的入口文件
    entry: {
        vendors,
    },
    devtool: 'source-map',
    // 输出的文件名 合并以后的vendors会命名为vendors.dll.js
    output: {
        path: DLL_PATH,
        filename: '[name].dll.js',
        // 暴露到 window 的全局变量
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            context: ROOT_PATH,
            // 保持与上面的 library 配置相同
            name: '[name]_library',
            // 生成的 manifest.json 文件, 这个文件在后面的 DllReferencePlugin 中需要使用到.
            path: path.join(DLL_PATH, 'manifest.json')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ],
};
