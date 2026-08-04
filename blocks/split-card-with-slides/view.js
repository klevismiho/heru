import EmblaCarousel from 'embla-carousel';

document.addEventListener('DOMContentLoaded', () => {
	const blocks = document.querySelectorAll(
		'.wp-block-heru-split-card-with-slides'
	);

	if (!blocks.length) {
		return;
	}

	blocks.forEach((block) => {
		const viewport = block.querySelector('.embla__viewport');
		const dotsContainer = block.querySelector('.embla__dots');

		if (!viewport) {
			return;
		}

		const embla = EmblaCarousel(viewport, {
			loop: true,
			align: 'start',
		});

		if (!dotsContainer) {
			return;
		}

		const dots = [];

		dotsContainer.innerHTML = '';

		embla.scrollSnapList().forEach((_, index) => {
			const dot = document.createElement('button');

			dot.type = 'button';
			dot.className = 'embla__dot';

			dot.addEventListener('click', () => {
				embla.scrollTo(index);
			});

			dotsContainer.appendChild(dot);
			dots.push(dot);
		});

		const updateDots = () => {
			const selected = embla.selectedScrollSnap();

			dots.forEach((dot, index) => {
				dot.classList.toggle(
					'is-selected',
					index === selected
				);
			});
		};

		embla.on('select', updateDots);
		embla.on('reInit', updateDots);

		updateDots();
	});
});