/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	const __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
/*!*****************************************!*\
  !*** ./blocks/features-details/view.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
document.querySelectorAll('.wp-block-heru-features-details').forEach(block => {
  const features = block.querySelectorAll('.feature');
  const headers = block.querySelectorAll('.feature-header');
  const contents = block.querySelectorAll('.feature-content');
  const contentWrapper = block.querySelector('.features-content');
  const updateContentPosition = index => {
    // Do not offset on mobile
    if (window.innerWidth <= 768) {
      contentWrapper.style.marginTop = '';
      return;
    }
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += features[i].offsetHeight;
    }
    contentWrapper.style.marginTop = `${offset}px`;
  };
  headers.forEach((header, index) => {
    header.addEventListener('click', () => {
      const feature = header.closest('.feature');
      const content = contents[index];
      const isOpen = feature.classList.toggle('is-open');
      header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      features.forEach((otherFeature, featureIndex) => {
        if (otherFeature !== feature) {
          otherFeature.classList.remove('is-open');
          headers[featureIndex].setAttribute('aria-expanded', 'false');
        }
      });
      contents.forEach(otherContent => {
        otherContent.classList.remove('is-active');
      });
      if (content) {
        content.classList.toggle('is-active', isOpen);
      }
      if (isOpen) {
        updateContentPosition(index);
      }
    });
  });

  // Set initial position
  const activeIndex = [...features].findIndex(feature => feature.classList.contains('is-open'));
  if (activeIndex !== -1) {
    updateContentPosition(activeIndex);
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map