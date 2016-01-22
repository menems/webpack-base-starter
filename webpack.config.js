const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

const config = module.exports = {
    entry: {
        app: ['./src/index.js']
    },
    devtool: 'source-map',
    output: {
        path: 'dist',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')}
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body'}),
        new ExtractTextPlugin('[name].[hash].css')
    ],
    resolve: {
        root: path.resolve('./src'),
        modulesDirectories: ['node_modules']
    }
};

if (env === 'production') {
    config.devtool = 'eval';
    config.output.filename = '[name].[hash].js';
    config.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true})
    );
}
