
module.exports = function(){
	$.gulp.task('bower', function(cb) {
		var files = getPathsArray();

		let pluginsHasExist = Boolean(files.js.length) || Boolean(files.css.length) || Boolean(files.copy.length);
		if( !pluginsHasExist ) { return;}

		$.gulp.src(files.js)
			.pipe(
				$.order(getSortArray(files.js))
			)
			.pipe($.plumber())
			.pipe($.concat('vendor.min.js'))
			.pipe($.uglify({
				mangle: {
					keep_fnames: true
				}
			}))
			.pipe($.gulp.dest('build/js'));

		if( files.css.length ) {

			$.gulp.src(files.css, { allowEmpty: true })
				.pipe(
					$.order(getSortArray(files.css))
				)
				.pipe($.concat('vendor.min.css'))
				.pipe($.cleanCSS({compatibility: 'ie8'}))
				.pipe($.gulp.dest('build/css'));
		}

		if( files.copy.length ) {
		  $.gulp.src($.files.copy, { allowEmpty: true })
			  .pipe($.gulp.dest('build/css'));
		}
		cb();
	});

	function getSortArray(arr) {
		return arr.map(function (p) {
			return $.path.basename(p);
		});
	}

	function getPathsArray() {
		var result = { css: [], js: [], copy: [] };

		for (var name in $.plugins) {
			var paths = $.plugins[name];

			paths.forEach(function (p) {
				var ext = $.path.extname(p);
				var file = $.path.resolve('bower_components', name, p);

				result[
					ext.indexOf('js') > -1 ? 'js' : ext.indexOf('css') > -1 ? 'css' : 'copy'
				].push(file);
			});
		}

		return result;
	}
}
