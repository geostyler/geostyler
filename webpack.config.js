const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
      filename: "geostyler.js",
      path: __dirname + "/browser",
      library: 'GeoStyler'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
      rules: [
          {
            test: /\.css$/,
            use: [
                {
                  loader: MiniCssExtractPlugin.loader
                },
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                    localIdentName: "[local]"
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: function() { return []; }
                  }
                }
              ]
          },
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          {
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader"
          }
      ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "geostyler.css"
    })
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  }
};
