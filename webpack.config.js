const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: {
    allegro: "./src/allegro.ts",
    "allegro.min": "./src/allegro.ts",
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "AllegroJS",
    umdNamedDefine: true,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        test: /\.min\.js$/,
        uglifyOptions: {
          compress: true,
          ie8: false,
          ecma: 5,
          output: { comments: false },
          warnings: false,
        },
      }),
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
      },
    ],
  },
};
