module.exports = function(){
	$.gulp.task('connect', function(cb) {
		$.connect.server({
			root: 'build',
			port: '1337',
			host: '0.0.0.0',
			livereload: true
		});
		cb();
	});
};