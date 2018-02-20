const webpack = require('webpack');
const cssModules = 'modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    entry: ['./src/index.jsx'],
    output: {
        filename: 'app.js',
        path: __dirname + '/build',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                loader: `style-loader!css-loader?${cssModules}`
            },
            {
                test: /\.svg$/,
                loader: 'raw-loader'
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ template: './src/assets/index.html' }),
        new ExtractTextPlugin('style.css', { allChunks: true })
      ]
}