const path = require("path");

const config = {

entry: "./Main.js",

output: {

  path: path.resolve(__dirname, "dist"),

  filename: "index.js"

},

module: {

    rules: [
  
    {
        test:/\.(js|jsx)$/,
  
        loader: "babel-loader",
  
        options: {
  
            presets: ["@babel/react", "@babel/preset-env"],
            plugins: ["transform-export-extensions"],
            only: [
                "./**/*.js",
                "node_modules/jest-runtime"
              ]
        }
  
    }
  
  ]
  }
  
  };

  module.exports = config;