const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
require('@babel/polyfill');
const path = require('path');

module.exports = {
  entry: [
    '@babel/polyfill',
    'whatwg-fetch',
    './src/index.ts'
  ],
  output: {
    filename: 'geostyler.js',
    path: path.join(__dirname, 'browser'),
    library: 'GeoStyler'
  },
  mode: 'production',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      fs: false,
      path: false
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
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
          'css-loader'
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
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules', 'geostyler-style')
        ],
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'geostyler.css'
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        build: true
      }
    }),
  ],
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};
