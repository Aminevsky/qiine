const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: false,
    entry: {
        popup: './src/popup.js',
        more: './src/more.js',
        options: './src/options.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './node_modules/webextension-polyfill/dist/browser-polyfill.js'
                }
            ]
        })
    ]
}