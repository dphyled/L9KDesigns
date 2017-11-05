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
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	del = require('del');


var env,
	coffeeSources,
	jsSources,
	sassSources,
	htmlSources,
	outputDir,
	sassStyle;

// env = process.env.NODE_ENV || 'development';
env = process.env.NODE_ENV || 'production';

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

jsSources = ['components/scripts/**/*.js'];
sassSources = ['components/styles/**/*.scss'];
cssSources = ['components/styles/**/*.css'];
htmlSources = ['components/**/*.html'];
txtSources = ['components/**/*.txt'];
phpSources = ['components/**/*.php'];
imageSources = ['components/images/*'];
sampleImageSource = ['components/samples/images/*'];

// gulp.task('coffee', function() {
// 	gulp.src(coffeeSources)
// 		.pipe(coffee({bare: true})
// 		.on('error', gutil.log))
// 		.pipe(gulp.dest('components/scripts'))
// });

//gulp.task('js', ['coffee'], function() {		//  2nd param = dependencies, optional
gulp.task('js', function() {
	gulp.src(jsSources, {base: './components/'})
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
	gulp.src(cssSources, {base: './components/'})
		.pipe(concat('style.css'))
		.pipe(autoprefixer('last 5 versions', 'ie 9'))
		.pipe(gulpif(env === 'production', minifyCSS({keepBreaks: false})))
		.pipe(gulp.dest(outputDir + 'styles'))
		.pipe(connect.reload())
});

gulp.task('html', function() {
	gulp.src(htmlSources, {base: './components/'})
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
});

gulp.task('php', function() {
	gulp.src(phpSources, {base: './components/'})
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
});

gulp.task('images', () =>
    gulp.src(imageSources, {base: './components/'})
        .pipe(imagemin())
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
);

gulp.task('sampleImages', () =>
    gulp.src(imageSources)
        .pipe(imagemin())
        .pipe(gulp.dest(outputDir) + 'samples/images')
        .pipe(connect.reload())
);

gulp.task('watch', function() {					// in terminal "gulp watch"
	// gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(cssSources, ['css']);
	// gulp.watch('components/sass/*.scss', ['compass']);
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

gulp.task('clean:production', function () {
	return del('builds/production/**/*');
});

gulp.task('default', ['html', 'php', 'js', 'css', 'images', 'connect', 'watch']);			// in terminal----  just "gulp"