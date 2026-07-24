document.querySelectorAll('.video-wrapper').forEach((wrapper) => {
	const video = wrapper.querySelector('.hero-video');
	const button = wrapper.querySelector('.video-play-button');

	if (!video || !button) {
		return;
	}


	button.addEventListener('click', () => {

		video.controls = true;

		video.play();

		button.style.display = 'none';

	});

});