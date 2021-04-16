module.exports = function(){
	$.gulp.task('copy', function(cb) {
		$.gulp.src([
			'source/images/*.png',
			'source/images/**/*.png',
			'source/images/*.jpg',
			'source/images/**/*.jpg',
			'!source/images/sprite/*',
			'!source/images/sprite/'
		])
		.pipe($.imagemin())
		.pipe($.gulp.dest('build/img'));

	$.gulp.src([
		'source/images/*.svg',
		'source/images/**/*.svg',
	])
		.pipe($.gulp.dest('build/img'));

	$.gulp.src([
		'source/fonts/*.woff',
		'source/fonts/*.woff2'
	])
		.pipe($.gulp.dest('build/fonts'));
		cb();
	});
}
