/* jshint node: true */
var path = require( 'path' );


module.exports = {
  context: path.join( __dirname ),
  entry: './lib/index.js',

  output: {
    path: path.join( __dirname, 'dist' ),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'ReactBootstrapNumberInput'
  },

  externals: {
    'react': 'commonjs react',
    'react-bootstrap': 'commonjs react-bootstrap',
  },

  module: {
    loaders: [
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          optional: [ 'runtime' ],
          stage: 0
        }
      }
    ]
  }
};
