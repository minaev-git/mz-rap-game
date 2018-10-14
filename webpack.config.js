const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-react"],
                            plugins: ["@babel/plugin-proposal-object-rest-spread"],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[local]--[hash:base64:5]",
                        },
                    },
                ],
            },
            {
                test: /\.mp3$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-[hash:base64:5].[ext]",
                            outputPath: "assets/",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src"),
        ],
        extensions: [".js", ".jsx", ".css"],
    },
    plugins: [
        new CleanWebpackPlugin("dist"),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new HtmlWebpackPlugin({
            template: "src/templates/index.html",
            chunks: [
                "vendor",
                "index",
            ],
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                }
            }
        },
    },
    mode: "development",
    devServer: {
        contentBase: false,
        hot: true,
    },
    devtool: "hidden-source-map",
};
