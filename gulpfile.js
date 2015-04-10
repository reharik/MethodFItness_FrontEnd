"use strict";
/**
 * Dependencies
 */
require("babel/polyfill");

var fs = require("fs");
var gulp = require("gulp");
var browserify = require("browserify");
var concat = require("gulp-concat");
var less = require("gulp-less");
var minifyCSS = require('gulp-minify-css');
var react = require("gulp-react");
var gulpif = require("gulp-if");
var uglify = require("gulp-uglify");
var gutil = require('gulp-util');
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var envify = require("envify");
var shim = require("browserify-shim");
var babelify = require("babelify");
var watchify = require("watchify");

// Config
var packagejson =  require("./package");
var config = require("./config/gulp");
var paths = config.paths;

var DEBUG = process.env.NODE_ENV === "development";

/**
 * Sub-Tasks
 */

gulp.task("jsx-compile", function () {
  return gulp.src(paths.in.jsx)
  .pipe(react())
  .on("error", function (err) {
    console.log(err.toString());
    this.emit("end");
  })
  .pipe(gulp.dest(paths.out.build_js));
});

gulp.task("copy-js", function () {
  return gulp.src(paths.in.js)
  .pipe(gulp.dest(paths.out.build_js));
});

var bundler = watchify(browserify({
    entries: paths.in.app,
    debug: DEBUG
}));

function bundle() {
    bundler.require("react");
    bundler.transform(shim);
    bundler.transform(envify);
    bundler.transform(babelify);

    bundler.bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest(paths.out.public));
}

bundler.on('update', function(){ console.log('update event'); bundle();}); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

gulp.task("app-compile", ["jsx-compile", "copy-js"], bundle);

gulp.task("less-compile", function () {
  return gulp.src(paths.in.less)
    .pipe(gulpif(DEBUG, sourcemaps.init()))
    .pipe(less())
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(concat("app.css"))
    .pipe(minifyCSS())
    .pipe(gulpif(DEBUG, sourcemaps.write()))
    .pipe(gulp.dest(paths.out.public));
});

gulp.task("write-build-info", function (cb) {
  var buildInfos = {
    version : packagejson.version
  };
  require("git-rev").short(function (str) {
    buildInfos.commit = str;
    fs.writeFile(paths.out.build_info, JSON.stringify(buildInfos, null, 2), cb);
  });
});

gulp.task("install", ["app-compile", "less-compile", "write-build-info" ]);

/**
 * Global tasks
 */
gulp.task("dev", ["install"]);

gulp.task("production", ["install"], function () {
  return gulp.src(paths.out.public + "/*.js")
       .pipe(uglify())
       .pipe(gulp.dest(paths.out.public));
});

gulp.task("default", ["install"]);
