const path = require('path');

module.exports = {
  entry: './docs/index.js',
  output: {
    path: path.resolve('docs/dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    hot: false,
    contentBase: path.join(__dirname, 'docs'),
    publicPath: '/dist',
    stats: { colors: true }
  },
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
