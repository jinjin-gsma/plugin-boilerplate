// Require path.
const path = require( 'path' );

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: {
        main: ['./src/js/index.js', './src/css/index.scss']
    },

    output: {
        path: path.resolve( __dirname, 'builds' )
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                ],
            }
        ],
    },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}

module.exports = config;