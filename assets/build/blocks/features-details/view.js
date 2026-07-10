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
document.querySelectorAll('.feature-header').forEach((header, index) => {
  header.addEventListener('click', () => {
    const feature = header.closest('.feature');
    const featureContent = document.querySelectorAll('.feature-content')[index];

    // Close all other features
    document.querySelectorAll('.feature').forEach(otherFeature => {
      if (otherFeature !== feature) {
        otherFeature.classList.remove('is-open');
      }
    });

    // Hide all other content
    document.querySelectorAll('.feature-content').forEach(otherContent => {
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
/******/ })()
;
//# sourceMappingURL=view.js.map