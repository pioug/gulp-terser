import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import terser from "../index.js";
import test from "ava";
import { readFileSync } from "fs";

test("Ensure output are minified with source maps", async function(t) {
  await new Promise(function(resolve) {
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
  t.is(Buffer.compare(script, expectedScript), 0);

  const map = readFileSync("test/tmp/example.js.map");
  const expectedSourcemaps = readFileSync("test/outputs/example.js.map");
  t.is(Buffer.compare(map, expectedSourcemaps), 0);
});
