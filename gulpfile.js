var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var del = require('del');

// File paths
var DIST_PATH = 'public/dist'
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SASS_PATH = 'public/scss/main.scss';
var IMAGE_PATH = 'public/images/**/*.{png,jpeg,jpg,gif,svg}';

//Styles
gulp.task('styles', function () {
	console.log('starting styles task');
	return gulp.src(['public/css/reset.css', CSS_PATH])
	//plumber keeps gulp running through errors
		.pipe(plumber(function(err){
			console.log('Styles task error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
		.pipe(concat('combined.css'))
		//.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

gulp.task('sass', function(){
	console.log('Compiling sass');
	return gulp.src(SASS_PATH)
		.pipe(plumber(function(err){
			console.log('Sass task error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());	
});

// Scripts
gulp.task('scripts', function () {
	console.log('starting scripts task');

	return gulp.src(SCRIPTS_PATH)
	.pipe(sourcemaps.init())
	.pipe(babel({
            presets: ['env']
        }))
	.pipe(uglify())
	.pipe(concat('scripts-combined.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(DIST_PATH))
	.pipe(livereload());
});

// Images
gulp.task('images', function () {
	console.log('Starting images task');
	gulp.src(IMAGE_PATH)
			.pipe(imagemin())
			.pipe(gulp.dest(DIST_PATH + '/images'))
});

// clean
gulp.task('clean', function(){
	return del.sync([
		DIST_PATH
	]);
});

gulp.task('default', ['clean', 'images', 'sass', 'scripts'], function () {
	console.log('Starting default task');
});

gulp.task('watch', ['default'], function () {
	console.log('Starting watch task');
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
//	gulp.watch(CSS_PATH, ['styles']);
	gulp.watch(SASS_PATH, ['sass']);

});