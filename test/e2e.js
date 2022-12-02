const assert = require("node:assert/strict");
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("../index.js");
const test = require("node:test");
const { readFileSync } = require("fs");

test("Ensure output are minified with source maps", async function () {
  await new Promise(function (resolve) {
    gulp
      .src("test/inputs/*.js")
      .pipe(sourcemaps.init())
      .pipe(terser())
      .pipe(sourcemaps.write(""))
      .pipe(gulp.dest("test/tmp"))
      .on("end", resolve);
  });

  const script = readFileSync("test/tmp/example.js");
  const expectedScript = readFileSync("test/outputs/example.js");
  assert.strictEqual(Buffer.compare(script, expectedScript), 0);

  const map = readFileSync("test/tmp/example.js.map");
  const expectedSourcemaps = readFileSync("test/outputs/example.js.map");
  assert.strictEqual(Buffer.compare(map, expectedSourcemaps), 0);
});
