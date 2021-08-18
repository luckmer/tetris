const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = {
  entry: "./src/ts/index.ts",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          "ts-loader",
        ],
      },
    ],
  },
  plugins: [
    new WriteFilePlugin(),
    new CleanWebpackPlugin(["dist/*.*"]),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "src/static"),
        to: path.join(__dirname, "dist"),
      },
    ]),
  ],
  performance: {
    hints: false,
  },
};
