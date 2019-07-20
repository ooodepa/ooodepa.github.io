const path = require('path');
const autoprefixer = require('autoprefixer');

let conf = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/dist/'
    },
    devServer: {
        overlay: true
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
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
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
    }
};

module.exports = (env, options) => {
    let
        production = options.mode === 'production';
    conf.devtool = production
        // ? 'source-map'
        ? false
        : 'eval-sourcemap';

    return conf;
}