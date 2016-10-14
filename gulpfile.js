"use strict";

var  gulp = require("gulp"),
 cleanCSS = require("gulp-clean-css"),
  csscomb = require('gulp-csscomb'),
   uglify = require('gulp-uglify');

//CSS tasks

gulp.task("combCSS", function() {
  return gulp.src('public/stylesheets/*.css')
    .pipe(csscomb())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task("minifyCSS", ["combCSS"], function(){
  return gulp.src('public/stylesheets/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/stylesheets'));
});

//JavaScript tasks

gulp.task("minifyJS", function(){
  return gulp.src("public/javascripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("public/javascripts"));
});

//Production tasks

gulp.task("build", ["minifyJS", "minifyCSS"]);
