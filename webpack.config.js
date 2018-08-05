const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('flex.css');
const extractLESS = new ExtractTextPlugin('[name].[hash:8].css');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
let resolve = (dir) => {
    return path.join(__dirname, '..', dir)
}
const env = (process.env.NODE_ENV || 'development');
version = Math.random().toString().substr(2, 6);
console.log(env);

const config = {
    entry: {
        'ventor': ['vue', 'vue-router', 'vuex'],
        'tools': ['promise-polyfill', 'whatwg-fetch', 'lodash/core','fastclick'],
        'main': './src/main.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: [/node_modules/],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })


            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader']
                })


            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist', './html']),
        new CommonsChunkPlugin({
            names: ['ventor', 'tools'],
            minChunks: Infinity
        }),
        extractCSS,
        extractLESS,
        new webpack.NoEmitOnErrorsPlugin(),
        new WebpackMd5Hash(),
        new HtmlWebpackPlugin({
            title: ' ',
            favicon: './src/images/logo.png',
            chunks: ['ventor', 'tools', 'main'],
            inject: 'body',
            filename: path.resolve(__dirname, 'html/index.html'),
            template: './index.ejs',
            minify: {//压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: true    //删除空白符与换行符
            }
        }),
        new FriendlyErrorsPlugin()
    ],
    devtool: '#eval-source-map'
}
if (env == 'production' || env == 'test') {
    console.log('------->', env)
    config.devtool = '';
    if (env === 'production') {
    }
    config.output.filename = `[name].[chunkhash:8].${version}..js`;
    config.output.chunkFilename = `[chunkhash:8].[id].${version}.chunk.js`;
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"',
                'kingold': JSON.stringify(env)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new WebpackMd5Hash(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
} else {
    console.log('dev');
}
module.exports = config;
