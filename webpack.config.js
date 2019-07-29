const path = require("path");
const dest = "build";

module.exports = [
  {
    target: "electron-main",
    entry: "./src/main/main.js",
    output: {
      path: path.join(__dirname, dest),
      filename: "main.js"
    },
    module: {
      rules: [
        {
          test: /\.(js)x?$/,
          exclude: "/node_modules/",
          loader: "babel-loader",
          options: {
            presets: [['@babel/preset-env', { targets: { electron: '5.0' } }], '@babel/preset-react']
          }
        }
      ]
    }
  },
  {
    entry: "./src/renderer/index.html",
    output: {
      path: path.join(__dirname, dest),
      filename: "index.js"
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "file-loader?name=[name].[ext]"
        }
      ]
    }
  }
];
