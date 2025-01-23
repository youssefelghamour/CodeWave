const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Clean the output directory before emit
    },
    mode: 'development',
    devtool: 'inline-source-map', // Enable inline source maps
    devServer: {
        static: './dist',
        hot: true, // Enable hot reloading
        historyApiFallback: true, // This ensures the app can handle client-side routes instead of server side (allow routing and accessing links)
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            { 
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    performance: {
        maxAssetSize: 1000000, // Set limit to 1 MB
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            template: './dist/index.html',
        }),
    ],
};
