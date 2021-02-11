const path = require('path'),
    Vue = require('vue'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'build.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '',
            template: 'index.html',
            inject: false
        }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: 'static'
        }]),
        new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: 'file-loader'
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
}

const isDebugMode = process.env.NODE_ENV !== 'production';

Vue.config.devtools = isDebugMode;
Vue.config.productionTip = isDebugMode;

if (process.env.NODE_ENV === 'production') module.exports.devtool = 'cheap-module-source-map';
