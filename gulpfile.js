var gulp = require("gulp");
var clean = require("gulp-clean");
var runSequence = require("run-sequence");
var gulpTypings = require("gulp-typings");
var exec = require('child_process').exec;
var git = require("gulp-git");
var fs = require("fs");
var less = require('gulp-less');
var tap = require('gulp-tap');
var ext_replace = require('gulp-ext-replace');

// Build TypeScript.
gulp.task("tsbuild", function(callback) {
  exec("tsc", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback();
  });
});

gulp.task('pages',  function () {
  function replaceTemplates(file) {
    var fileContent = String(fs.readFileSync("./modules/login-buttons-template.html", "utf8"));
    console.log();
    file.contents = new Buffer(String(file.contents).replace("{LOGIN_TEMPLATE}", fileContent.replace(/(\r\n|\n|\r)/gm,"").replace(/"/g, '\\"')));
  }

  return gulp.src('./build/login-buttons.js')
    .pipe(tap(replaceTemplates))
    .pipe(gulp.dest('./build/'));
});

gulp.task('scss',  function () {
  gulp.src('./build/*.css', {base: './build/'})
    .pipe(ext_replace('.scss'))
    .pipe(gulp.dest('./build/'));
});

// Build LESS
gulp.task('less', function () {
  return gulp.src('./modules/*.less')
    .pipe(less({
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task("git-add", function(){
  return gulp.src("build/*")
    .pipe(git.add());
});

gulp.task("build", function(callback) {
  runSequence("tsbuild", "pages", "less", "scss", "git-add", callback);
});