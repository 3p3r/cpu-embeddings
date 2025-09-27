import * as path from "path";
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  target: "node",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    libraryTarget: "umd",
    umdNamedDefine: true,
    // normalizes support across workers, node and browser environments
    globalObject: "(typeof self !== 'undefined' ? self : globalThis)",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    compress: true,
    port: 3000,
    hot: true
  },
  devtool: "source-map",
  performance: {
    hints: false
  },
  externalsPresets: {
    node: true
  },
  externals: {
    "onnxruntime-node": "onnxruntime-node",
    "onnxruntime-web": "onnxruntime-web"
  }
};

export default config;