// webpack.config.js
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    pug_pages: path.join(__dirname, './src/__pages__'),
};

const PAGES = fs.readdirSync(PATHS.pug_pages).filter(fileName => fileName.endsWith('.pug'));

const conf = {
    entry: './src/index.js',
    output: {
        path: PATHS.dist,
        filename: 'scripts.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    'pug-loader'
                ],
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PATHS.pug_pages}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
        })),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        })
    ]
}

module.exports = conf
