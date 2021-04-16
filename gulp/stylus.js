module.exports = function(){
	$.gulp.task('stylus', function(cb) {
		$.gulp.src(['source/stylus/common.styl','source/stylus/critical.styl', 'source/stylus/alerts.styl'])
		.pipe($.stylus())
		.pipe($.mmq({
			log: true
		}))
		.pipe($.autoprefixer({
			cascade: false
		}))
		.pipe($.cleanCSS())
		.pipe($.rename({
			suffix: '.min'
		}))
		.pipe($.gulp.dest('build/css'))
		.pipe($.connect.reload());
		cb();
	});
}
