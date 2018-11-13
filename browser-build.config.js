const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
require("@babel/polyfill");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "geostyler.js",
    path: __dirname + "/browser",
    library: "GeoStyler"
  },
  mode: 'production',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        include: __dirname + '/src',
        use: [
          {
            loader: require.resolve('ts-loader'),
          },
        ],
      },
      // locale js files need to be transpiled to es5
      {
        test: /\.js?$/,
        include: /src\/locale/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "geostyler.css"
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: __dirname + '/src',
      tsconfig: __dirname + '/tsconfig.prod.json',
      tslint: __dirname + '/tslint.prod.json',
    }),
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
