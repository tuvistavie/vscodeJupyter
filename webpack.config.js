var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './browser/src');
var outPath = path.join(__dirname, './out/browser');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: sourcePath,
  entry: {
    main: './index.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux'
    ]
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
<<<<<<< HEAD
    // https://github.com/Microsoft/TypeScript/issues/11677 
=======
    // https://github.com/Microsoft/TypeScript/issues/11677
>>>>>>> 59ed4b312bad8a4f08c90f1f28bd6a68c20b8e3b
    mainFields: ['main']
  },
  module: {
    loaders: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader?',
        options: {
          module: 'es6',
          tsconfig: './browser/tsconfig.json',
          configFileName: './browser/tsconfig.json'
        }
      },
<<<<<<< HEAD
      // css 
=======
      // css
>>>>>>> 59ed4b312bad8a4f08c90f1f28bd6a68c20b8e3b
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [{
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
<<<<<<< HEAD
      // static assets 
=======
      // static assets
>>>>>>> 59ed4b312bad8a4f08c90f1f28bd6a68c20b8e3b
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: sourcePath,
        postcss: [
          require('postcss-import')({
            addDependencyTo: webpack
          }),
          require('postcss-url')(),
          require('postcss-cssnext')(),
          require('postcss-reporter')(),
          require('postcss-browser-reporter')({
            disabled: isProduction
          }),
        ]
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    stats: {
      warnings: false
    },
  },
  node: {
    // workaround for webpack-dev-server issue 
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};