import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { join } from "path"
const dest = "src/build"

export default (env, argv) => {
  const MAIN = !!(env && env.main)
  return {
    target: MAIN ? "electron-main" : "electron-renderer",
    entry: MAIN ? "./src/main/main.js" : "./src/renderer/index.jsx",
    output: {
      path: join(__dirname, dest),
      filename: MAIN ? "main.js" : "renderer.js"
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.(js)x?$/,
          exclude: "/node_modules/",
          use: [
            "babel-loader"
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            },
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "bundle.css"
      })
    ]
  }
}
