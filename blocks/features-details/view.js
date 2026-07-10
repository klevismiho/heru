document.querySelectorAll('.feature-header').forEach((header, index) => {
    header.addEventListener('click', () => {
        const feature = header.closest('.feature');
        const featureContent = document.querySelectorAll('.feature-content')[index];

        // Close all other features
        document.querySelectorAll('.feature').forEach((otherFeature) => {
            if (otherFeature !== feature) {
                otherFeature.classList.remove('is-open');
            }
        });

        // Hide all other content
        document.querySelectorAll('.feature-content').forEach((otherContent) => {
            if (otherContent !== featureContent) {
                otherContent.classList.remove('is-active');
            }
        });

        // Toggle current feature
        feature.classList.toggle('is-open');

        // Toggle current content
        if (featureContent) {
            featureContent.classList.toggle('is-active');
        }
    });
});