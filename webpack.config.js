const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const config = {
    entry: {
        index: { import: "./src/index.js", dependOn: ["Home", "About"]},
        About: {import: "./src/pages/About.js"},
        Home: {import: "./src/pages/Home.js", dependOn: "TodoList"},
        TodoList: {import: "./src/components/TodoList.js", dependOn: "TodoItem"},
        TodoItem: {import: "./src/components/TodoItem.js"}
    },
    optimization: {
        usedExports: true,
        concatenateModules: true,
        minimize: true,
        moduleIds: "deterministic",
        innerGraph: true,
        providedExports: true,
        splitChunks: {
            minSize: 20000,
            minRemainingSize: 0,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            minChunks: 1,
            chunks: "all",
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                }
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            },
        },
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
        new LodashModuleReplacementPlugin({
            collections: true,
            paths: true,
        }),
    ],
    mode: 'production',
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
                'postcss-loader']
            }
        ],
    },
    devtool: 'inline-source-map',
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
    },
};

module.exports = config;
