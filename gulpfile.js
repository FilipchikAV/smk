import gulp  from 'gulp';
import less from 'gulp-less';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import  plumber from 'gulp-plumber';

gulp.task('styles', function () {
  return gulp.src('src/less/style.less')
    .pipe(less())
    .pipe(plumber())
    .pipe(postcss([autoprefixer()]))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return gulp.src('src/js/*/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: './'
  });
  gulp.watch('src/less/*/*.less', gulp.series('styles'));
  gulp.watch('src/js/*/*.js', gulp.series('scripts'));
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('build', gulp.parallel('styles', 'scripts'));
gulp.task('watch', gulp.series('build', 'serve'));
gulp.task('default', gulp.series('watch'));
