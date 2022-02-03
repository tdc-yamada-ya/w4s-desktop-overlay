import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import {Configuration} from "webpack";

const isDev = process.env["NODE_ENV"] === "development";

const common: Configuration = {
  mode: isDev ? "development" : "production",
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  externals: ["fsevents"],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    filename: "[name].js",
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.s?css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: isDev,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(ico|png|jpe?g|svg|eot|woff?2?)$/,
        type: "asset/resource",
      },
    ],
  },
  watch: isDev,
  stats: "errors-only",
  performance: {hints: false},
  devtool: isDev ? "inline-source-map" : undefined,
};

const main: Configuration = {
  ...common,
  target: "electron-main",
  entry: {
    main: "./src/main.ts",
  },
};

const preload: Configuration = {
  ...common,
  target: "electron-preload",
  entry: {
    preload: "./src/preload.ts",
  },
};

const renderer: Configuration = {
  ...common,
  target: "web",
  entry: {
    renderer: `./src/renderer.tsx`,
    layer: `./src/layer.tsx`,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["renderer"],
      minify: !isDev,
      inject: "body",
      filename: `index.html`,
      template: `./src/index.html`,
    }),
    new HtmlWebpackPlugin({
      chunks: ["layer"],
      minify: !isDev,
      inject: "body",
      filename: `layer.html`,
      template: `./src/index.html`,
    }),
  ],
};

const config = isDev ? [renderer] : [main, preload, renderer];
export default config;
