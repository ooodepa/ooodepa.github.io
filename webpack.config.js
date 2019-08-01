const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let conf = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/dist/'
    },
    devServer: {
        overlay: true,
        contentBase: path.join(__dirname, '_site'),
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/'
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
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'styles.css',
        }),
        new OptimizeCssAssetsPlugin({
            AssetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        })
      ],
};

module.exports = (env, options) => {
    let
        production = options.mode === 'production';

    conf.devtool = production
        ? false // ? 'source-map'
        : 'eval-sourcemap';

    return conf;
}
