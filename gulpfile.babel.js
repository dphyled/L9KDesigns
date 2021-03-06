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

//env = process.env.NODE_ENV || 'development';
env = process.env.NODE_ENV || 'production';

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

gulp.task('html', function(done) {
	gulp.src(htmlSources, {base: './components/'})
		.pipe(gulpif(env === 'production', minifyHTML({collapseWhitespace: true})))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
		done();
});

gulp.task('php', function(done) {
	gulp.src(phpSources, {base: './components/'})
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
		done();
});

gulp.task('images', function(done) {
    gulp.src(imageSources, {base: './components/'})
        .pipe(imagemin())
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload());
        done();
});

gulp.task('watch', function(done) {					// in terminal "gulp watch"
	gulp.watch(jsSources, gulp.series('scripts'));
	gulp.watch(cssSources, gulp.series('styles'));
	gulp.watch(scssSources, gulp.series('styles'));
	gulp.watch(htmlSources, gulp.series('html'));
	gulp.watch(phpSources, gulp.series('php'));
	gulp.watch(imageSources, gulp.series('images'));
	done();
});

gulp.task('connect', function(done) {
	connect.server({
		root: outputDir,
		livereload: true
	});
	done();
});

gulp.task('clean:prod', function () {
	console.log('Deleting all production build files.')
	return del('builds/production/**/*');
});

gulp.task('clean:dev', function () {
	console.log('Deleting all development build files.')
	return del('builds/development/**/*');
});

gulp.task('setEnv:prod', function() {
	env = 'production';
});

gulp.task('default', gulp.series('html', 'php', 'scripts', 'styles', 'images', 'connect', 'watch'));			// in terminal----  just "gulp"
gulp.task('build', gulp.series('html', 'php', 'scripts', 'styles', 'images'));
gulp.task('server', gulp.series('connect', 'watch'));