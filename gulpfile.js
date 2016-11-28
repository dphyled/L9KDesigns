// gulpfile.js

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	//coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	//compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyHTML = require('gulp-minify-html'),
	concat = require('gulp-concat');

var env,
	coffeeSources,
	jsSources,
	sassSources,
	htmlSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

// coffeeSources = [
// 	'components/coffee/XXX.coffee', 
// 	XXXX, 
// 	XXX
// ];

jsSources = ['components/scripts/*.js'];
sassSources = ['components/styles/*.scss'];
cssSources = ['components/styles/*.css'];
htmlSources = ['*.html'];

// gulp.task('coffee', function() {
// 	gulp.src(coffeeSources)
// 		.pipe(coffee({bare: true})
// 		.on('error', gutil.log))
// 		.pipe(gulp.dest('components/scripts'))
// });

//gulp.task('js', ['coffee'], function() {		//  2nd param = dependencies, optional
gulp.task('js', function() {		//  2nd param = dependencies, optional
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'scripts'))
		.pipe(connect.reload())
});

// gulp.task('compass', function() {
// 	gulp.src(sassSources)
// 		.pipe(compass({
// 			sass: 'components/sass',
// 			image: outputDir + 'images',
// 			style: sassStyle
// 		})
// 		.on('error', gutil.log))
// 		.pipe(gulp.dest(outputDir + 'css'))
// 		.pipe(connect.reload())		
// });

gulp.task('css', function() {		//  2nd param = dependencies, optional
	gulp.src(cssSources)
		.pipe(concat('style.css'))
		.pipe(gulp.dest(outputDir + 'styles'))
		.pipe(connect.reload())
});

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(gulpif(env === 'development', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task('watch', function() {					// in terminal "gulp watch"
	// gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(cssSources, ['css']);
	// gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('default', ['html', 'js', 'css', 'connect', 'watch']);			// in terminal----  just "gulp"