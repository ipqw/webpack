const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StatoscopePlugin = require("@statoscope/webpack-plugin").default;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const config = {
  entry: {
    about: "./src/pages/About.js",
    TodoItem: "./src/components/TodoItem.js",
    TodoList: { import: "./src/components/TodoList.js", dependOn: ["TodoItem"] },
    home: { import: "./src/pages/Home.js", dependOn: ["TodoList"] },
    index: { import: "./src/index.js", dependOn: ["about", "home"] },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new StatoscopePlugin({
      saveStatsTo: "stats.json",
      saveOnlyStats: false,
      open: false,
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  mode: "production",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: "babel-loader",
        exclude: /node_modules/,
        resolve: {
          extensions: [".js"],
        },
        sideEffects: false,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // @TODO css rule
    ],
  },
  optimization: {
    usedExports: true,
    concatenateModules: true,
    minimize: true,
    moduleIds: "deterministic",
    innerGraph: true,
    providedExports: true,
    splitChunks: {
      minSize: 20000,
      minRemainingSize: 0,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      minChunks: 1,
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
  },
  target: "web",

  resolve: {
    alias: {
      "crypto-browserify": path.resolve(__dirname, "src/crypto-fall.js"),
    },
    fallback: {
      buffer: require.resolve("buffer"),
      stream: false,
      crypto: require.resolve("crypto"),
    },
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "node_modules/ui/node_modules"),
    ],
  },
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  stats: {
    children: true,
  },

  // @TODO optimizations
  // @TODO lodash treeshaking
  // @TODO chunk for lodash
  // @TODO chunk for runtime
  // @TODO fallback for crypto
};

module.exports = config;