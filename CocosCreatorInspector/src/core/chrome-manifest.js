const Fs = require("fs");
const Path = require("path");
const JsonBeautifully = require('json-beautifully');

class ChromeManifest {


  constructor(options) {
    this.options = options;

  }

  apply(compiler) {
    compiler.plugin('done', function (compilation, callback) {
      let manifest = this.options.manifest;
      let outFile = this.options.outFile;
      if (manifest && outFile) {
        // JSON.stringify(require(manifest))
        Fs.writeFileSync(outFile, JsonBeautifully(require(manifest)));
        console.log(`\n生成manifest文件: ${outFile}`);
      }
    }.bind(this))

  }
}

module.exports = ChromeManifest
