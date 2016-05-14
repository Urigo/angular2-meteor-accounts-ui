var path = require('path');

module.exports = {
  entry: {
    'index': "./modules/index.ts",
    'annotations': "./modules/annotations.ts",
    'login-buttons': "./modules/login-buttons.ts"
  },
  output: {
    path: path.join(__dirname, "build"),
    libraryTarget: 'commonjs',
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.less', '.html']
  },
  externals: [
    {
      './login-buttons': './login-buttons',
      './annotations': './annotations',
      '@angular/core': '@angular/core',
      '@angular/common': '@angular/common',
      '@angular/router-deprecated/src/lifecycle/lifecycle_annotations_impl': '@angular/router-deprecated/src/lifecycle/lifecycle_annotations_impl',
      '@angular/router-deprecated': '@angular/router-deprecated',
      '@angular/core/src/util/decorators': '@angular/core/src/util/decorators',
      'meteor/accounts-base': 'meteor/accounts-base',
      'meteor/tracker': 'meteor/tracker',
      'meteor/meteor': 'meteor/meteor'
    }
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
};