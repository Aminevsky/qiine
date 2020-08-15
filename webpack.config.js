const path = require('path');

module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        popup: './src/popup.js',
        more: './src/more.js',
        options: './src/options.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}