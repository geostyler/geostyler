const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
require('@babel/polyfill');

module.exports = {
  entry: [
    "@babel/polyfill",
    "whatwg-fetch",
    "./src/index.ts"
  ],
  output: {
    filename: "geostyler.js",
    path: __dirname + "/browser",
    library: "GeoStyler"
  },
  mode: 'development',
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
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        include: __dirname + '/src',
        use: [
          {
            loader: require.resolve('ts-loader'),
          },
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "geostyler.css"
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: true,
      // eslint: {
      //   enabled: true,
      //   files: 'src'
      // }
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
