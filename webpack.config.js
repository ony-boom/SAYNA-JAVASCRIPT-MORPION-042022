const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist", "assets", "script"),
    publicPath: "/dist/assets/script/"
  },
  devServer: {
    static: {
      directory: path.join(__dirname)
    }
  }
}