const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const plugins = [];

plugins.push( new HtmlWebpackPlugin({
  hash:true,
    minify: {
      html5: true,
      collapseWhitespace:true,
      removeComments:true
    },
    filename: "index.html",
    template: __dirname + '/index.html'
}));


plugins.push( new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[name].bundle.css"
}));

plugins.push( new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
 }));

module.exports = {
    devtool: "inline-source-map",
    entry: {
      app: "./app/main.ts"
    } ,
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist'), 
      chunkFilename: '[name].bundle.js',        
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            },
              {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      minimize: true 
                    }
                  },
                  "css-loader"
                ]
              },
              {
                 test: /\.tsx?$/, 
                 loader: "ts-loader"
             }
        ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins,
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'vendor'
      }
    },
    devServer: {
        contentBase: path.join(__dirname, './dist/'),
        clientLogLevel: 'none',
        compress: true,
        port: 3000
      }
}