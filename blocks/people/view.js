document.querySelectorAll('.js-person-toggle').forEach((summary) => {
	summary.addEventListener('click', () => {
		const person = summary.closest('.person');
		const bio = person.querySelector('.person-bio');

		if (person.classList.contains('is-open')) {
			bio.style.maxHeight = null;
		} else {
			bio.style.maxHeight = bio.scrollHeight + 'px';
		}

		person.classList.toggle('is-open');
	});
});