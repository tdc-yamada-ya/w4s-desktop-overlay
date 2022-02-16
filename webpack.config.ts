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

const preload = ({name}: {name: string}): Configuration => ({
  ...common({dir: ["renderer", name]}),
  target: "electron-preload",
  entry: {
    preload: `./src/renderer/${name}/preload.ts`,
  },
});

const renderer = ({name}: {name: string}): Configuration => ({
  ...common({dir: ["renderer", name]}),
  target: "web",
  entry: {
    index: `./src/renderer/${name}/index.tsx`,
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

const rendererMainPreload = preload({name: "main"});
const rendererMain = renderer({name: "main"});
const rendererLayer = renderer({name: "layer"});

const config = isDev
  ? [rendererMain, rendererLayer]
  : [main, rendererMainPreload, rendererMain, rendererLayer];

export default config;
