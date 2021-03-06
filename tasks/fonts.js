import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './lib/args';

gulp.task('fonts:app', () => {
  return gulp.src('app/fonts/**/*.{woff,ttf,eot,svg}')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulpif(args.watch, livereload()));
});

gulp.task('fonts:fontawesome', () => {
  return gulp.src('bower_components/font-awesome/fonts/*.{woff,woff2,eot,svg,ttf}')
    .pipe(gulp.dest('dist/fonts/font-awesome'))
});

gulp.task('fonts', [
  'fonts:app',
  'fonts:fontawesome'
]);
