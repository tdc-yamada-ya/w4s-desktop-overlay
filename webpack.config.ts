import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import {Configuration} from "webpack";

const isDev = process.env["NODE_ENV"] === "development";

const common = ({dir}: {dir: string[]}): Configuration => ({
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
    path: path.resolve(__dirname, "dist", ...dir),
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
});

const main: Configuration = {
  ...common({dir: ["main"]}),
  target: "electron-main",
  entry: {
    index: "./src/main/index.ts",
  },
};

const preload = ({dir}: {dir: string[]}): Configuration => ({
  ...common({dir: ["renderer", ...dir]}),
  target: "electron-preload",
  entry: {
    preload: `./src/renderer/${dir.join("/")}/preload.ts`,
  },
});

const renderer = ({dir}: {dir: string[]}): Configuration => ({
  ...common({dir: ["renderer", ...dir]}),
  target: "web",
  entry: {
    index: `./src/renderer/${dir.join("/")}/index.tsx`,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["index"],
      minify: !isDev,
      inject: "body",
      filename: `index.html`,
      template: `./src/renderer/common/index.html`,
    }),
  ],
});

const rendererMainPreload = preload({dir: ["main"]});

const rendererMain = renderer({dir: ["main"]});
const rendererWidgets = [renderer({dir: ["widgets", "default"]})];

const config = isDev
  ? [rendererMain, ...rendererWidgets]
  : [main, rendererMainPreload, rendererMain, ...rendererWidgets];

export default config;
