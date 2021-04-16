'use strict';

global.$ = {
	gulp: require('gulp'),
	del: require('del'),
	connect: require('gulp-connect'),
	pug: require('gulp-pug'),
	plumber: require('gulp-plumber'),
	changed: require('gulp-changed'),
	plugins: require('../source/plugins.js'),
	path: require('path'),
	fs: require('fs'),
	order: require('gulp-order'),
	concat :require('gulp-concat'),
	uglify: require('gulp-uglify-es').default,
	cleanCSS: require('gulp-clean-css'),
	imagemin: require('gulp-imagemin'),
	spritesmith: require('gulp.spritesmith'),
	rename: require('gulp-rename'),
	stylus: require('gulp-stylus'),
	mmq: require('gulp-merge-media-queries'),
	csso: require('gulp-csso'),
	autoprefixer: require('gulp-autoprefixer'),
	babel: require('gulp-babel'),
	ttf2woff2: require('gulp-ttf2woff2'),
	log: require('fancy-log'),

	pathTasks: {
		tasks: require('../gulp/tasks.js')
	}
};

$.pathTasks.tasks.forEach(function(taskPath) {
	require(taskPath)();
});

$.gulp.task('default',
	$.gulp.series('clean',
	$.gulp.parallel('watch', 'connect', 'pug', 'bower', 'copy', 'sprite', 'svgSprite', 'stylus', 'javascript', 'ttf2woff2')
));
