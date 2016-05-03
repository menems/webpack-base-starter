const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

const config = module.exports = {
    context: path.join(__dirname, './src'),
    entry: {
        app: [
            './src/index.js'
        ]
    },
    devtool: 'eval',
    output: {
        path: 'dist',
        filename: '[name].[hash].js'
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
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(env) }
        }),
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body'}),
        new ExtractTextPlugin('[name].[hash].css')
    ],
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    devServer: {
        contentBase: './src',
        hot: true
    }
};

if (env === 'production') {
    config.devtool = 'source-map';
    config.plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true})
    );
}
