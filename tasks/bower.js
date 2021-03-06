import gulp from 'gulp';
import gulpif from 'gulp-if';
import mainBowerFiles from 'main-bower-files';
import livereload from 'gulp-livereload';
import args from './lib/args';
import path from 'path';

gulp.task('bower', function () {
  return gulp.src(mainBowerFiles(), { base: path.join(__dirname, '..', 'bower_components') })
    .pipe(gulp.dest('dist/bower'))
    .pipe(gulpif(args.watch, livereload()));
});
