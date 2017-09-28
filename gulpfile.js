require('babel-core/register');
var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var babelify = require("babelify");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var mocha = require('gulp-mocha');

gulp.task('default', ['build', 'less', 'watch', 'connect']);

gulp.task('build', function () {
    return browserify({
            entries: ['app/javascript/index.js']
        })
        .on('error', (err) => { console.error(err); this.emit('end') })
        .transform('babelify')
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist'));
});

gulp.task('reload', () => gulp.src('dist/**/*').pipe(connect.reload()));

gulp.task('test', () => gulp.src('test/*.js', {read: false}).pipe(mocha()));

gulp.task('connect', () => connect.server({livereload: true, port: 9100}));

gulp.task('less', () => {
    gulp.src('app/less/*less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch(['app/less/*less'], ['less']);
    gulp.watch(['app/javascript/*js', 'test/*js'], ['test', 'build']);
    gulp.watch(['test/*js'], ['test']);
    gulp.watch(['dist/**/*'], ['reload']);
});
