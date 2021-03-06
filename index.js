"use strict";

const through2 = require("through2");
const terser = require("terser");
const PluginError = require("plugin-error");
const applySourceMap = require("vinyl-sourcemaps-apply");

module.exports = function (options = {}) {
  return through2.obj(async function (file, enc, callback) {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      callback(new PluginError("gulp-terser", "Streaming is not supported"));
      return;
    }

    if (file.isBuffer()) {
      const o = { sourceMap: {}, ...options };

      if (file.sourceMap) {
        o.sourceMap.filename = file.sourceMap.file;
      }

      const source = file.contents.toString("utf8");
      const build =
        "sourceMap" in file && "file" in file.sourceMap
          ? { [file.sourceMap.file]: source }
          : source;

      const { error, code, map } = await terser.minify(build, o);

      if (error) {
        console.log(error.message);
        callback(new PluginError("gulp-terser", error.message));
        return;
      }

      file.contents = Buffer.from(code);

      if (file.sourceMap && map) {
        applySourceMap(file, map);
      }

      this.push(file);
      callback();
    }
  });
};
