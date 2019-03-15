const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  htmlPage(title, filename, chunks, template) {
    return new HtmlWebpackPlugin({
      title: title,
      hash: true,
      cache: true,
      inject: 'body',
      filename: './pages/' + filename + '.html',
      template: template || path.resolve(__dirname, './page.ejs'),
      appMountId: 'app',
      chunks: chunks
    });
  }
}
