var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require("path");
var join = path.join.bind(path, __dirname);

module.exports = {
  cache: true,
  devtool: "inline-source-map",
  entry: [
    './docs-src/app.ts',
    './docs-src/docs.less'
  ],
  output: {
    path: './docs',
    filename: 'app.js',
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ loader:[ 'css-loader', 'less-loader'], fallbackLoader: 'style-loader' })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader:['css-loader'],
          fallbackLoader: 'style-loader'
        })
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { 
          configFileName: "./docs-src/tsconfig.json"
        }
      },
      { 
        test: /\.(ttf|eot|svg|otf|woff(2)?|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        use: "file-loader?name=[name].[ext]",
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve("./docs-src"),
      "./src", 
      "node_modules"
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "./docs-src/index.html"
    }, {
      from: "./docs-src/404.html"
    }]),
    new ExtractTextPlugin({ filename: "bundle.css", disable: false, allChunks: true })
  ]
};
