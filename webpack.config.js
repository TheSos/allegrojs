const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/allegro.ts",
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "allegro-ts.js",
  },
  resolve: {
    extensions: [".ts"],
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ }],
  },
};
