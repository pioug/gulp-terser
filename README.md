# gulp-terser ![Run tests](https://github.com/pioug/gulp-terser/workflows/Run%20tests/badge.svg)

## Install

```sh
$ npm install github:pioug/gulp-terser#3.0.0
```

### Example

```js
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const terserOptions = {
  compress: {
    drop_console: true,
    passes: 2,
  },
  output: {
    comments: false,
  },
};

gulp
  .src("script.js")
  .pipe(sourcemaps.init(terserOptions))
  .pipe(terser())
  .pipe(sourcemaps.write(""))
  .pipe(gulp.dest("build"));
```

- See https://github.com/terser/terser for more minification options
- See https://github.com/gulp-sourcemaps/gulp-sourcemaps for advance usage of sourcemaps
