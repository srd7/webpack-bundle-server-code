var webpack = require("webpack");
var path = require("path");

var filename = require("./src/config")("production").script;

var commonResolve = {
  moduleDirectories: ["node_modules"],
  extensions: ["", ".js"],
  alias: {
    "src": path.resolve(process.cwd(), "src")
  }
};

var commonPlugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
      NODE_PATH: JSON.stringify(".")
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
];

module.exports = {
  client: {
    entry: ["./src/client.js"],
    resolve: commonResolve,
    output: {
      path: path.resolve(process.cwd(), "prod"),
      filename: filename
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: require.resolve("babel-loader"), exclude: /node_modules/ }
      ]
    },
    stats: {
      colors: true
    },
    plugins: commonPlugins
  },
  server: {
    entry: ["./src/server.js"],
    target: "node",
    // dependencies which is not starts with "src/" or "./"
    externals: /^(?!^(src|\.)\/)/,
    resolve: commonResolve,
    output: {
      path: path.resolve(process.cwd(), "prod"),
      filename: "server.min.js",
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: require.resolve("babel-loader"), exclude: /node_modules/ }
      ]
    },
    stats: {
      colors: true
    },
    plugins: commonPlugins,
    devtool: "source-map"
  }
};
