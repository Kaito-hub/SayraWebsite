const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");


const multiplePageNames = ["commissions.html", "contact.html", "store.html"]
const multiplehtmlPages = multiplePageNames.map(name => {
  return new htmlWebpackPlugin({
    template: `./src/${name}`,
    filename: `${name}`,
  })
})

module.exports = {
  mode: 'development',
  // The entry point file described above
  entry: {
    main: './src/script.js',
    admin: './src/admin.js'
  },
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
  plugins: [
    new htmlWebpackPlugin({ template: "./src/home.html" }),
    new htmlWebpackPlugin({ template: "./src/admin.html", filename:"admin.html", chunks: ['admin'] })
  ].concat(multiplehtmlPages),

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },

      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
    ]
  }
};