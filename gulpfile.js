"use strict";
const gulp = require("gulp");
// const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();

const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const fileinclude = require("gulp-file-include");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
// const uglify = require('gulp-uglify-es').default;
const htmlmin = require("gulp-htmlmin");
// const purgecss = require('gulp-purgecss')
const px2rem = require('gulp-px-to-rem');

gulp.task("css", () => {
  return gulp.src("source/sass/style.scss")
    // .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(gulp.dest("build/css"))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))

    // .pipe(px2rem({accuracy:0}))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());

});

gulp.task("js", () => {
  return gulp.src("source/js/**/*.js")
    // .pipe(plumber())
    .pipe(sourcemap.init())
    // .pipe(uglify())
    .pipe(gulp.dest("build/js"))
    .pipe(rename(function (path) {
      path.extname = ".min.js";
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/js"))
});

gulp.task("server", () => {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/js/**/*.js", gulp.series("js","refresh"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", (done) => {
  server.reload();
  done();
});


gulp.task("raster images", () => {
  return gulp.src("build/img/*.{png,jpg,jpeg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 2}),
      imagemin.mozjpeg({quality: 75, progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", () => {
  return gulp.src("build/**/*.{png,jpg,jpeg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build"));
});

gulp.task("vector images", () => {
  return gulp.src("build/img/**/*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", () => {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/sprite"));
});

// gulp.task("html", () => {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
//       include()
//     ]))
//     // .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(gulp.dest("build"));
// });

gulp.task("html", () => {
  return gulp.src("source/*.html")
    .pipe(fileinclude())
    .pipe(posthtml([
      include()
    ]))
    // .pipe(htmlmin({
    //   collapseWhitespace: false
    // }))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", () => {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**/*.{png,jpg,jpeg,svg,gif}",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", () => del("build"));

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "js",
  "vector images",
  "sprite",
  "webp",
  "html",
  "raster images"
));

gulp.task("start", gulp.series("server"));
