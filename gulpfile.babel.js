//'use strict';

var gulp = require('gulp'),
	connect = require('gulp-connect'),
	gutil = require('gulp-util'),
	babel = require('gulp-babel'),
	browserify = require('gulp-browserify'),
	sass = require('gulp-sass'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	merge = require('merge-stream'),
	order = require('gulp-order'),
	minifyCSS = require('gulp-clean-css'),
	minifyHTML = require('gulp-htmlmin'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del');


var env,
	appJSSources,
	vendorJSSources,
	jsSources,
	cssSources,
	scssSources,
	htmlSources,
	phpSources,
	imageSources,
	sampleImageSource,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'development';
// env = process.env.NODE_ENV || 'production';

if (env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

vendorJSSources = ['components/scripts/vendor/**/*.js'];
appJSSources = ['components/scripts/app.js'];
jsSources = ['components/scripts/**/*.js'];
scssSources = ['components/styles/**/*.scss'];
cssSources = ['components/styles/**/*.css'];
htmlSources = ['components/**/*.html'];
phpSources = ['components/**/*.php'];
imageSources = ['components/images/*'];
sampleImageSource = ['components/samples/images/*'];

gulp.task('scripts', function() {
	var vendorStream,
		appJSStream;

	vendorStream = gulp.src(vendorJSSources)
		.pipe(order([
			'components/scripts/vendor/jquery-3.2.1.min.js',
			'components/scripts/vendor/TweenLite.min.js',
			'components/scripts/vendor/TimelineLite.min.js',
			'components/scripts/vendor/ScrollMagic.min.js',
			'components/scripts/vendor/animation.gsap.min.js',
			'components/scripts/vendor/jquery.fullPage.min.js',
			'components/scripts/vendor/parallax.min.js',
			'components/scripts/vendor/*.js'
		], { base: './' }))
		.pipe(concat('vendorJS.js'));

	appJSStream = gulp.src(appJSSources, {base: './components/'})
		.pipe(browserify({
			transform: ['babelify'],
			presets: ['env']
		}))
		.pipe(gulpif(env === 'production', uglify()));

	return merge(vendorStream, appJSStream)
		.pipe(concat('script.js'))
		.pipe(gulp.dest(outputDir + 'scripts'))
		.pipe(connect.reload());
});

gulp.task('styles', function() {
	var sassStream,
		cssStream;

	cssStream =	gulp.src(cssSources, {base: './components/'})
		.pipe(autoprefixer('last 5 versions', 'ie 9'))
		.pipe(gulpif(env === 'production', minifyCSS({compatibility: 'ie9'})))

	sassStream = gulp.src(scssSources, {base: './components/'})
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 5 versions', 'ie 9'))
		.pipe(gulpif(env === 'production', minifyCSS({compatibility: 'ie9'})))
	
	return merge(sassStream, cssStream)
		.pipe(concat('style.css'))
		.pipe(gulp.dest(outputDir + 'styles'))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src(htmlSources, {base: './components/'})
		.pipe(gulpif(env === 'production', minifyHTML({collapseWhitespace: true})))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
});

gulp.task('php', function() {
	gulp.src(phpSources, {base: './components/'})
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
});

gulp.task('images', function() {
    gulp.src(imageSources, {base: './components/'})
        .pipe(imagemin())
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload());
});

gulp.task('watch', function() {					// in terminal "gulp watch"
	gulp.watch(jsSources, ['scripts']);
	gulp.watch(cssSources, ['styles']);
	gulp.watch(scssSources, ['styles']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(phpSources, ['php']);
	gulp.watch(imageSources, ['images']);
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('clean:prod', function () {
	console.log('Deleting all production build files.')
	return del('builds/production/**/*');
});

gulp.task('clean:dev', function () {
	console.log('Deleting all development build files.')
	return del('builds/production/**/*');
});

gulp.task('default', ['html', 'php', 'scripts', 'styles', 'images', 'connect', 'watch']);			// in terminal----  just "gulp"
gulp.task('build', ['html', 'php', 'scripts', 'styles']);
gulp.task('server', ['connect', 'watch']);