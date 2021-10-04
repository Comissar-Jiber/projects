const path = require('path');
const HTMLwebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const Terserplugin = require('terser-webpack-plugin');
const imageMinimizerPlugin = require('image-minimizer-webpack-plugin');



const isDev = process.env.NODE_ENV === 'development';


const optimizationFunc = () => {
   if (isDev) {
       return
   }
   return {
        minimize: true,
        minimizer:  [
            new cssMinimizerPlugin(),
            new HtmlMinimizerPlugin(),
            new Terserplugin()

        ]
    }

}

const rulesFromCss = (regular, ...dop) => {
    return {
        test: regular,
        use: [{loader: miniCssExtractPlugin.loader}, ...dop]
    }
}


const fileName = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`



module.exports = {
    entry: {
        app: './src/index.js', //создаем точку входа
        hot: 'webpack/hot/dev-server.js', // создаем зависимости для HRM
        client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true' // Таже тема
    },
    module: {
        rules: [
            rulesFromCss(/\.css/i, 'css-loader'),
            rulesFromCss(/\.s[ac]ss/i, 'css-loader', 'sass-loader'),
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(jpg|png|svg|jpeg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type:'asset',
                use:'svgo-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    optimization: optimizationFunc(),
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 9000,
        hot: false,
        client: false,

    },
    plugins: [
        new HTMLwebpackPlugin({
            title: 'Caching',
            template: "./src/index.html"
        }),
        new miniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin(),
        new imageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                ],
            },
        }),
    ],
    output: {
        filename: fileName('js'), // точка выхода готового js файла
        path: path.resolve(__dirname, 'build'),
        clean: true // очищает при перестройке папку build
    },
}