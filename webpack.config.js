

var webpack = require('webpack');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var CopyPlugin = require('copy-webpack-plugin');
var path = require('path');
var APP_NAME = require('./package.json').name;
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: {
        'app': 'app',
        'assets/js/vue': 'vue',
        'assets/js/vue-router': 'vue-router'
    },
    externals: {
        Vue: 'vue',
        '$': 'jquery',
        'jQuery': 'jquery'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/www/' + APP_NAME,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ['vue-style-loader', {
                            loader: 'css-loader',
                        }],
                        js: [
                            'babel-loader',
                        ],
                    },
                    cacheBusting: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                'vue-style-loader',
                'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                'vue-style-loader',
                'css-loader',
                "sass-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|svg)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(gif)$/i,
                loader: "file-loader?name=/assets/gif/[name].[ext]"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    __dirname + '/src/app.js',
                    __dirname + '/src/app',
                ],
            },
        ],
    },
    devtool: 'eval',
    devServer: {
        contentBase: __dirname + '/' + APP_NAME,
        historyApiFallback: {
            rewrites: [
                {from: /^\/.*/, to: '/index.html'}
            ]
        },
        host: '0.0.0.0',
        port: 9001,
        compress: true,
        open: false,
        watchOptions: {
            ignored: /node_modules/,
            poll: true,
        },
        publicPath: '/',
        watchContentBase: true,
        disableHostCheck: true
    },
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, './src/.env.production')
          }),
        new VueLoaderPlugin(),
        new CopyPlugin([
            {
                from: './src/assets',
                to: './assets'
            }, 
            {
                from: './node_modules/jquery/dist/jquery.min.js',
                to: './assets/js/jquery.min.js'
            },
            {
                from: './node_modules/bootstrap/dist/js',
                to: './assets/js'
            },
            {
                from: './node_modules/bootstrap/dist/css',
                to: './assets/css'
            },
            {
                from: './src/index.html',
                to: './index.html'
            }
        ])
    ],
    resolve: {
        alias: {
            '@': path.resolve('./src'),
            'vue$': 'vue/dist/vue.esm.js', 
            'vue-router$': 'vue-router/dist/vue-router.esm.js',
            'app$': './src/app.js',
            'index$': './src/index.html'
        },
        extensions: ['*', '.html', '.js', '.css', '.json'],
    },
    performance: {
        hints: false,
    },
};

