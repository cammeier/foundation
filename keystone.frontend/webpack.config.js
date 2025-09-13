const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  // Enable caching for faster rebuilds
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  // Optimize for development
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Enable caching for babel
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({
      path: './.env.local',
      safe: false,
      allowEmptyValues: true,
      systemvars: true,
      silent: false,
      defaults: false,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    host: 'localhost',
    hot: true,
    open: true,
    // Optimize dev server performance
    liveReload: false, // Disable live reload since we have HMR
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  // Faster source maps for development
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
