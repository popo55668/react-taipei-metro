const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    library: 'library',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
