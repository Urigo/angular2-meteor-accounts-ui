module.exports = {
  entry: "./modules/login-buttons.ts",
  output: {
    path: __dirname,
    filename: "login-buttons.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.less', '.html']
  },
  externals: [
    {
      'angular2/core': 'commonjs',
      'angular2/common': 'commonjs',
      'meteor/accounts-base': 'commonjs',
      'meteor/tracker': 'commonjs'
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