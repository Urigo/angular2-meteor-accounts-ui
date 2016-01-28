module.exports = {
  entry: "./modules/login-buttons.ts",
  output: {
    libraryTarget: 'commonjs',
    path: __dirname,
    filename: "login-buttons.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.less', '.html']
  },
  externals: [
    {
      'angular2/core': 'angular2/core',
      'angular2/common': 'angular2/common',
      'meteor/accounts-base': 'meteor/accounts-base',
      'meteor/tracker': 'meteor/tracker'
    }
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  }
};