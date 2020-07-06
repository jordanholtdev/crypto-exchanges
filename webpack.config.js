const path = require('path');

module.exports = {
    entry: {
         app: ['babel-polyfill', './src/index.js'],
         vendor: './src/vendor.js'
    } , 
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), 
        publicPath: '/assets/',
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_mudules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    }
                }
            },
            {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            }
        ]
    },
};