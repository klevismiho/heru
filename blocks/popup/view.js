document.addEventListener('DOMContentLoaded', () => {
	const popup = document.querySelector('.heru-popup');

	if (!popup) {
		return;
	}

	const closeButton = popup.querySelector('.heru-popup__close');

	const showOnce = popup.dataset.showOnce === 'true';
	const delay = Number(popup.dataset.delay) * 1000;

	const storageKey = 'heru_popup_seen';


	// Check if user already saw popup
	if (showOnce && localStorage.getItem(storageKey)) {
		return;
	}


	const showPopup = () => {
		popup.classList.add('is-visible');

		if (showOnce) {
			localStorage.setItem(storageKey, 'true');
		}
	};


	// Delay
	if (delay > 0) {
		setTimeout(showPopup, delay);
	} else {
		showPopup();
	}


	// Close
	closeButton?.addEventListener('click', () => {
		popup.classList.remove('is-visible');
	});
});