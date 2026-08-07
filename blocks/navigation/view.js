document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.wp-block-heru-navigation').forEach((navigation) => {
		const menuToggle = navigation.querySelector('.wp-block-heru-navigation__toggle');
		const menu = navigation.querySelector('.wp-block-heru-navigation__menu');

		if (menuToggle && menu) {
			menuToggle.addEventListener('click', () => {
				const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

				menuToggle.setAttribute('aria-expanded', !isOpen);
				menu.classList.toggle('is-open');
			});
		}

		navigation.querySelectorAll('.wp-block-heru-navigation__submenu-toggle').forEach((button) => {
			button.addEventListener('click', (event) => {
				event.preventDefault();

				const parent = button.closest('.menu-item-has-children');
				const isOpen = button.getAttribute('aria-expanded') === 'true';

				button.setAttribute('aria-expanded', !isOpen);
				parent.classList.toggle('is-open');
			});
		});
	});
});