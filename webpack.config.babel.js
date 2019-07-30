import { join } from "path"
const dest = "src/build"

module.exports = [
  {
    // For Main
    target: "electron-main",
    entry: "./src/main/main.js",
    output: {
      path: join(__dirname, dest),
      filename: "main.js"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.(js)x?$/,
          exclude: "/node_modules/"
        }
      ]
    }
  },
  {
    // For Renderer
    target: "electron-renderer",
    entry: "./src/renderer/index.jsx",
    output: {
      path: join(__dirname, dest),
      filename: "renderer.js"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.(js)x?$/,
          exclude: "/node_modules/"
        }
      ]
    }
  }
]
