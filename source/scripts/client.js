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

ready(() => {

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

	let scrollTopBtn = document.querySelectorAll('.js-scroll-top');
	if( scrollTopBtn ) {
		scrollTopBtn.forEach( btn => {
			btn.addEventListener('click', e => {
				e.preventDefault();
				window.scrollTo({ top: 0, behavior: 'smooth' })
			});
		});
	};

	let showHideScrollBtn = () => {
		
	};

});