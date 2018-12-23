const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const moduleObj = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.(scss|css)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      }]
    },
    {
      test: /\.(png|jpg|gif|ico)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'assets/images/',
            outputPath: 'assets/images',
          }
        }
      ]
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'font'
        }
      }]
    }
  ]
};

const client = {
  entry: {
    client: './src/client/index.js',
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/public'),
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  module: moduleObj,
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/client/index.html'
    })
  ]
};

const server = {
  entry: {
    server: './src/server/index.js'
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: moduleObj,
  externals: [nodeExternals()]
};

module.exports = [client, server];
