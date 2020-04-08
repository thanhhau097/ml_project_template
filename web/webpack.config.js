// https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5

const webpack = require('webpack');
const dotenv = require('dotenv');


var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = () => {
    // call dotenv and it will return an Object with a parsed key
    const env = dotenv.config().parsed;

    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        mode: 'production',
        entry: __dirname + '/index.js',
        devServer: {
            allowedHosts: [
                '.mlquestion.com'
            ]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        output: {
            filename: 'transformed.js',
            path: __dirname + '/build'
        },
        plugins: [
            HTMLWebpackPluginConfig,
            new webpack.DefinePlugin(envKeys)
        ]
    }
};