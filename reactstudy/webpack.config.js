const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, 'src/components/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
            'style-loader' ,
            'css-loader',
            'sass-loader',
          ],
      },
      {
      test: /\.[tj]sx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/react',
            "@babel/preset-typescript"
          ],
        }
      }
    },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      }
    ]
  },
  plugins: [
      new HTMLWebpackPlugin({template: path.resolve(__dirname, 'index.html')})
  ],
  devServer: {
    host: '127.0.0.1',
    port: 5000,
    open: true,
    hot: IS_DEV,
    contentBase: './dist',
    historyApiFallback: true,
  }
};