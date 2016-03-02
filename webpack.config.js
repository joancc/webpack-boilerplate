// To run a single build run node_modules/.bin/webpack 
// Using package.json scripts reduces the call to just webpack since npm automatically resolves the path
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  module:{

    loaders:
      [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: PATHS.app
        },
        {
          test: /\.jsx?$/,
          // Enable caching for improved performance during development
          // It uses default OS directory by default. If you need something
          // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
          loaders: ['babel?cacheDirectory'],
          // Parse only app files! Without this it will go through entire project.
          // In addition to being slow, that will most likely result in an error.
          include: PATHS.app
        }
      ]
  },

  entry:{
    app: PATHS.app
  },

  resolve:{
    extensions: ['', '.js', '.jsx']
  },

  output:{
    path: PATHS.build,
    filename: 'bundle.js'
  }
};

// DEFAULT
if(TARGET==='dev' || !TARGET){
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer:{
      contentBase: PATHS.build,
      historyApiFallbacl: true,
      hot: true,
      inline: true,
      progress: true,

      //DIsplay errors only
      stats: 'errors-only',
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET==='build'){
  module.exports = merge(common, {})
}