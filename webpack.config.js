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
  entry:{
    app: PATHS.app
  },
  output:{
    path: PATHS.build,
    filename: 'bundle.js'
  }
};

// DEFAULT
if(TARGET==='dev' || !TARGET){
  module.exports = merge(common, {
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