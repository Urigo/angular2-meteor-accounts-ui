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
      'angular2/core': 'angular2/core',
      'angular2/common': 'angular2/common',
      'angular2/src/router/lifecycle_annotations_impl': 'angular2/src/router/lifecycle_annotations_impl',
      'angular2/router': 'angular2/router',
      'angular2/src/core/util/decorators': 'angular2/src/core/util/decorators',
      'meteor/accounts-base': 'meteor/accounts-base',
      'meteor/tracker': 'meteor/tracker'
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