module.exports = function(){
	$.gulp.task('pug', function(cb) {
		$.gulp.src(['source/pug/*.pug', '!source/pug/template.pug'])
			.pipe($.plumber())
			.pipe($.changed('build', {extension: '.html'}))
			.pipe(
				$.pug({
					pretty: true
				})
			)
			.pipe($.gulp.dest('build'))
			.pipe($.connect.reload());
		cb();
	});
};