let ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}

let slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout( () => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
}

/* SLIDE DOWN */
let slideDown = (target, duration = 500) => {

	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none') display = 'block';
	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout( () => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
}

let slideToggle = (target, duration = 500) => {
	if (window.getComputedStyle(target).display === 'none') {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
};

let scrollTopBtn = document.querySelector('.js-scroll-top');

let showHideScrollBtn = () => {
	if( document.documentElement.clientHeight > window.pageYOffset ) {
		scrollTopBtn.classList.add('hide');
	} else {
		scrollTopBtn.classList.remove('hide');
	}
};

let getSiblings = (elem) => {
	let siblings = [];
	var sibling = elem.parentNode.firstChild;

	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	};

	return siblings;
};


window.addEventListener('scroll', function() {
	showHideScrollBtn();
});

ready(() => {

	document.addEventListener('click', (e) => {
		let $target = e.target.closest('.js-tab-link');

		if( $target ) {
			e.preventDefault();
			let dataId = $target.getAttribute('data-id');

			$target.classList.remove('js-act');

			getSiblings($target).forEach( el => {
				el.classList.remove('js-act');
			});

			let $actTab = document.querySelector('.js-content-tab[data-tab-id='+dataId+']');
			$actTab.classList.add('js-act');
			getSiblings($actTab).forEach( el => {
				el.classList.remove('js-act');
			});
		}
	});	

	let $fancyImg = document.querySelectorAll('.js-history-carousel');
	if( $fancyImg ) {
		$fancyImg.forEach( el => {
			lightGallery(el, {
				selector: '.b-gallery__item'
			});
		});
	}	

	if( document.querySelector('.js-history-carousel') ) {
		document.querySelectorAll('.js-history-carousel').forEach( carouselEl => {
			let $navContainer = carouselEl.closest('.b-history-carousel-wrap').querySelector('.js-nav-controls'); 
			let slider = tns({
				container: carouselEl,
				gutter: 20,
				nav: false,
				controlsContainer: $navContainer,
				responsive: {
					0: {
						items: 2
					},
					1024: {
						items: 3
					}
				}
			});
		});
	}

	let $burger = document.querySelector('.js-burger');
	let $menu = document.querySelector('.b-header-nav');

	$burger.addEventListener('click', (e) => {
		e.preventDefault();

		$burger.classList.toggle('js-act');
		slideToggle( $menu );

	});

	document.addEventListener('click', e => {
		let $target = e.target.closest('.js-dropdown-link');

		if( $target && window.matchMedia("(max-width: 1023px)").matches ) {
			slideToggle( $target.nextElementSibling );
		}
	});

	new WOW().init();

	document.addEventListener('click', e => {
		let $target = e.target.closest('.js-tab-btn');

		if( $target ) {
			e.preventDefault();
			if( !$target.classList.contains('b-btn-shadow_active') ) {

				e.preventDefault();
				let dataId = $target.getAttribute('data-id');

				let $actBtn = $target.closest('.b-main-card__col').querySelector('.b-btn-shadow_active');
				$actBtn.classList.remove('b-btn-shadow_active');
				slideUp( $actBtn.nextElementSibling);

				$target.classList.add('b-btn-shadow_active');
				slideDown( $target.nextElementSibling );

				let $outContent = $target.closest('.b-main-card').querySelector('.b-main-card__content.js-act');
				slideUp( $outContent );
				$outContent.classList.remove('js-act');
				
				let $actContent = document.querySelector('.b-main-card__content[data-id='+dataId+']');
				slideDown( $actContent );
				$actContent.classList.add('js-act');

			}
		} 
	});

	if( scrollTopBtn ) {
		scrollTopBtn.addEventListener('click', e => {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' })
		});
	};

	document.addEventListener('click', (e) => {
		let $target = e.target.closest('.js-gallery-tab');

		if( $target ) {
			e.preventDefault();
			if( !$target.classList.contains('.b-btn-box__btn_active') ) {
				$target.closest('.b-btn-box').querySelector('.b-btn-box__btn_active').classList.remove('b-btn-box__btn_active');
				$target.classList.add('b-btn-box__btn_active');

				let dataId = $target.getAttribute('data-id');

				let $actGallery = document.querySelector('.b-gallery.js-act');
				let $newGallery = document.querySelector('.b-gallery[data-id='+dataId+']');

				galleryOut( $actGallery );
				galleryIn( $newGallery );

			}

			document.querySelector('.b-btn-box').style.pointerEvents = 'none';

			setTimeout( (e) => {
				document.querySelector('.b-btn-box').style.pointerEvents = '';
			}, 1000);
		}
	});

	let galleryOut = (gallery) => {
		if( gallery ) {
			gallery.querySelectorAll('.b-gallery__item').forEach( el => {
				el.classList.add('wow', 'animated', 'zoomOut');
			});
			setTimeout( (e) => {
				gallery.classList.remove('js-act');
				gallery.querySelectorAll('.b-gallery__item').forEach( el => {
					el.classList.remove('wow', 'animated', 'zoomOut');
				});
			}, 500);
		}
	}

	let galleryIn = (gallery) => {
		if( gallery ) {
			setTimeout( (e) => {
				gallery.classList.add('js-act');
				gallery.querySelectorAll('.b-gallery__item').forEach( el => {
					el.classList.add('wow', 'animated', 'zoomIn');
				});

				setTimeout( (e) => {
					gallery.querySelectorAll('.b-gallery__item').forEach( el => {
						el.classList.remove('wow', 'animated', 'zoomIn');
					});
				}, 500);

			}, 500);
		}

	}

});