/* global process */
/* global __dirname */
const NODE_ENV = process.env.NODE_ENV || 'development';

var webpack = require('webpack');
var path = require('path')

console.log(NODE_ENV);

module.exports = {  
    entry: {
      app: './src/app.tsx',
      vendor: './src/vendor.tsx'
    },
    output: {
        path: __dirname + "/build/",
        filename: '[name].min.js',
        library: '[name]'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx', '.jsx', '.html']
    },
    watch: NODE_ENV === 'development',
    devtool: NODE_ENV === 'development' ? "source-map" : null,
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'babel!ts-loader' },
            { test: /\.html$/, loader: "text-loader", query: {
                                                            presets: [`react`],
                                                            plugins: [`react-html-attrs`]
            }}
        ]
    },
    plugins: NODE_ENV === 'development' ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
}