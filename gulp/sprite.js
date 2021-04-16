module.exports = function(){
	$.gulp.task('sprite', function() {
		var spriteData;
		spriteData = $.gulp.src('source/images/sprite/*.png').pipe($.spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.styl',
			cssFormat: 'stylus',
			padding: 5,
			algorithm: 'binary-tree',
			cssTemplate: 'source/stylus/sprite/stylus.template.mustache',
			cssVarMap: function(sprite) {
				sprite.name = "s-" + sprite.name;
			}
		}));
		spriteData.img.pipe($.gulp.dest('build/img'));
		return spriteData.css.pipe($.gulp.dest('source/stylus/sprite'));
	});
};
