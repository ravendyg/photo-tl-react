/* global process */
/* global __dirname */
// const NODE_ENV = process.env.NODE_ENV || 'development';

var webpack = require('webpack');
var path = require('path');

const dev = !(process.argv.indexOf('--env=prod') !== -1);

console.log(dev);

module.exports = {
    entry: {
      app: './src/app.tsx'
    },
    output: {
        path: __dirname + "/build/",
        filename: '[name].min.js',
        library: '[name]'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx', '.jsx', '.html']
    },
    watch: dev,
    devtool: dev ? "source-map" : null,
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'babel!ts-loader' },
            { test: /\.html$/, loader: "text-loader", query: {
                                                            presets: [`react`],
                                                            plugins: [`react-html-attrs`]
            }},
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    },
    plugins: dev ? [] : [
        new webpack.DefinePlugin({
            'process.env': {
            'dev': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourcemap: false,
            compress: {
                warnings: false,
                dead_code: true,
                drop_debugger: true,
                conditionals: true,
                unused: true,
                drop_console: true
            }
        }),
    ]
}
