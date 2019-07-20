let path = require('path');

let conf = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './uploads'),
        filename: 'main.js',
        publicPath: '/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/'
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
