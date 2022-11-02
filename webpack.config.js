const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const lodash = require("lodash-webpack-plugin");

const config = {
    entry: {
        index: { import: "./src/index.js"},
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8010,
        open: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: '/node_modules/',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader'
            ]
            }
        ],
    },
    devtool: 'inline-source-map',
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
    },
    
    // @TODO optimizations
    // @TODO lodash treeshaking
    // @TODO chunk for lodash
    // @TODO chunk for runtime
    // @TODO fallback for crypto
};

module.exports = config;
