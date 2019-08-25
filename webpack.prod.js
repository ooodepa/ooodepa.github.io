const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '_public/dist'),
        filename: 'main.js',
        publicPath: '/_site/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: path.resolve(__dirname, 'node_modules/'),
            },
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["absolute/path/a", "absolute/path/b"]
                        }
                    }
                ]
            }

        ]
    },
    resolve: {
        alias: {
            cSASS: path.resolve(__dirname, 'src/consts/consts.sass')
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new OptimizeCssAssetsPlugin({
            AssetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
    ],
};

module.exports = (env, options) => {

    conf.mode = 'production';

    // conf.devtool = 'source-map';
    conf.devtool = false;

    return conf;
    
}