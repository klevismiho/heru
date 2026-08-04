import EmblaCarousel from 'embla-carousel';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.wp-block-heru-logo-grid').forEach((block) => {
        const viewport = block.querySelector('.logo-grid__viewport');

        if (!viewport) {
            return;
        }

        EmblaCarousel(viewport, {
            align: 'start',
            loop: true,
            dragFree: true,
        });
    });
});