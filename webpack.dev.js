var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: ["./src/client.js"],
  resolve: {
    moduleDirectories: ["node_modules"],
    extensions: ["", ".js"]
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: require.resolve("babel-loader"), exclude: /node_modules/ }
    ]
  },
  stats: {
    colors: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        NODE_PATH: JSON.stringify(".")
      }
    })
  ],
  devtool: "source-map",
  watch: true,
  keepalive: true
};
