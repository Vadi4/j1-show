var place = document.createElement('DIV');
place.classList.add('alert-area');
place.setAttribute('id', 'alert-area');
document.body.appendChild(place);

var AlertBox = function (id, option) {
	this.show = function (msg) {
		if (msg === '' || typeof msg === 'undefined' || msg === null) {
			throw '"msg parameter is empty"';
		} else {
			var alertArea = document.querySelector(id);
			var alertBox = document.createElement('DIV');
			var alertContent = document.createElement('DIV');
			var alertClose = document.createElement('A');
			var alertClass = this;
			alertContent.classList.add('alert-content');
			alertContent.innerText = msg;
			alertClose.classList.add('alert-close');
			alertClose.setAttribute('href', '#');
			alertBox.classList.add('alert-box');
			if (option.class) {
				alertBox.classList.add(option.class);
			}
			alertBox.appendChild(alertContent);
			if (!option.hideCloseButton || typeof option.hideCloseButton === 'undefined') {
				alertBox.appendChild(alertClose);
			}
			alertArea.appendChild(alertBox);
			alertClose.addEventListener('click', function (event) {
				event.preventDefault();
				alertClass.hide(alertBox);
			});
			if (!option.persistent) {
				var alertTimeout = setTimeout(function () {
					alertClass.hide(alertBox);
					clearTimeout(alertTimeout);
				}, option.closeTime);
			}
		}
	};

	this.hide = function (alertBox) {
		alertBox.classList.add('hide');
		var disperseTimeout = setTimeout(function () {
			alertBox.parentNode.removeChild(alertBox);
			clearTimeout(disperseTimeout);
		}, 500);
	};
};

var alertError = new AlertBox('#alert-area', {
	closeTime: 5000,
	persistent: false,
	hideCloseButton: false,
	class: 'red'
	});
var alertSuccess = new AlertBox('#alert-area', {
	closeTime: 5000,
	persistent: false,
	hideCloseButton: false,
	class: 'gray'
});