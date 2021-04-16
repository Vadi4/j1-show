module.exports = function(){
	var svgSprite = require('gulp-svg-sprite'),
		svgmin = require('gulp-svgmin'),
		cheerio = require('gulp-cheerio'),
		replace = require('gulp-replace');
		merge2 = require('merge2');

		$.gulp.task('svgSprite', function (cb) {
			merge2(
				$.gulp.src('source/images/sprite-svg/*.svg')
				// minify svg
					.pipe(svgmin({
						js2svg: {
							pretty: true
						}
					}))
					// remove all fill and style declarations in out shapes
					.pipe(cheerio({
						run: function ($) {
							$('[fill]').removeAttr('fill');
							$('[filter]').removeAttr('filter');
							$('[stroke]').removeAttr('stroke');
							$('[defs]').removeAttr('defs');
							$('[style]').removeAttr('style');
						},
						parserOptions: {xmlMode: true}
					})),
				$.gulp.src('source/images/sprite-svg-static/*.svg')
				// minify svg
					.pipe(svgmin({
						js2svg: {
							pretty: true
						}
					}))
					// remove all fill and style declarations in out shapes
					.pipe(cheerio({
						run: function ($) {
							$('[filter]').removeAttr('filter');
							$('[defs]').removeAttr('defs');
							$('[style]').removeAttr('style');
						},
						parserOptions: {xmlMode: true}
					}))
			)
			// cheerio plugin create unnecessary string '&gt;', so replace it.
			.pipe(replace('&gt;', '>'))
			// build svg sprite
			.pipe(svgSprite({
				mode: {
					symbol: {
						sprite: "../sprite.svg",
						render: {
							styl: {
								dest: '../../stylus/sprite-svg/sprite-svg.styl',
								template: "source/stylus/sprite-svg/_sprite-template.styl"
							}
						},
						example: true
					}
				}
			}))
			.pipe($.gulp.dest('source/images/'));
			cb();
		});
};
