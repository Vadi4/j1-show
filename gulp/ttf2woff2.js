module.exports = function(){
	$.gulp.task('ttf2woff2', function() {
		return $.gulp.src(['source/fonts/*.ttf'])
			.pipe($.ttf2woff2())
			.pipe($.gulp.dest('build/fonts'));
	});
};
