/*
 Site : Mongoose & Mink
 Date : Feb 15 2021
 */

var gulp = require('gulp'),
	imagemin = require("gulp-imagemin"),
	webp = require("imagemin-webp"),
	extReplace = require("gulp-ext-replace"),
    sass = require('gulp-dart-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat-util'),
    rename = require('gulp-rename'),
	minify = require("gulp-minify"),
	babel = require('gulp-babel'),
    bs = require('browser-sync').create();

// var localConfig = require('./gulp-config.js');
/**
 * Only option being used currently is ip. Example:
 *
 'use strict';

 module.exports = {
	ip: '192.168.1.1'
};

 */
 

gulp.task('sass', function () {
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
		.pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(bs.reload({stream: true}));
});
gulp.task('compress', function () {
    return gulp.src('./assets/js/src/*.js')
        .pipe(concat('script.js'))
		.pipe(concat.header('(function($){\n$( document ).ready(function() {\n'))
		.pipe(concat.footer('\n});\n})(jQuery);\n'))
        // .pipe(rename('scripts.min.js'))
        //.pipe(uglify())
		.pipe(minify({noSource: true}))
        .pipe(gulp.dest('./assets/js'));
});



gulp.task('admin-sass', function() {
    return gulp.src('./assets/admin/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./assets/admin/css/'))
        .pipe(bs.reload({stream: true}));
});
gulp.task('admin-compress', function () {
    return gulp.src('./assets/admin/js/src/*.js')
        .pipe(concat('script.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./assets/admin/js'));
});

gulp.task('watch', gulp.series(function (){
	bs.init({
        open: 'external',
        host: '127.0.0.1',
        proxy: {
            target: "https://127.0.0.1/ouioui",
            ws: true
        },
        port: 3000 
    });
	var html = gulp.watch('*.html');
	html.on('change', function(path, stats) {
		console.log('you changed the html');
		bs.notify("HTML change, please wait!");
		bs.reload;
	})
	var php = gulp.watch('*.php');
	php.on('change', function(path, stats) {
		console.log('you changed the php');
		bs.notify("PHP change, please wait!");
		bs.reload();
	})
	var php2 = gulp.watch('**/*.php');
	php2.on('change', function(path, stats) {
		console.log('you changed the php');
		bs.notify("PHP change, please wait!");
		bs.reload();
	})
	var js = gulp.watch('./assets/js/src/*.js', gulp.series('compress'));
	js.on('change', function(path, stats) {
		console.log('you changed the js');
		bs.notify("Compiling JS, please wait!");
	})
	var jsadmin = gulp.watch('./assets/admin/js/src/*.js', gulp.series('admin-compress'));
	jsadmin.on('change', function(path, stats) {
		console.log('you changed the js');
		bs.notify("Compiling, please wait!");
	})
	var css = gulp.watch('./assets/sass/**/*.scss', gulp.series('sass'));
	css.on('change', function(path, stats) {
		console.log('you changed the css');
		bs.notify("Injecting CSS!");
	})
	var cssadmin = gulp.watch('./assets/admin/sass/**/*.scss', gulp.series('admin-sass'));
	css.on('change', function(path, stats) {
		console.log('you changed the css');
		bs.notify("Injecting CSS!");
	})
	
}));

gulp.task('default', gulp.series('sass', 'compress', 'admin-sass', 'admin-compress', 'watch'));


// ### Images
//gulp.task("exportWebP", function() {
//  let src = "assets/*.png"; // Where your PNGs are coming from.
//  let dest = "meek"; // Where your WebPs are going.

//  return gulp.src(src)
//    .pipe(imagemin([
//      webp({
//        quality: 75
//      })
//    ]))
//    .pipe(extReplace(".webp"))
//    .pipe(gulp.dest(dest));
//});

// ### Images
// `gulp images` - Run lossless compression on all the images.
//gulp.task('images', function () {
//    return gulp.src('./assets/images/*.*')
//        .pipe(bs.stream());
//});