const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  devServer: {
    compress: true,
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico"),
    }),
    // FIXME: Not sure how else to include these in the package
    new CopyPlugin({
      patterns: [
        { 
          from: "node_modules/@trustwallet/wallet-core/dist/lib/wallet-core.wasm",
          to: "[name][ext]",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: [
          "babel-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.wasm$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      buffer: require.resolve("buffer"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      fs: false,
    },
  },  
};
