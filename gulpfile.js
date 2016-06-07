var gulp = require('gulp');
var git = require('gulp-git');
var fs = require('fs');
var less = require('gulp-less');
var tap = require('gulp-tap');
var ext_replace = require('gulp-ext-replace');

gulp.task('pages',  function () {
  function replaceTemplates(file) {
    var fileContent = String(fs.readFileSync('./src/login-buttons-template.html', 'utf8'));
    file.contents = new Buffer(
      String(file.contents)
        .replace(
          '{LOGIN_TEMPLATE}',
          fileContent
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/"/g, '\\"')
        )
    );
  }

  return gulp.src('./build/login-buttons.js')
    .pipe(tap(replaceTemplates))
    .pipe(gulp.dest('./build/'));
});

gulp.task('scss',  function () {
  gulp.src('./build/*.css', {
    base: './build/'
  })
    .pipe(ext_replace('.scss'))
    .pipe(gulp.dest('./build/'));
});

// Build LESS
gulp.task('less', function () {
  return gulp.src('./src/*.less')
    .pipe(less({
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('git-add', function(){
  return gulp.src('build/*')
    .pipe(git.add());
});
