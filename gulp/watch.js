module.exports = function(){
	$.gulp.task('watch', function(cb) {
		$.gulp.watch([
			'source/pug/*',
			'source/pug/**/*.pug',
		], $.gulp.series('pug'));
		$.gulp.watch([
			'source/stylus/*',
			'source/stylus/**/*',
			'!source/stylus/inc/sprite.styl'
		], $.gulp.series('stylus'));
		$.gulp.watch([
			'source/images/*.png',
			'source/images/**/*.png',
			'source/images/*.jpg',
			'source/images/**/*.jpg',
			'source/images/*.svg',
			'source/images/**/*.svg',
			'source/fonts/*.woff',
			'!source/images/sprite/',
			'!source/images/sprite/*'
		], $.gulp.series('copy'));
		$.gulp.watch(['source/images/sprite-svg/*.svg', 'source/images/sprite-svg-colored/*.svg'], $.gulp.series('svgSprite'));
		$.gulp.watch(['source/images/sprite/*.png'], $.gulp.series('sprite'));
		$.gulp.watch(['source/scripts/client.js'], $.gulp.series('javascript'));
		$.gulp.watch('source/plugins.js', $.gulp.series('bower'));
		$.gulp.watch(['source/fonts/*.ttf'], $.gulp.series('ttf2woff2'));
		cb();
	});
};

