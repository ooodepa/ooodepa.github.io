// webpack.config.js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const conf = {
    optimization: {
        splitChunks: false
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'src-jekyll/dist'),
        filename: 'scripts.js',
    },
    module: {
        rules: [
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
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
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        })
    ]
}

module.exports = conf